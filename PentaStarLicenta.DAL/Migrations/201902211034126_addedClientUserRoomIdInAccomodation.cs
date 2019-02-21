namespace PentaStarLicenta.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addedClientUserRoomIdInAccomodation : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Accomodation", "Client_ClientId", "dbo.Client");
            DropIndex("dbo.Accomodation", new[] { "Client_ClientId" });
            RenameColumn(table: "dbo.Accomodation", name: "User_Id", newName: "UserId");
            RenameColumn(table: "dbo.Accomodation", name: "Client_ClientId", newName: "ClientId");
            RenameIndex(table: "dbo.Accomodation", name: "IX_User_Id", newName: "IX_UserId");
            AlterColumn("dbo.Accomodation", "ClientId", c => c.Int(nullable: false));
            CreateIndex("dbo.Accomodation", "ClientId");
            AddForeignKey("dbo.Accomodation", "ClientId", "dbo.Client", "ClientId", cascadeDelete: true);
            DropColumn("dbo.Client", "AccomodationId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Client", "AccomodationId", c => c.Int(nullable: false));
            DropForeignKey("dbo.Accomodation", "ClientId", "dbo.Client");
            DropIndex("dbo.Accomodation", new[] { "ClientId" });
            AlterColumn("dbo.Accomodation", "ClientId", c => c.Int());
            RenameIndex(table: "dbo.Accomodation", name: "IX_UserId", newName: "IX_User_Id");
            RenameColumn(table: "dbo.Accomodation", name: "ClientId", newName: "Client_ClientId");
            RenameColumn(table: "dbo.Accomodation", name: "UserId", newName: "User_Id");
            CreateIndex("dbo.Accomodation", "Client_ClientId");
            AddForeignKey("dbo.Accomodation", "Client_ClientId", "dbo.Client", "ClientId");
        }
    }
}
