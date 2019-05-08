namespace PentaStarLicenta.DAL.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<PentaStarLicenta.DAL.Context.PentaStarContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "PentaStarLicenta.DAL.Context.PentaStarContext";
        }

        protected override void Seed(PentaStarLicenta.DAL.Context.PentaStarContext context)
        {
            //RoomTypes
            context.RoomTypes.AddOrUpdate(x => x.RoomTypeId,
                new Models.RoomType() { RoomTypeId = 1, Type = "Single", Price = 120 },
                new Models.RoomType() { RoomTypeId = 2, Type = "Double", Price = 220 },
                new Models.RoomType() { RoomTypeId = 3, Type = "Triple", Price = 120 }
                );

            //Rooms
            context.Rooms.AddOrUpdate(x => x.RoomId,
                new Models.Room() { RoomId = 1, Name = "101", Floor = "1", RoomTypeId = 1 },
                new Models.Room() { RoomId = 2, Name = "102", Floor = "1", RoomTypeId = 1 },

                new Models.Room() { RoomId = 3, Name = "201", Floor = "2", RoomTypeId = 2 },
                new Models.Room() { RoomId = 4, Name = "202", Floor = "2", RoomTypeId = 2 },

                new Models.Room() { RoomId = 5, Name = "301", Floor = "3", RoomTypeId = 3 },
                new Models.Room() { RoomId = 6, Name = "302", Floor = "3", RoomTypeId = 3 }
                );

            //Employees
            context.Users.AddOrUpdate(x => x.Id,
                new Models.User() { Id = "3dd66d11-4ea6-4d67-a72d-ea1a39d670fc", FirstName = "Florin", LastName = "Popescu", Cnp = "1970427035301", IdentityCard = "AZ 048098", JobTypeId = 1, UserName = "PopescuF", Email = "popescu.florin@pentastar.com", PhoneNumber = "0756879612" },
                new Models.User() { Id = "3dd66d11-4ea6-4d67-a72d-ea1a39d670fd", FirstName = "Gheorghe", LastName = "Bunceag", Cnp = "1970427045301", IdentityCard = "AZ 048097", JobTypeId = 1, UserName = "GheorgheB", Email = "gheorghe.bunceag@pentastar.com", PhoneNumber = "0756879613" }
                );


            //JobTypes
            context.JobTypes.AddOrUpdate(x => x.JobTypeId,
                new Models.JobType() { JobTypeId = 1, Type = "Receptionist" }
                );


            //Clients
            context.Clients.AddOrUpdate(x => x.ClientId,
                new Models.Client() { ClientId = 1, FirstName = "Livu", LastName = "Gherman", Cnp = "1970427035321", IdentityCard = "AZ 048068", Email = "liviu.gherman@gmail.com", Phone = "0756879612", Nationality = "Romania" },
                new Models.Client() { ClientId = 2, FirstName = "Silviu", LastName = "Moga", Cnp = "1972427035321", IdentityCard = "AZ 248068", Email = "silviu.moga@gmail.com", Phone = "0756579612", Nationality = "Romania" },
                new Models.Client() { ClientId = 3, FirstName = "Robert", LastName = "Patrascu", Cnp = "1973427035321", IdentityCard = "AZ 148068", Email = "robert.patrascu@gmail.com", Phone = "0756878612", Nationality = "Romania" }
                );


            //Accomodations
            context.Accomodations.AddOrUpdate(x => x.AccomodationId,
                new Models.Accomodation() { AccomodationId = 1, ClientId = 1, OccupationDate = new DateTime(2016, 3, 25), ReleaseDate = new DateTime(2016, 3, 30), RoomId = 1, UserId = "3dd66d11-4ea6-4d67-a72d-ea1a39d670fc" },
                new Models.Accomodation() { AccomodationId = 2, ClientId = 2, OccupationDate = new DateTime(2017, 3, 25), ReleaseDate = new DateTime(2017, 3, 30), RoomId = 2, UserId = "3dd66d11-4ea6-4d67-a72d-ea1a39d670fd" },
                new Models.Accomodation() { AccomodationId = 3, ClientId = 3, OccupationDate = new DateTime(2018, 3, 25), ReleaseDate = new DateTime(2018, 3, 30), RoomId = 3, UserId = "3dd66d11-4ea6-4d67-a72d-ea1a39d670fd" },
                new Models.Accomodation() { AccomodationId = 4, ClientId = 1, OccupationDate = new DateTime(2019, 1, 15), ReleaseDate = new DateTime(2019, 1, 30), RoomId = 1, UserId = "3dd66d11-4ea6-4d67-a72d-ea1a39d670fd" },
                new Models.Accomodation() { AccomodationId = 5, ClientId = 1, OccupationDate = new DateTime(2019, 1, 15), ReleaseDate = new DateTime(2019, 1, 30), RoomId = 1, UserId = "3dd66d11-4ea6-4d67-a72d-ea1a39d670fd" },
                new Models.Accomodation() { AccomodationId = 6, ClientId = 1, OccupationDate = new DateTime(2019, 1, 15), ReleaseDate = new DateTime(2019, 1, 30), RoomId = 1, UserId = "3dd66d11-4ea6-4d67-a72d-ea1a39d670fd" },
                new Models.Accomodation() { AccomodationId = 7, ClientId = 2, OccupationDate = new DateTime(2019, 2, 26), ReleaseDate = new DateTime(2019, 2, 28), RoomId = 2, UserId = "3dd66d11-4ea6-4d67-a72d-ea1a39d670fc" },
                new Models.Accomodation() { AccomodationId = 8, ClientId = 3, OccupationDate = new DateTime(2019, 3, 25), ReleaseDate = new DateTime(2019, 3, 30), RoomId = 3, UserId = "3dd66d11-4ea6-4d67-a72d-ea1a39d670fc" },
                new Models.Accomodation() { AccomodationId = 9, ClientId = 3, OccupationDate = new DateTime(2019, 3, 25), ReleaseDate = new DateTime(2019, 3, 30), RoomId = 3, UserId = "3dd66d11-4ea6-4d67-a72d-ea1a39d670fc" },
                new Models.Accomodation() { AccomodationId = 10, ClientId = 1, OccupationDate = new DateTime(2019, 4, 25), ReleaseDate = new DateTime(2019, 4, 30), RoomId = 1, UserId = "3dd66d11-4ea6-4d67-a72d-ea1a39d670fd" },
                new Models.Accomodation() { AccomodationId = 11, ClientId = 2, OccupationDate = new DateTime(2019, 5, 25), ReleaseDate = new DateTime(2019, 5, 30), RoomId = 2, UserId = "3dd66d11-4ea6-4d67-a72d-ea1a39d670fd" },
                new Models.Accomodation() { AccomodationId = 12, ClientId = 3, OccupationDate = new DateTime(2019, 6, 25), ReleaseDate = new DateTime(2019, 6, 30), RoomId = 3, UserId = "3dd66d11-4ea6-4d67-a72d-ea1a39d670fd" },
                new Models.Accomodation() { AccomodationId = 13, ClientId = 3, OccupationDate = new DateTime(2019, 6, 25), ReleaseDate = new DateTime(2019, 6, 30), RoomId = 3, UserId = "3dd66d11-4ea6-4d67-a72d-ea1a39d670fd" },
                new Models.Accomodation() { AccomodationId = 14, ClientId = 3, OccupationDate = new DateTime(2019, 6, 25), ReleaseDate = new DateTime(2019, 6, 30), RoomId = 3, UserId = "3dd66d11-4ea6-4d67-a72d-ea1a39d670fd" }
                );


        }
    }
}
