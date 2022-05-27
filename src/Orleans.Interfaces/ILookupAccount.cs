using System.Collections.Immutable;
using Domain;

namespace Orleans.Interfaces;

public interface ILookupAccount : ILookupPublisher, ILookupSubscriber
{
    // Add new follower subscription from this user specified publisher
    Task FollowUserIdAsync(Guid userIdToFollow);
    
    // Remove follower subscription from this user specified publisher
    Task UnfollowUserIdAsync(Guid userIdToFollow);

    // Get list of following publishers 
    Task<ImmutableList<Guid>> GetFollowingListAsync();

    // Get list of subscriptions who follows this user
    Task<ImmutableList<Guid>> GetFollowersListAsync();

    // Publish new Lookup message
    Task PublishMessageAsync(string lookupMessage);

    // Request most recent messages received by this user.
    // N = Number of messages, -1 for all
    // Start = start position for returned messages. 0 means start with most recent message.
    // Positive value means skip past that many of the most recent messages
    Task<ImmutableList<LookupMessage>> GetReceivedMessagesAsync(int n = 10, int start = 0);

    // Subscribe to realtime notifications
    Task SubscribeAsync(Guid viewerId);

    // Unsubscribe from realtime notifications
    Task UnsubscribeAsync(Guid viewerId);
}