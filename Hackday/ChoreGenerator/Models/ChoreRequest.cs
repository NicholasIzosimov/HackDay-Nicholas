using System.Text.Json.Serialization;

namespace ChoreGenerator.Models;

public class RequestModel
{
    [JsonPropertyName("task")]
    public string Task {get; set;}
}