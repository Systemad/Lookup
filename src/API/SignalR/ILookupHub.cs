using Domain;
using Orleans;

namespace API.SignalR;

public interface ILookupHub : IGrainObserver
{
    Task BroadcastLookup(Guid userId, LookupMessage message);
}