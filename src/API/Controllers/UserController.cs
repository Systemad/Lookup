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
[Route("api/v{version:apiVersion}/user")]
[ApiVersion("1.0")]
public class UserController : Controller
{
    private IGrainFactory _grainFactory;
    private Guid GetUserId => new(User.Claims.Single(e => e.Type == ClaimTypes.NameIdentifier).Value);

    public UserController(IGrainFactory grainFactory)
    {
        _grainFactory = grainFactory;
    }
    
    /*
     * General actions used by anyone 
     */
    [HttpGet("{userId:guid}/followers", Name = "Get Followers Of Current User")]
    [ProducesResponseType(typeof(IEnumerable<User>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetFollowersList(Guid userId)
    {
        var user = _grainFactory.GetGrain<ILookupAccount>(userId);
        var followers = await user.GetFollowersListAsync();
        return Ok(followers);
    }
    
    [HttpGet("userId:guid/following", Name = "Get Followings Of Current User")]
    [ProducesResponseType(typeof(IEnumerable<User>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetFollowingList(Guid userId)
    {
        var user = _grainFactory.GetGrain<ILookupAccount>(userId);
        var followers = await user.GetFollowingListAsync();
        return Ok(followers);
    }
    
    [HttpGet("{userId:guid}", Name = "Get info of user")]
    [ProducesResponseType(typeof(User), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetUserInfo(Guid userId)
    {
        var user = _grainFactory.GetGrain<ILookupPublisher>(userId);
        var userInfo = await user.GetUserInfo();
        return Ok(userInfo);
    }
    
    /*
     * Actions for current logged in user (ME)
     */
    [HttpPost("me/follow/{userToFollowId:guid}", Name = "Follow user")]
    //[ProducesResponseType()]
    public async Task<IActionResult> FollowUser([FromRoute] Guid userToFollowId)
    {
        var user = _grainFactory.GetGrain<ILookupAccount>(GetUserId);
        await user.FollowUserIdAsync(userToFollowId);
        return Ok();
    }
    
    [HttpGet("me/messages", Name = "Get Recent received Lookups")]
    [ProducesResponseType(typeof(IEnumerable<LookupMessage>), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetReceivedMessages()
    {
        var lookupAccount = _grainFactory.GetGrain<ILookupAccount>(GetUserId);
        var messages = await lookupAccount.GetReceivedMessagesAsync();
        var sortedMessages = messages.OrderByDescending(time => time.Timestamp);
        return Ok(sortedMessages);
    }
    
    [HttpGet("me", Name = "Get info of current user")]
    [ProducesResponseType(typeof(User), (int)HttpStatusCode.OK)]
    public async Task<IActionResult> GetMeInfo()
    {
        var user = _grainFactory.GetGrain<ILookupPublisher>(GetUserId);
        var userInfo = await user.GetUserInfo();
        return Ok(userInfo);
    }
}