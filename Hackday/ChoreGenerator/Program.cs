using Microsoft.EntityFrameworkCore;
using ChoreGenerator.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddDbContext<ChoreGeneratorContext>(options =>
    // options.UseSqlServer(builder.Configuration.GetConnectionString("ChoreGeneratorContext")));
  options.UseInMemoryDatabase("HackDay"));


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
    app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
