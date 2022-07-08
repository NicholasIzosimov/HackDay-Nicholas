namespace ChoreGenerator.Models;

public class Chore
{
    public string? Task { get; set; }

    public int Points { get; set; }

    public int Id { get; set; }

    public bool CompletionStatus { get; set; }
}

public class Reward
{
    public string? Task { get; set; }

    public int Points { get; set; }

    public int Id { get; set; }

    public bool CompletionStatus {get; set;}

}