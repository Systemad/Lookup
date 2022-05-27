using System.Collections.Immutable;
using API.SignalR;
using Domain;
using Microsoft.AspNetCore.SignalR;
using Orleans;
using Orleans.Concurrency;
using Orleans.Interfaces;

namespace API;

[Reentrant]
[StatelessWorker]
public class PushNotifierGrain : Grain, IPushNotifierGrain
{
    //private readonly IHubContext<BaseHub> _hubContext;
    private readonly List<LookupMessage> _messagesQueue = new();
    private readonly IHubContext<BaseHub> _baseHub;

    public PushNotifierGrain(IHubContext<BaseHub> baseHub)
    {
        _baseHub = baseHub;
    }

    public override async Task OnActivateAsync()
    {
        await base.OnActivateAsync();
    }

    public override async Task OnDeactivateAsync()
    {
        await base.OnDeactivateAsync();
    }

    public async Task SendMessage(Guid userId, LookupMessage message)
    {
        await _baseHub.Clients.User(userId.ToString()).SendAsync("lookupReceived", message);
    }

    public async Task SendBatchMessage(ImmutableList<Guid> viewers, LookupMessage message)
    {
        foreach (var viewer in viewers)
        {
            await _baseHub.Clients.User(viewer.ToString()).SendAsync("lookupReceived", message);
        }
    }
}