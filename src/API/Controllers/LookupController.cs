﻿using System.Net;
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

    // GET
    public ActionResult Index()
    {
        return Ok();
    }
    /*
    *   Methods are for current user (me) 
    */
    [HttpPost("me/follow/{userToFollowId}", Name = "Follow user")]
    //[ProducesResponseType()]
    public async Task<IActionResult> FollowUser([FromRoute] Guid userToFollowId)
    {
        var user = _grainFactory.GetGrain<ILookupAccount>(GetUserId);
        await user.FollowUserIdAsync(userToFollowId);
        return Ok();
    }
    
    [HttpGet("me/following", Name = "Get Followers Of Current User")]
    [ProducesResponseType(typeof(IEnumerable<LookupMessage>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetFollowingList()
    {
        var user = _grainFactory.GetGrain<ILookupAccount>(GetUserId);
        var followers = await user.GetFollowersListAsync();
        return Ok(followers);
    }
    
    /* TODO: Not needed, as soon as user connects,
     In the hub, grab all followers, the add them to viewers for that logged in user
    [HttpGet("me/observe/{userIdToObserve}", Name = "Get Followers Of Current User")]
    [ProducesResponseType(typeof(IEnumerable<LookupMessage>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> ObserveUser(Guid userIdToObserve)
    {
        var user = _grainFactory.GetGrain<ILookupAccount>(GetUserId);
        await user.SubscribeAsync(userIdToObserve);
        return Ok();
    }
    */
    /*
    *   Methods are for specific user specified with route
    */
}