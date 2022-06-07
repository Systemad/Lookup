using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;
using Orleans;
using Orleans.Interfaces;

namespace API.SignalR;

public class BaseHub : Hub, IGrainObserver
{
    private readonly IGrainFactory _grainFactory;

    public BaseHub(IGrainFactory grainFactory)
    {
        _grainFactory = grainFactory;
    }
    
    private Guid GetUserId => new(Context.User.Claims.Single(e => e.Type == ClaimTypes.NameIdentifier).Value);
    private string GetUsername => new(Context.User.Identity.Name);

    public override async Task OnConnectedAsync()
    {
        var lookupAccount = _grainFactory.GetGrain<ILookupAccount>(GetUserId);
        await lookupAccount.SetUsername(GetUsername);
        await base.OnConnectedAsync();
    }
    
    public async Task NewLookupMethod(Guid userId, string message)
    {
        var lookupAccount = _grainFactory.GetGrain<ILookupAccount>(userId);
        await lookupAccount.PublishMessageAsync(message);
    }
}