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

        public DbSet<Yeet> Yeet { get; set; }
        public DbSet<YeetDetail> YeetDetail { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Yeet>().ToTable("Yeet");
            modelBuilder.Entity<YeetDetail>().ToTable("YeetDetail");
        }
    }
}