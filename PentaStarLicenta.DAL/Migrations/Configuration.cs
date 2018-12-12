namespace PentaStarLicenta.DAL.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<PentaStarLicenta.DAL.Context.PentaStarContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "PentaStarLicenta.DAL.Context.PentaStarContext";
        }

        protected override void Seed(PentaStarLicenta.DAL.Context.PentaStarContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
        }
    }
}
