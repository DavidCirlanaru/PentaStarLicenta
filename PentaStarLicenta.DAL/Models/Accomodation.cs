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

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime OccupationDate { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime ReleaseDate { get; set; }

        public Room Room { get; set; }
        public int RoomId { get; set; }

        public User User { get; set; }
        public string UserId { get; set; }

        public Client Client { get; set; }
        public int ClientId { get; set; }
    }
}