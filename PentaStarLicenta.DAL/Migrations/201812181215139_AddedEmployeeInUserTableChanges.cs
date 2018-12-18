namespace PentaStarLicenta.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedEmployeeInUserTableChanges : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.User", "IdJobType");
        }
        
        public override void Down()
        {
            AddColumn("dbo.User", "IdJobType", c => c.Int(nullable: false));
        }
    }
}
