namespace PentaStarLicenta.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Test : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Accomodation", "Employee_EmployeeId", "dbo.Employee");
            DropIndex("dbo.Accomodation", new[] { "Employee_EmployeeId" });
            RenameColumn(table: "dbo.Accomodation", name: "Employee_EmployeeId", newName: "EmployeeId");
            AlterColumn("dbo.Accomodation", "EmployeeId", c => c.Int(nullable: false));
            CreateIndex("dbo.Accomodation", "EmployeeId");
            AddForeignKey("dbo.Accomodation", "EmployeeId", "dbo.Employee", "EmployeeId", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Accomodation", "EmployeeId", "dbo.Employee");
            DropIndex("dbo.Accomodation", new[] { "EmployeeId" });
            AlterColumn("dbo.Accomodation", "EmployeeId", c => c.Int());
            RenameColumn(table: "dbo.Accomodation", name: "EmployeeId", newName: "Employee_EmployeeId");
            CreateIndex("dbo.Accomodation", "Employee_EmployeeId");
            AddForeignKey("dbo.Accomodation", "Employee_EmployeeId", "dbo.Employee", "EmployeeId");
        }
    }
}
