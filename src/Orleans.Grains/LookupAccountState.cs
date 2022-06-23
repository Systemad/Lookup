using Domain;
using Orleans.Interfaces;

namespace Orleans.Grains;

[Serializable]
public record LookupAccountState
{
    public string Username { get; set; } = string.Empty;
    public string AvatarUrl { get; set; }
    public string HeaderUrl { get; set; }
    public string Bio { get; set; }
    
    public string Location { get; set; }
    public DateTimeOffset JoinedDate { get; set; }
    
    // List of publisher this user is following
    public List<Guid> Followings { get; set; } = new();
    
    // List of subscribers that follows this user
    public List<Guid> Followers { get; set; } = new();
    
    // Guids of Lookup messages recently received by this user
    public List<Guid> RecentReceivedMessages { get; set; } = new();

    // Guids of Lookup messages recently published by this user
    public List<Guid> MyPublishedMessages { get; set; } = new();
}