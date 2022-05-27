using Domain;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;


public class LookupHub : ILookupHub
{
    private readonly IHubContext<BaseHub> _hub;

    public LookupHub(IHubContext<BaseHub> hub) => _hub = hub;

    // Broadcast lookup to specific user
    public Task BroadcastLookup(Guid userId, LookupMessage message)
        => _hub.Clients.All.SendAsync("lookupReceived", message);
    //public Task BroadcastLookup(Guid userId, LookupMessage message)
    //    => _hub.Clients.Client(userId.ToString()).SendAsync("lookup", message);
}