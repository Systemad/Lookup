namespace Domain;

[Serializable]
public class LookupMessage1
{
    private Guid Id { get; set; } = Guid.NewGuid();
    private string Content { get; set; }
    private DateTimeOffset Timestamp { get; set; }
    private string PublisherUsername { get; set; }
}