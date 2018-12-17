namespace PentaStarLicenta.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AccomodationCollectionInEmployee : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Accomodation", "Employee_EmployeeId", c => c.Int());
            CreateIndex("dbo.Accomodation", "Employee_EmployeeId");
            AddForeignKey("dbo.Accomodation", "Employee_EmployeeId", "dbo.Employee", "EmployeeId");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Accomodation", "Employee_EmployeeId", "dbo.Employee");
            DropIndex("dbo.Accomodation", new[] { "Employee_EmployeeId" });
            DropColumn("dbo.Accomodation", "Employee_EmployeeId");
        }
    }
}
