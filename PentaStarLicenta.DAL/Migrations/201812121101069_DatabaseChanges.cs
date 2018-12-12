namespace PentaStarLicenta.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DatabaseChanges : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.AccomodationRequest", "Accomodation_AccomodationId", "dbo.Accomodation");
            DropForeignKey("dbo.AccomodationRequest", "RoomType_RoomTypeId", "dbo.RoomType");
            DropForeignKey("dbo.AccomodationRequest", "Client_ClientId", "dbo.Client");
            DropForeignKey("dbo.Client", "Nationality_NationalityId", "dbo.Nationality");
            DropIndex("dbo.Client", new[] { "Nationality_NationalityId" });
            DropIndex("dbo.AccomodationRequest", new[] { "Accomodation_AccomodationId" });
            DropIndex("dbo.AccomodationRequest", new[] { "RoomType_RoomTypeId" });
            DropIndex("dbo.AccomodationRequest", new[] { "Client_ClientId" });
            AddColumn("dbo.Client", "Nationality", c => c.String());
            AddColumn("dbo.Accomodation", "OccupationDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.Accomodation", "ReleaseDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.Accomodation", "RoomType_RoomTypeId", c => c.Int());
            AddColumn("dbo.Accomodation", "Client_ClientId", c => c.Int());
            CreateIndex("dbo.Accomodation", "RoomType_RoomTypeId");
            CreateIndex("dbo.Accomodation", "Client_ClientId");
            AddForeignKey("dbo.Accomodation", "RoomType_RoomTypeId", "dbo.RoomType", "RoomTypeId");
            AddForeignKey("dbo.Accomodation", "Client_ClientId", "dbo.Client", "ClientId");
            DropColumn("dbo.Client", "Nationality_NationalityId");
            DropColumn("dbo.Accomodation", "AccomodationRequestId");
            DropTable("dbo.AccomodationRequest");
            DropTable("dbo.Nationality");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Nationality",
                c => new
                    {
                        NationalityId = c.Int(nullable: false, identity: true),
                        Country = c.String(),
                    })
                .PrimaryKey(t => t.NationalityId);
            
            CreateTable(
                "dbo.AccomodationRequest",
                c => new
                    {
                        AccomodationRequestId = c.Int(nullable: false, identity: true),
                        OccupationDate = c.DateTime(nullable: false),
                        ReleaseDate = c.DateTime(nullable: false),
                        Accomodation_AccomodationId = c.Int(),
                        RoomType_RoomTypeId = c.Int(),
                        Client_ClientId = c.Int(),
                    })
                .PrimaryKey(t => t.AccomodationRequestId);
            
            AddColumn("dbo.Accomodation", "AccomodationRequestId", c => c.Int(nullable: false));
            AddColumn("dbo.Client", "Nationality_NationalityId", c => c.Int());
            DropForeignKey("dbo.Accomodation", "Client_ClientId", "dbo.Client");
            DropForeignKey("dbo.Accomodation", "RoomType_RoomTypeId", "dbo.RoomType");
            DropIndex("dbo.Accomodation", new[] { "Client_ClientId" });
            DropIndex("dbo.Accomodation", new[] { "RoomType_RoomTypeId" });
            DropColumn("dbo.Accomodation", "Client_ClientId");
            DropColumn("dbo.Accomodation", "RoomType_RoomTypeId");
            DropColumn("dbo.Accomodation", "ReleaseDate");
            DropColumn("dbo.Accomodation", "OccupationDate");
            DropColumn("dbo.Client", "Nationality");
            CreateIndex("dbo.AccomodationRequest", "Client_ClientId");
            CreateIndex("dbo.AccomodationRequest", "RoomType_RoomTypeId");
            CreateIndex("dbo.AccomodationRequest", "Accomodation_AccomodationId");
            CreateIndex("dbo.Client", "Nationality_NationalityId");
            AddForeignKey("dbo.Client", "Nationality_NationalityId", "dbo.Nationality", "NationalityId");
            AddForeignKey("dbo.AccomodationRequest", "Client_ClientId", "dbo.Client", "ClientId");
            AddForeignKey("dbo.AccomodationRequest", "RoomType_RoomTypeId", "dbo.RoomType", "RoomTypeId");
            AddForeignKey("dbo.AccomodationRequest", "Accomodation_AccomodationId", "dbo.Accomodation", "AccomodationId");
        }
    }
}
