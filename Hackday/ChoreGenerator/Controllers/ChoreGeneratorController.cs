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

    [HttpGet]
    public IActionResult Get()
    {
       return Ok(_context.TableName);
    }
     [HttpPost]
    public async Task<IActionResult> Add(RequestModel request )
    {
        var newChore = new Chore() {Task = request.Task};
        _context.TableName.Add(newChore);
                await _context.SaveChangesAsync();
       return Ok(_context.TableName);
    }
    
}