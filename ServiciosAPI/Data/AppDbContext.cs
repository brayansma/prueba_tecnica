using Microsoft.EntityFrameworkCore;
using ServiciosAPI.Models;

namespace ServiciosAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuraciones de modelos
        }

        public DbSet<Productos> Productos { get; set; }
        public DbSet<Orden> Orden { get; set; }
    }
}