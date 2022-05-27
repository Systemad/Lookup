using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace API.Controllers;

public record Weather(int Id, int Temp);

[Authorize]
[RequiredScope("API.Access")]
[ApiController]
[Route("api/v{version:apiVersion}/weather")]
[ApiVersion("1.0")]
public class WeatherController : ControllerBase
{
    // GET
    [HttpGet(Name = "GetWeather")]
    public Weather Get()
    {
        return new Weather(1, 2);
    }
}