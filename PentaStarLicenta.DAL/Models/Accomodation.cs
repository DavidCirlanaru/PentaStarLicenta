using PentaStarLicenta.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PentaStarLicenta.DAL.Models
{
    public class Accomodation
    {
        public int AccomodationId { get; set; }
        public DateTime OccupationDate { get; set; }
        public DateTime ReleaseDate { get; set; }

        public int RoomId { get; set; }
        public Room Room { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}