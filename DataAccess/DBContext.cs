using Microsoft.EntityFrameworkCore;
using yeetmeto.space.Controllers;
using yeetmeto.space.Models;

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