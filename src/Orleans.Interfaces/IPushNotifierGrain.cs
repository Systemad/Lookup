using System.Collections.Immutable;
using Domain;

namespace Orleans.Interfaces;

public interface IPushNotifierGrain : IGrainWithIntegerKey
{
    Task SendMessage(Guid userId, LookupMessage message);
    Task SendBatchMessage(ImmutableList<Guid> viewers, LookupMessage message);
}