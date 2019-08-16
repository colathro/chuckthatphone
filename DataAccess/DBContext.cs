using Microsoft.EntityFrameworkCore;
using Backend.Controllers;
using Backend.Models;

namespace yeetmeto.space.DataAccess
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {
        }

        public DbSet<Throw> Throw { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Throw>().ToTable("Throw");
        }
    }
}