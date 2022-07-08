using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChoreGenerator.Data;
using ChoreGenerator.Models;

namespace ChoreGenerator.Controllers;

[ApiController]
[Route("[controller]")]
public class ChoreGeneratorController : ControllerBase
{
    private readonly ChoreGeneratorContext _context;

    public ChoreGeneratorController(ChoreGeneratorContext context)
    {
        _context = context;
    }

    [HttpGet("chores")]
    public IActionResult GetChores()
    {
        return Ok(_context.Chores);
    }

    [HttpGet("chores/{id}")]
    public IActionResult GetChore(int id)
    {
        var chore = new Chore() {Id = id};
        var oneChore = _context.Chores.Find(id);
        return Ok(oneChore);
    }
    
    [HttpGet("rewards")]
    public IActionResult GetRewards()
    {
        return Ok(_context.Rewards);
    }

    [HttpPost("chores")]
    public async Task<IActionResult> AddChores(ChoreRequest request)
    {
        var newChore = new Chore() { Task = request.Task, Points = request.Points};
        _context.Chores.Add(newChore);
        await _context.SaveChangesAsync();
        return Ok(_context.Chores);
    } 
    
    [HttpPost("rewards")]
    public async Task<IActionResult> AddRewards(RewardRequest request)
    {
        var newReward = new Reward() { Task = request.Task, Points = request.Points};
        _context.Rewards.Add(newReward);
        await _context.SaveChangesAsync();
        return Ok(_context.Chores);
    }
    
    // [HttpPut("id")]
    // public async Task<IActionResult> UpdateComplete(RewardRequest rRequest)
    // {
    //     var chore = new Chore() { Chore.CompletionStatus = }
    //     _context.Rewards.Update(Chore);
    //     await _context.SaveChangesAsync();
    //     return Ok(_context.Chores);
    // }

    [HttpDelete("chores/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var chore = new Chore() {Id = id};
        var oneChore = _context.Chores.Find(id);
        if (oneChore == null) return NotFound();
        _context.Chores.Remove(oneChore);
        await _context.SaveChangesAsync();
        return Ok(oneChore);
    }
}