using System.Net;
using System.Security.Claims;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using Orleans;
using Orleans.Interfaces;

namespace API.Controllers;

[Authorize]
[RequiredScope("API.Access")]
[ApiController]
[Route("api/v{version:apiVersion}/lookup")]
[ApiVersion("1.0")]
public class LookupController : Controller
{
    private readonly IGrainFactory _grainFactory;

    private Guid GetUserId => new(User.Claims.Single(e => e.Type == ClaimTypes.NameIdentifier).Value);
    
    public LookupController(IGrainFactory grainFactory)
    {
        _grainFactory = grainFactory;
    }
    
    [HttpGet("{id:guid}", Name = "Get Lookup")]
    [ProducesResponseType(typeof(LookupMessage), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetLookup([FromRoute] Guid id, [FromBody] bool reply)
    {
        var globalGrain = _grainFactory.GetGrain<IGlobalGrain>(0);
        var lookup = await globalGrain.GetLookupMessage(id, reply);
        return Ok(lookup);
    }

    [HttpPost(Name = "Post Lookup")]
    [Consumes("application/json")]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    public async Task<IActionResult> PostLookup([FromBody] CreateLookupModel model)
    {
        var id = Guid.NewGuid();
        var lookupAccount = _grainFactory.GetGrain<ILookupAccount>(GetUserId);
        await lookupAccount.PublishMessageAsync(id, model.Content, model.ReplyId);
        return Ok();
    }
    
    [HttpPost("edit/{id:guid}", Name = "Edit Lookup")]
    [Consumes("application/json")]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    public async Task<IActionResult> EditLookup([FromRoute] Guid id, [FromBody] EditLookupModel model)
    {
        var lookupAccount = _grainFactory.GetGrain<ILookupAccount>(GetUserId);
        await lookupAccount.PublishMessageAsync(id, model.Content);
        return Ok();
    }
    
    [HttpGet("{userId:guid}/messages", Name = "Get Lookups from specific user")]
    [ProducesResponseType(typeof(IEnumerable<LookupMessage>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetMessagesFromUser([FromRoute] Guid userId)
    {
        var globalGrain = _grainFactory.GetGrain<IGlobalGrain>(0);
        var messages = await globalGrain.GetLookupsFromUser(userId);
        var sortedMessages = messages.OrderByDescending(time => time.Timestamp).Reverse();
        return Ok(sortedMessages);
    }
    
    [HttpGet("{lookupId:guid}/thread", Name = "Get Lookup thread")]
    [ProducesResponseType(typeof(IEnumerable<LookupMessage>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetMessageThread([FromRoute] Guid lookupId)
    {
        var globalGrain = _grainFactory.GetGrain<IGlobalGrain>(0);
        var messages = await globalGrain.GetLookupThread(lookupId);
        var sortedMessages = messages.OrderByDescending(time => time.Timestamp).Reverse();
        return Ok(sortedMessages);
    }
}