namespace PentaStarLicenta.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SecondDatabaseChanges : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Accomodation", "RoomType_RoomTypeId", "dbo.RoomType");
            DropIndex("dbo.Accomodation", new[] { "RoomType_RoomTypeId" });
            DropColumn("dbo.Accomodation", "RoomType_RoomTypeId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Accomodation", "RoomType_RoomTypeId", c => c.Int());
            CreateIndex("dbo.Accomodation", "RoomType_RoomTypeId");
            AddForeignKey("dbo.Accomodation", "RoomType_RoomTypeId", "dbo.RoomType", "RoomTypeId");
        }
    }
}
