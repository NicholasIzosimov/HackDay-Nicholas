using Microsoft.EntityFrameworkCore;
using ChoreGenerator.Models;

namespace ChoreGenerator.Data;

public class ChoreGeneratorContext : DbContext
{
    public DbSet<Chore> Chores { get; set; }
    public DbSet<Reward> Rewards { get; set; }

    public ChoreGeneratorContext(DbContextOptions<ChoreGeneratorContext> options)
        : base(options)
    {
    }

    
}