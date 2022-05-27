using API.SignalR;
using Orleans;
using Orleans.Runtime;

namespace API;

/// <summary>
/// Service discovery for the active SignalR hubs.
/// </summary>
public interface IHubListGrain : IGrainWithGuidKey
{
    ValueTask AddHub(SiloAddress host, ILookupHub hubReference);
    ValueTask<List<(SiloAddress Host, ILookupHub Hub)>> GetHubs();
}
