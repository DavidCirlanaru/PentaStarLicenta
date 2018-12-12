using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PentaStarLicenta.DAL.Models
{
    public class RoomType
    {
        public int RoomTypeId { get; set; }
        public string Type { get; set; }
        public decimal Price { get; set; }
        public virtual ICollection<Room> Room { get; set; } // there are more than one rooms of the same type.
    }
}