using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using PentaStarLicenta.DAL.Models;
using Microsoft.AspNet.Identity.EntityFramework;

namespace PentaStarLicenta.DAL.Context
{
    public class PentaStarContext : IdentityDbContext<User>
    {
        public PentaStarContext() : base("DefaultConnection")
        {
        }

        public static PentaStarContext Create()
        {
            return new PentaStarContext();
        }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Accomodation> Accomodations { get; set; }
        public DbSet<JobType> JobTypes { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<RoomType> RoomTypes { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>(); // prevents table names from being pluralized
            modelBuilder.Entity<IdentityUserLogin>().HasKey<string>(l => l.UserId);
            modelBuilder.Entity<IdentityRole>().HasKey<string>(r => r.Id);
            modelBuilder.Entity<IdentityUserRole>().HasKey(r => new { r.RoleId, r.UserId });
        }

    }
}