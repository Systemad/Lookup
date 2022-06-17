namespace Domain;

[Serializable]
public class LookupMessage
{
    public Guid Id { get; set; } = System.Guid.NewGuid();
    public string Content { get; set; }

    public Guid PublisherUserId { get; set; }
    public string PublisherUsername { get; set; }
    public DateTimeOffset Timestamp { get; set; }
    public int Likes { get; set; } = 0;

    public bool Edited { get; set; } = false;
    public Guid? ReplyId { get; set; } = null;
    public DateTimeOffset? EditedTimetamp { get; set; }= null;
}

public record CreateLookupModel(string Content, bool Edited, Guid? ReplyId = null);
public record EditLookupModel(string Content);