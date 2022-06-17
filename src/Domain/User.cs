namespace Domain;

public record User(string Username,
    string AvatarUrl,
    string HeaderUrl,
    int FollowersCount,
    int FollowingCount,
    int LookupsCount);