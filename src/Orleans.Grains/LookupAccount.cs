using System.Collections.Immutable;
using Domain;
using Microsoft.Extensions.Logging;
using Orleans.Concurrency;
using Orleans.Interfaces;
using Orleans.Runtime;

namespace Orleans.Grains;

[Reentrant]
public class LookupAccount : Grain, ILookupAccount
{
    // Size for the recently received message cache
    private const int ReceivedMessageCache = 100;
    
    // Size for the published messages cache
    private const int PublishedMessagesCacheSize = 100;

    // Max length of each lookup
    private const int MaxLookupSize = 280;
    
    // Transient list of viewers
    // NOTE: This will not survive grain deactivation, not a part of the state
    //private readonly HashSet<ILookupViewer> _viewers = new();

    private readonly HashSet<Guid> _viewers = new();
    private readonly ILogger<LookupAccount> _logger;

    private readonly IPersistentState<LookupAccountState> _state;

    /// <summary>
    /// Allows state writing to happen in the background.
    /// </summary>
    private Task? _outstandingWriteStateOperation;
    
    public LookupAccount(
        [PersistentState(stateName: "account", storageName: "AccountState")]
        IPersistentState<LookupAccountState> state, ILogger<LookupAccount> logger)
    {
        _state = state;
        _logger = logger;
    }

    private static string GrainType => nameof(LookupAccount);
    private Guid GrainKey => this.GetPrimaryKey();

    public override Task OnActivateAsync()
    {
        _logger.LogInformation("{GrainType}: {GrainKey} activated", GrainType, GrainKey);
        return Task.CompletedTask;
        //await base.OnActivateAsync();
    }

    public Task<ImmutableList<LookupMessage>> GetPublishedMessagesAsync(int n = 10, int start = 0)
    {
        if (start < 0) start = 0;
        if (start + n > _state.State.MyPublishedMessages.Count) n = _state.State.MyPublishedMessages.Count - start;
        
        return Task.FromResult(
            _state.State.MyPublishedMessages
                .Skip(start)
                .Take(n)
                .ToImmutableList());
    }

    public async Task AddFollowerAsync(Guid userId, ILookupSubscriber follower)
    {
        _state.State.Followers[userId] = follower;
        await WriteStateAsync();
        // Notify new follower with signalR
    }

    public async Task RemoveFollowerAsync(Guid userId)
    {
        _state.State.Followers.Remove(userId);
        await WriteStateAsync();
    }

    public async Task SetUsername(string username)
    {
        if (_state.State.Username == string.Empty)
        {
            _state.State.Username = username;
            await _state.WriteStateAsync();   
        }
    }

    public async Task FollowUserIdAsync(Guid userIdToFollow)
    {
        var userToFollow = GrainFactory.GetGrain<ILookupPublisher>(userIdToFollow);
        await userToFollow.AddFollowerAsync(GrainKey, this.AsReference<ILookupSubscriber>());
        _state.State.Subscriptions[userIdToFollow] = userToFollow;
        await WriteStateAsync();
        
        // notify with signalr
        //_viewers.ForEach(_ => _.SubscriptionAdded(userIdToFollow));
    }

    public async Task UnfollowUserIdAsync(Guid userIdToFollow)
    {
        var userToFollow = GrainFactory.GetGrain<ILookupPublisher>(userIdToFollow);
        await userToFollow.RemoveFollowerAsync(GrainKey);
        _state.State.Subscriptions.Remove(userIdToFollow);
        await WriteStateAsync();
        
        // notify with signalr
        //_viewers.ForEach(_ => _.SubscriptionRemoved(userIdToFollow));
    }

    public async Task PublishMessageAsync(string lookupMessage)
    {
        Console.WriteLine(lookupMessage);
        var lookup = CreateNewLookupMessage(lookupMessage);
        
        _state.State.MyPublishedMessages.Enqueue(lookup);

        while (_state.State.MyPublishedMessages.Count > PublishedMessagesCacheSize)
        {
            _state.State.MyPublishedMessages.Dequeue();
        }

        await WriteStateAsync();
        
        // This should only send to current user!
        var notifier = GrainFactory.GetGrain<IPushNotifierGrain>(0);
        await notifier.SendMessage(GrainKey,lookup);
        
        // TODO: Grab all _viewers ID, send message to each through a loop
        //_viewers.ForEach(_ => _.NewLookup(lookup));

        // Notify Followers
        await Task.WhenAll(_state.State.Followers.Values.Select(_ => _.NewLookupAsync(lookup)).ToArray());
    }

    public Task<ImmutableList<LookupMessage>> GetReceivedMessagesAsync(int n = 10, int start = 0)
    {
        if (start < 0) start = 0;
        if (start + n > _state.State.RecentReceivedMessages.Count)
        {
            n = _state.State.RecentReceivedMessages.Count - start;
        }

        return Task.FromResult(_state.State.RecentReceivedMessages
            .Skip(start)
            .Take(n)
            .ToImmutableList());
    }

    public Task SubscribeAsync(Guid viewerId)
    {
        _viewers.Add(viewerId);
        return Task.CompletedTask;
    }

    public Task UnsubscribeAsync(Guid viewerId)
    {
        _viewers.Remove(viewerId);
        return Task.CompletedTask;
    }
    
    public async Task NewLookupAsync(LookupMessage message)
    {
        _state.State.RecentReceivedMessages.Enqueue(message);
        while (_state.State.RecentReceivedMessages.Count > PublishedMessagesCacheSize)
        {
            _state.State.MyPublishedMessages.Dequeue();
        }

        await WriteStateAsync();

        var notifier = GrainFactory.GetGrain<IPushNotifierGrain>(0);
        var followers = await GetFollowersListAsync();
        await notifier.SendBatchMessage(followers, message);
        // For now, just send to all followers
        // but figure out observation, to when client connects, start observing active account and only get messages then
        // figure out how to modify other clients observers
        // await notifier.SendBatchMessage(_viewers.ToList(), message);
        
        // This should only send to CURRENT USER
        //_viewers.ForEach(_ => _.NewLookup(message));
    }

    
    public Task<ImmutableList<Guid>> GetFollowingListAsync() 
        => Task.FromResult(_state.State.Subscriptions.Keys.ToImmutableList());

    public Task<ImmutableList<Guid>> GetFollowersListAsync()
        => Task.FromResult(_state.State.Followers.Keys.ToImmutableList());
    
    private LookupMessage CreateNewLookupMessage(string message)
        => new(message, DateTimeOffset.Now, _state.State.Username);

    private async Task WriteStateAsync()
    {
        if (_outstandingWriteStateOperation is Task currentWriteStateOperation)
        {
            try
            {
                await currentWriteStateOperation;
            }
            catch (Exception e)
            {
                //Console.WriteLine(e);
                //throw;
            }
            finally
            {
                if (_outstandingWriteStateOperation == currentWriteStateOperation)
                {
                    _outstandingWriteStateOperation = null;
                }
            }
        }

        if (_outstandingWriteStateOperation is null)
        {
            currentWriteStateOperation = _state.WriteStateAsync();
            _outstandingWriteStateOperation = currentWriteStateOperation;
        }
        else
        {
            currentWriteStateOperation = _outstandingWriteStateOperation;
        }

        try
        {
            await currentWriteStateOperation;
        }
        catch (Exception e)
        {
            if (_outstandingWriteStateOperation == currentWriteStateOperation)
            {
                _outstandingWriteStateOperation = null;
            }
        }
    }
}