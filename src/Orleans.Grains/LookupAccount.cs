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

    public override async Task OnActivateAsync()
    {
        _logger.LogInformation("{GrainType}: {GrainKey} activated", GrainType, GrainKey);
        await _state.ReadStateAsync();
        await base.OnActivateAsync();
    }

    public async Task<List<LookupMessage>> GetPublishedMessagesAsync(int n = 10, int start = 0)
    {
        if (start < 0) start = 0;
        if (start + n > _state.State.MyPublishedMessages.Count) n = _state.State.MyPublishedMessages.Count - start;

        var grain = GrainFactory.GetGrain<IGlobalGrain>(0);
        var messages = await grain.GetLookupsFromUser(GrainKey);
        
        return messages;
    }
    
    public async Task AddFollowerAsync(Guid userId)
    {
        if (_state.State.Followers.Contains(userId))
            return;
        
        _state.State.Followers.Add(userId);
        await WriteStateAsync();
        // Notify new follower with signalR
    }

    public async Task RemoveFollowerAsync(Guid userId)
    {
        if (_state.State.Followers.Contains(userId))
            return;
        
        _state.State.Followers.Remove(userId);
        await WriteStateAsync();
    }

    public async Task SetUsername(string username)
    {
        // TODO: Better check
        if (_state.State.Username == string.Empty)
        {
            _state.State.Username = username;
            await _state.WriteStateAsync();   
        }
    }

    public Task<User> GetUserInfo()
    {
        var userInfo = new User(
            _state.State.Username,
            _state.State.AvatarUrl,
            _state.State.HeaderUrl,
            _state.State.Followers.Count,
            _state.State.Followings.Count,
            _state.State.MyPublishedMessages.Count);

        return Task.FromResult(userInfo);
    }

    public async Task FollowUserIdAsync(Guid userIdToFollow)
    {
        if (_state.State.Followings.Contains(userIdToFollow))
            return;
        
        _state.State.Followings.Add(userIdToFollow);
        await WriteStateAsync();
        var userToFollow = GrainFactory.GetGrain<ILookupPublisher>(userIdToFollow);
        await userToFollow.AddFollowerAsync(GrainKey);
    }

    public async Task UnfollowUserIdAsync(Guid userIdToFollow)
    {
        _state.State.Followings.Remove(userIdToFollow);
        var userToUnFollow = GrainFactory.GetGrain<ILookupPublisher>(userIdToFollow);
        await userToUnFollow.RemoveFollowerAsync(GrainKey);
        await WriteStateAsync();
    }

    public async Task PublishMessageAsync(Guid id, string content, Guid? replyId)
    {
        var ggrain = GrainFactory.GetGrain<IGlobalGrain>(0);
        var lookup = CreateNewLookupMessage(id, content, replyId);
        var exist = await ggrain.AddLookupAsync(lookup);
        if (exist)
        {
            var notifier = GrainFactory.GetGrain<IPushNotifierGrain>(0);
            List<Guid> followers = new(_state.State.Followers);
            followers.Add(GrainKey);
            await notifier.SendBatchMessage(followers,lookup);   
        }
    }
    
    public async Task<List<LookupMessage>> GetReceivedMessagesAsync(int n = 10, int start = 0)
    {
        if (start < 0) start = 0;
        if (start + n > _state.State.RecentReceivedMessages.Count)
        {
            n = _state.State.RecentReceivedMessages.Count - start;
        }

        // TODO: Figure out why its tracked
        var ggrain = GrainFactory.GetGrain<IGlobalGrain>(0);
        List<Guid> followings = new(_state.State.Followings);
        followings.Add(GrainKey);
        var messages = await ggrain.GetLookupsFromFollowings(followings);
        return messages;
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

    public async Task<List<User>> GetFollowingListAsync()
    {
        List<User> users = new List<User>();
        await Parallel.ForEachAsync(_state.State.Followings,
            async (id, _) =>
            {
                var userGrain = GrainFactory.GetGrain<ILookupPublisher>(id);
                var userInfo = await userGrain.GetUserInfo();
                users.Add(userInfo);
            });

        return users;
    }
    
    public async Task<List<User>> GetFollowersListAsync()
    {
        List<User> users = new List<User>();
        await Parallel.ForEachAsync(_state.State.Followers,
            async (id, _) =>
            {
                var userGrain = GrainFactory.GetGrain<ILookupPublisher>(id);
                var userInfo = await userGrain.GetUserInfo();
                users.Add(userInfo);
            });

        return users;
    }

    private LookupMessage CreateNewLookupMessage(Guid id, string content, Guid? replyId)
    {
        var newObject = new LookupMessage
        {
            Id = id,
            Content = content,
            PublisherUserId = GrainKey,
            PublisherUsername = _state.State.Username,
            Timestamp = DateTimeOffset.Now,
            Likes = 0,
            Edited = false,
            ReplyId = replyId,
            EditedTimetamp = null
        };
        return newObject;
    }

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