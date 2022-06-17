using System.Collections.Immutable;
using Domain;

namespace Orleans.Interfaces;

public interface ILookupAccount : ILookupPublisher
{
    // Add new follower subscription from this user specified publisher
    Task FollowUserIdAsync(Guid id);
    
    // Remove follower subscription from this user specified publisher
    Task UnfollowUserIdAsync(Guid id);

    // Get list of following publishers 
    Task<List<User>> GetFollowingListAsync();

    // Get list of subscriptions who follows this user
    Task<List<User>> GetFollowersListAsync();

    // Publish new Lookup message
    Task PublishMessageAsync(Guid id, string content, Guid? replyId = null);
    
    // Request most recent messages received by this user.
    // N = Number of messages, -1 for all
    // Start = start position for returned messages. 0 means start with most recent message.
    // Positive value means skip past that many of the most recent messages
    Task<List<LookupMessage>> GetReceivedMessagesAsync(int n = 10, int start = 0);

    // Subscribe to realtime notifications
    Task SubscribeAsync(Guid viewerId);

    // Unsubscribe from realtime notifications
    Task UnsubscribeAsync(Guid viewerId);
}