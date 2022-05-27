using Domain;

namespace Orleans.Interfaces;

// Observer Interface
public interface ILookupSubscriber : IGrainWithGuidKey
{
    Task NewLookupAsync(LookupMessage message);
}