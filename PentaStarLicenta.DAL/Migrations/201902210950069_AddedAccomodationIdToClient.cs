namespace PentaStarLicenta.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedAccomodationIdToClient : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Client", "AccomodationId", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Client", "AccomodationId");
        }
    }
}
