using Domain;

namespace Orleans.Interfaces;

// Interface of Observer ILookupAccount
public interface ILookupViewer : IGrainObserver
{
    // Notifies observer or follower that a message has been published
    void NewLookup(LookupMessage message);

    // Notifies observer or follower of a new subscription
    void SubscriptionAdded(Guid userId);

    // Notifies observer or follower of a removed subscription
    void SubscriptionRemoved(Guid userId);

    void NewFollower(Guid userId);
}