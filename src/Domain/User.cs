namespace Domain;

public record User(
    string Username,
    string AvatarUrl,
    string HeaderUrl,
    string Bio,
    string Location,
    DateTimeOffset JoinedDate,
    int FollowersCount,
    int FollowingCount,
    int LookupsCount);