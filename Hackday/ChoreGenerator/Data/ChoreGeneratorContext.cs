using Microsoft.EntityFrameworkCore;
using ChoreGenerator.Models;

namespace ChoreGenerator.Data;

public class ChoreGeneratorContext : DbContext
{
    public DbSet<Chore> Chores { get; set; }

    public ChoreGeneratorContext(DbContextOptions<ChoreGeneratorContext> options, DbSet<Chore> chores)
        : base(options)
    {
        Chores = chores;
    }

    public DbSet<Chore>? TableName { get; set; }
}