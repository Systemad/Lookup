using System.Collections.Immutable;
using Domain;
using Orleans.Concurrency;
using Orleans.Interfaces;
using Orleans.Runtime;

namespace Orleans.Grains;

[Reentrant]
public class GlobalGrain : Grain, IGlobalGrain
{
    
    /*
     *         [PersistentState(stateName: "account", storageName: "AccountState")]
        IPersistentState<LookupAccountState> state,
     */
    private readonly IPersistentState<GlobalGrainState> _state;

    public GlobalGrain([PersistentState(stateName: "global", storageName: "GlobalState")]
        IPersistentState<GlobalGrainState> state)
    {
        _state = state;
    }
    
    private Task? _outstandingWriteStateOperation;

    public async Task<List<LookupMessage>> GetLookupsFromFollowings(List<Guid> followingList)
    {
        var lookups = new List<LookupMessage>();
        await Parallel.ForEachAsync(followingList,
            async (id, _) =>
            {
                var look = await GetLookupsFromUser(id);
                lookups.AddRange(look);
            });
        return lookups;
    }

    public Task<List<LookupMessage>> GetLookupsFromUser(Guid id) => 
        Task.FromResult(_state.State.LookupMessages.Where(x => x.PublisherUserId == id).ToList());
    

    public async Task<bool> AddLookupAsync(LookupMessage message)
    {
        if (_state.State.LookupMessages.Contains(message))
        {
            await EditLookupAsync(message);
            return false;
        }

        _state.State.LookupMessages.Add(message);
        await WriteStateAsync();
        return true;
    }

    private async Task EditLookupAsync(LookupMessage message)
    {
        var item = _state.State.LookupMessages.FirstOrDefault(x => x.Id == message.Id);
        if (item is not null)
        {
            item.Content = message.Content;
            item.Edited = true;
            item.EditedTimetamp = DateTimeOffset.Now;
            var index = _state.State.LookupMessages.FindIndex(i => i.Id == message.Id);
            _state.State.LookupMessages[index] = item;
            await WriteStateAsync();
        }
    }

    public async Task RemoveLookupAsync(Guid id)
    {
        _state.State.LookupMessages.Remove(new LookupMessage {Id = id});
        await WriteStateAsync();
    }

    public Task<LookupMessage?> GetLookupMessage(Guid id) => 
        Task.FromResult(_state.State.LookupMessages.FirstOrDefault(x => x.Id == id));
    

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