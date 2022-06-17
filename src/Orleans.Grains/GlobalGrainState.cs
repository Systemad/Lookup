using Domain;

namespace Orleans.Grains;

[Serializable]
public record GlobalGrainState
{
    public List<LookupMessage> LookupMessages { get; set; } = new();
}