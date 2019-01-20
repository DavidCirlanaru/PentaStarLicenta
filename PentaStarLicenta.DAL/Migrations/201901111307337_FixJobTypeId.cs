namespace PentaStarLicenta.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FixJobTypeId : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.User", "JobType_JobTypeId", "dbo.JobType");
            DropIndex("dbo.User", new[] { "JobType_JobTypeId" });
            RenameColumn(table: "dbo.User", name: "JobType_JobTypeId", newName: "JobTypeId");
            AlterColumn("dbo.User", "JobTypeId", c => c.Int(nullable: false));
            CreateIndex("dbo.User", "JobTypeId");
            AddForeignKey("dbo.User", "JobTypeId", "dbo.JobType", "JobTypeId", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.User", "JobTypeId", "dbo.JobType");
            DropIndex("dbo.User", new[] { "JobTypeId" });
            AlterColumn("dbo.User", "JobTypeId", c => c.Int());
            RenameColumn(table: "dbo.User", name: "JobTypeId", newName: "JobType_JobTypeId");
            CreateIndex("dbo.User", "JobType_JobTypeId");
            AddForeignKey("dbo.User", "JobType_JobTypeId", "dbo.JobType", "JobTypeId");
        }
    }
}
