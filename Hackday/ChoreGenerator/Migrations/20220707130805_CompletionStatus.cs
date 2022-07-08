using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hackDay.Migrations
{
    public partial class CompletionStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "CompletionStatus",
                table: "Rewards",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "CompletionStatus",
                table: "Chores",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompletionStatus",
                table: "Rewards");

            migrationBuilder.DropColumn(
                name: "CompletionStatus",
                table: "Chores");
        }
    }
}
