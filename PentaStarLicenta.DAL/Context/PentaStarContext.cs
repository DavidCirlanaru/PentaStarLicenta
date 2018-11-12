using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using PentaStarLicenta.DAL.Models;

namespace PentaStarLicenta.DAL.Context
{
    public class PentaStarContext : DbContext
    {
        public PentaStarContext() : base("DefaultConnection")
        {
        }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Accomodation> Enrollments { get; set; }
        public DbSet<AccomodationRequest> Courses { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<JobType> JobTypes { get; set; }
        public DbSet<Nationality> Nationalities { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<RoomType> RoomTypes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>(); // prevents table names from being pluralized
        }

    }
}