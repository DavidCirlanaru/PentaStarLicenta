namespace PentaStarLicenta.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedEmployeeInUserTable : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Accomodation", "EmployeeId", "dbo.Employee");
            DropForeignKey("dbo.Employee", "JobTypeId", "dbo.JobType");
            DropIndex("dbo.Accomodation", new[] { "EmployeeId" });
            DropIndex("dbo.Employee", new[] { "JobTypeId" });
            AddColumn("dbo.Accomodation", "UserId", c => c.Int(nullable: false));
            AddColumn("dbo.Accomodation", "User_Id", c => c.String(maxLength: 128));
            AddColumn("dbo.User", "FirstName", c => c.String());
            AddColumn("dbo.User", "LastName", c => c.String());
            AddColumn("dbo.User", "Cnp", c => c.String());
            AddColumn("dbo.User", "IdentityCard", c => c.String());
            AddColumn("dbo.User", "Phone", c => c.String());
            AddColumn("dbo.User", "IdJobType", c => c.Int(nullable: false));
            AddColumn("dbo.User", "JobType_JobTypeId", c => c.Int());
            CreateIndex("dbo.Accomodation", "User_Id");
            CreateIndex("dbo.User", "JobType_JobTypeId");
            AddForeignKey("dbo.Accomodation", "User_Id", "dbo.User", "Id");
            AddForeignKey("dbo.User", "JobType_JobTypeId", "dbo.JobType", "JobTypeId");
            DropColumn("dbo.Accomodation", "EmployeeId");
            DropTable("dbo.Employee");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Employee",
                c => new
                    {
                        EmployeeId = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Cnp = c.String(),
                        IdentityCard = c.String(),
                        Email = c.String(),
                        Phone = c.String(),
                        JobTypeId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.EmployeeId);
            
            AddColumn("dbo.Accomodation", "EmployeeId", c => c.Int(nullable: false));
            DropForeignKey("dbo.User", "JobType_JobTypeId", "dbo.JobType");
            DropForeignKey("dbo.Accomodation", "User_Id", "dbo.User");
            DropIndex("dbo.User", new[] { "JobType_JobTypeId" });
            DropIndex("dbo.Accomodation", new[] { "User_Id" });
            DropColumn("dbo.User", "JobType_JobTypeId");
            DropColumn("dbo.User", "IdJobType");
            DropColumn("dbo.User", "Phone");
            DropColumn("dbo.User", "IdentityCard");
            DropColumn("dbo.User", "Cnp");
            DropColumn("dbo.User", "LastName");
            DropColumn("dbo.User", "FirstName");
            DropColumn("dbo.Accomodation", "User_Id");
            DropColumn("dbo.Accomodation", "UserId");
            CreateIndex("dbo.Employee", "JobTypeId");
            CreateIndex("dbo.Accomodation", "EmployeeId");
            AddForeignKey("dbo.Employee", "JobTypeId", "dbo.JobType", "JobTypeId", cascadeDelete: true);
            AddForeignKey("dbo.Accomodation", "EmployeeId", "dbo.Employee", "EmployeeId", cascadeDelete: true);
        }
    }
}
