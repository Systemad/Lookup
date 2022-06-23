using System.Collections.Immutable;
using Domain;

namespace Orleans.Interfaces;

public interface ILookupPublisher : IGrainWithGuidKey
{
    Task<List<LookupMessage>> GetPublishedMessagesAsync(int n = 10, int start = 0);

    Task AddFollowerAsync(Guid userId);
    Task RemoveFollowerAsync(Guid userId);

    Task SetUsername(string username);

    Task<User> GetUserInfo();
}