namespace PentaStarLicenta.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Client",
                c => new
                    {
                        ClientId = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        SecondName = c.String(),
                        Cnp = c.String(),
                        IdentityCard = c.String(),
                        Email = c.String(),
                        Phone = c.String(),
                        Nationality_NationalityId = c.Int(),
                    })
                .PrimaryKey(t => t.ClientId)
                .ForeignKey("dbo.Nationality", t => t.Nationality_NationalityId)
                .Index(t => t.Nationality_NationalityId);
            
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
                .PrimaryKey(t => t.AccomodationRequestId)
                .ForeignKey("dbo.Accomodation", t => t.Accomodation_AccomodationId)
                .ForeignKey("dbo.RoomType", t => t.RoomType_RoomTypeId)
                .ForeignKey("dbo.Client", t => t.Client_ClientId)
                .Index(t => t.Accomodation_AccomodationId)
                .Index(t => t.RoomType_RoomTypeId)
                .Index(t => t.Client_ClientId);
            
            CreateTable(
                "dbo.Accomodation",
                c => new
                    {
                        AccomodationId = c.Int(nullable: false, identity: true),
                        FinalPrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        AccomodationRequestId = c.Int(nullable: false),
                        RoomId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.AccomodationId)
                .ForeignKey("dbo.Room", t => t.RoomId, cascadeDelete: true)
                .Index(t => t.RoomId);
            
            CreateTable(
                "dbo.Room",
                c => new
                    {
                        RoomId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Floor = c.String(),
                        Status = c.String(),
                        OccupationDate = c.DateTime(nullable: false),
                        ReleaseDate = c.DateTime(nullable: false),
                        RoomTypeId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.RoomId)
                .ForeignKey("dbo.RoomType", t => t.RoomTypeId, cascadeDelete: true)
                .Index(t => t.RoomTypeId);
            
            CreateTable(
                "dbo.RoomType",
                c => new
                    {
                        RoomTypeId = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.RoomTypeId);
            
            CreateTable(
                "dbo.Nationality",
                c => new
                    {
                        NationalityId = c.Int(nullable: false, identity: true),
                        Country = c.String(),
                    })
                .PrimaryKey(t => t.NationalityId);
            
            CreateTable(
                "dbo.Employee",
                c => new
                    {
                        EmployeeId = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        SecondName = c.String(),
                        Cnp = c.String(),
                        IdentityCard = c.String(),
                        Email = c.String(),
                        Phone = c.String(),
                        JobTypeId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.EmployeeId)
                .ForeignKey("dbo.JobType", t => t.JobTypeId, cascadeDelete: true)
                .Index(t => t.JobTypeId);
            
            CreateTable(
                "dbo.JobType",
                c => new
                    {
                        JobTypeId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.JobTypeId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Employee", "JobTypeId", "dbo.JobType");
            DropForeignKey("dbo.Client", "Nationality_NationalityId", "dbo.Nationality");
            DropForeignKey("dbo.AccomodationRequest", "Client_ClientId", "dbo.Client");
            DropForeignKey("dbo.Accomodation", "RoomId", "dbo.Room");
            DropForeignKey("dbo.Room", "RoomTypeId", "dbo.RoomType");
            DropForeignKey("dbo.AccomodationRequest", "RoomType_RoomTypeId", "dbo.RoomType");
            DropForeignKey("dbo.AccomodationRequest", "Accomodation_AccomodationId", "dbo.Accomodation");
            DropIndex("dbo.Employee", new[] { "JobTypeId" });
            DropIndex("dbo.Room", new[] { "RoomTypeId" });
            DropIndex("dbo.Accomodation", new[] { "RoomId" });
            DropIndex("dbo.AccomodationRequest", new[] { "Client_ClientId" });
            DropIndex("dbo.AccomodationRequest", new[] { "RoomType_RoomTypeId" });
            DropIndex("dbo.AccomodationRequest", new[] { "Accomodation_AccomodationId" });
            DropIndex("dbo.Client", new[] { "Nationality_NationalityId" });
            DropTable("dbo.JobType");
            DropTable("dbo.Employee");
            DropTable("dbo.Nationality");
            DropTable("dbo.RoomType");
            DropTable("dbo.Room");
            DropTable("dbo.Accomodation");
            DropTable("dbo.AccomodationRequest");
            DropTable("dbo.Client");
        }
    }
}
