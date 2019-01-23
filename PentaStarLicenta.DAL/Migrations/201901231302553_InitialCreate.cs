namespace PentaStarLicenta.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Accomodation",
                c => new
                    {
                        AccomodationId = c.Int(nullable: false, identity: true),
                        OccupationDate = c.DateTime(nullable: false),
                        ReleaseDate = c.DateTime(nullable: false),
                        RoomId = c.Int(nullable: false),
                        User_Id = c.String(maxLength: 128),
                        Client_ClientId = c.Int(),
                    })
                .PrimaryKey(t => t.AccomodationId)
                .ForeignKey("dbo.Room", t => t.RoomId, cascadeDelete: true)
                .ForeignKey("dbo.User", t => t.User_Id)
                .ForeignKey("dbo.Client", t => t.Client_ClientId)
                .Index(t => t.RoomId)
                .Index(t => t.User_Id)
                .Index(t => t.Client_ClientId);
            
            CreateTable(
                "dbo.Room",
                c => new
                    {
                        RoomId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Floor = c.String(),
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
                "dbo.User",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Cnp = c.String(),
                        IdentityCard = c.String(),
                        JobTypeId = c.Int(nullable: false),
                        Email = c.String(),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.JobType", t => t.JobTypeId, cascadeDelete: true)
                .Index(t => t.JobTypeId);
            
            CreateTable(
                "dbo.IdentityUserClaim",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.User", t => t.UserId)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.JobType",
                c => new
                    {
                        JobTypeId = c.Int(nullable: false, identity: true),
                        Type = c.String(),
                    })
                .PrimaryKey(t => t.JobTypeId);
            
            CreateTable(
                "dbo.IdentityUserLogin",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        LoginProvider = c.String(),
                        ProviderKey = c.String(),
                        User_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.UserId)
                .ForeignKey("dbo.User", t => t.User_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.IdentityUserRole",
                c => new
                    {
                        RoleId = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                        IdentityRole_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => new { t.RoleId, t.UserId })
                .ForeignKey("dbo.User", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.IdentityRole", t => t.IdentityRole_Id)
                .Index(t => t.UserId)
                .Index(t => t.IdentityRole_Id);
            
            CreateTable(
                "dbo.Client",
                c => new
                    {
                        ClientId = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Cnp = c.String(),
                        IdentityCard = c.String(),
                        Email = c.String(),
                        Phone = c.String(),
                        Nationality = c.String(),
                    })
                .PrimaryKey(t => t.ClientId);
            
            CreateTable(
                "dbo.IdentityRole",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.IdentityUserRole", "IdentityRole_Id", "dbo.IdentityRole");
            DropForeignKey("dbo.Accomodation", "Client_ClientId", "dbo.Client");
            DropForeignKey("dbo.IdentityUserRole", "UserId", "dbo.User");
            DropForeignKey("dbo.IdentityUserLogin", "User_Id", "dbo.User");
            DropForeignKey("dbo.User", "JobTypeId", "dbo.JobType");
            DropForeignKey("dbo.IdentityUserClaim", "UserId", "dbo.User");
            DropForeignKey("dbo.Accomodation", "User_Id", "dbo.User");
            DropForeignKey("dbo.Accomodation", "RoomId", "dbo.Room");
            DropForeignKey("dbo.Room", "RoomTypeId", "dbo.RoomType");
            DropIndex("dbo.IdentityUserRole", new[] { "IdentityRole_Id" });
            DropIndex("dbo.IdentityUserRole", new[] { "UserId" });
            DropIndex("dbo.IdentityUserLogin", new[] { "User_Id" });
            DropIndex("dbo.IdentityUserClaim", new[] { "UserId" });
            DropIndex("dbo.User", new[] { "JobTypeId" });
            DropIndex("dbo.Room", new[] { "RoomTypeId" });
            DropIndex("dbo.Accomodation", new[] { "Client_ClientId" });
            DropIndex("dbo.Accomodation", new[] { "User_Id" });
            DropIndex("dbo.Accomodation", new[] { "RoomId" });
            DropTable("dbo.IdentityRole");
            DropTable("dbo.Client");
            DropTable("dbo.IdentityUserRole");
            DropTable("dbo.IdentityUserLogin");
            DropTable("dbo.JobType");
            DropTable("dbo.IdentityUserClaim");
            DropTable("dbo.User");
            DropTable("dbo.RoomType");
            DropTable("dbo.Room");
            DropTable("dbo.Accomodation");
        }
    }
}
