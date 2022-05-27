using System.Collections.Immutable;
using Domain;

namespace Orleans.Interfaces;

// Grain
public interface ILookupPublisher : IGrainWithGuidKey
{
    Task<ImmutableList<LookupMessage>> GetPublishedMessagesAsync(int n = 10, int start = 0);

    Task AddFollowerAsync(Guid userId, ILookupSubscriber follower);
    Task RemoveFollowerAsync(Guid userId);

    Task SetUsername(string username);
}