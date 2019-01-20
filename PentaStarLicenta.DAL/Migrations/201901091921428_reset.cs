namespace PentaStarLicenta.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class reset : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.User", "JobTypeId", "dbo.JobType");
            DropIndex("dbo.User", new[] { "JobTypeId" });
            RenameColumn(table: "dbo.User", name: "JobTypeId", newName: "JobType_JobTypeId");
            AlterColumn("dbo.User", "JobType_JobTypeId", c => c.Int());
            CreateIndex("dbo.User", "JobType_JobTypeId");
            AddForeignKey("dbo.User", "JobType_JobTypeId", "dbo.JobType", "JobTypeId");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.User", "JobType_JobTypeId", "dbo.JobType");
            DropIndex("dbo.User", new[] { "JobType_JobTypeId" });
            AlterColumn("dbo.User", "JobType_JobTypeId", c => c.Int(nullable: false));
            RenameColumn(table: "dbo.User", name: "JobType_JobTypeId", newName: "JobTypeId");
            CreateIndex("dbo.User", "JobTypeId");
            AddForeignKey("dbo.User", "JobTypeId", "dbo.JobType", "JobTypeId", cascadeDelete: true);
        }
    }
}
