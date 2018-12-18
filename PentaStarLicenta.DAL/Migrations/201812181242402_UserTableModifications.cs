namespace PentaStarLicenta.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserTableModifications : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Accomodation", "UserId");
            DropColumn("dbo.User", "Phone");
        }
        
        public override void Down()
        {
            AddColumn("dbo.User", "Phone", c => c.String());
            AddColumn("dbo.Accomodation", "UserId", c => c.Int(nullable: false));
        }
    }
}
