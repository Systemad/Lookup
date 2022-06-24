using System.Security.Claims;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Identity.Web.Resource;
using Orleans;
using Orleans.Interfaces;

namespace API.SignalR;

[Authorize]
[RequiredScope("API.Access")]
public class BaseHub : Hub
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
        var lookupAccount = _grainFactory.GetGrain<ILookupPublisher>(GetUserId);
        await lookupAccount.SetUsername(GetUsername);
        await base.OnConnectedAsync();
    }

    public async Task NewLookupMethod(Guid userId, CreateLookupModel model)
    {
        var lookupAccount = _grainFactory.GetGrain<ILookupAccount>(userId);
        await lookupAccount.PublishMessageAsync(Guid.NewGuid(), model.Content, model.ReplyId);
    }
}