using Domain;
using Orleans.Interfaces;

namespace Orleans.Grains;

[Serializable]
public record class LookupAccountState
{
    public string Username { get; set; } = string.Empty;
    // List of publisher this user is following
    public Dictionary<Guid, ILookupPublisher> Subscriptions { get; set; } = new();
    
    // List of subscribers that follows this user
    public Dictionary<Guid, ILookupSubscriber> Followers { get; set; } = new();

    // Lookup messages recently received by this user
    public Queue<LookupMessage> RecentReceivedMessages { get; set; } = new();

    // Lookup messages recently published by this user
    public Queue<LookupMessage> MyPublishedMessages { get; set; } = new();
}