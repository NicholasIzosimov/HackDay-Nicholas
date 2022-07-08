using System.Text.Json.Serialization;

namespace ChoreGenerator.Models;

public class ChoreRequest
{
    public string Task {get; set;}
    
    public int Points {get; set;}

    public bool CompletionStatus {get; set;}
    public int Id {get; set;}
}

public class RewardRequest
{
    public string Task {get; set;}
    
    public int Points {get; set;}
    
    public bool CompletionStatus {get; set;}
    public int Id {get; set;}
}