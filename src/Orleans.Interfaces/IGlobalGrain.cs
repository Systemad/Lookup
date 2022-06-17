using System.Collections.Immutable;
using Domain;

namespace Orleans.Interfaces;

public interface IGlobalGrain : IGrainWithIntegerKey
{
    Task<List<LookupMessage>> GetLookupsFromFollowings(List<Guid> followingList);
    Task<List<LookupMessage>> GetLookupsFromUser(Guid id);
    Task<bool> AddLookupAsync(LookupMessage message);
    //Task EditLookupAsync(LookupMessage message);
    Task RemoveLookupAsync(Guid id);
    Task<LookupMessage?> GetLookupMessage(Guid id);
}