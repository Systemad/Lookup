namespace Domain;

[Serializable]
public record class LookupMessage(
    string Content,
    DateTimeOffset Timestamp,
    string PublisherUsername)
{
    private Guid Id { get; set; } = Guid.NewGuid();
}
