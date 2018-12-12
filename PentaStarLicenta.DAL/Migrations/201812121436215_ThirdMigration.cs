namespace PentaStarLicenta.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ThirdMigration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Client", "LastName", c => c.String());
            AddColumn("dbo.Employee", "LastName", c => c.String());
            AddColumn("dbo.JobType", "Type", c => c.String());
            DropColumn("dbo.Accomodation", "FinalPrice");
            DropColumn("dbo.Room", "Status");
            DropColumn("dbo.Room", "OccupationDate");
            DropColumn("dbo.Room", "ReleaseDate");
            DropColumn("dbo.Client", "SecondName");
            DropColumn("dbo.Employee", "SecondName");
            DropColumn("dbo.JobType", "Name");
        }
        
        public override void Down()
        {
            AddColumn("dbo.JobType", "Name", c => c.String());
            AddColumn("dbo.Employee", "SecondName", c => c.String());
            AddColumn("dbo.Client", "SecondName", c => c.String());
            AddColumn("dbo.Room", "ReleaseDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.Room", "OccupationDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.Room", "Status", c => c.String());
            AddColumn("dbo.Accomodation", "FinalPrice", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            DropColumn("dbo.JobType", "Type");
            DropColumn("dbo.Employee", "LastName");
            DropColumn("dbo.Client", "LastName");
        }
    }
}
