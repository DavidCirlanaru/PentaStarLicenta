using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PentaStarLicenta.Models
{
    public class Accomodation
    {
        public int AccomodationId { get; set; }
        public decimal FinalPrice { get; set; }

        public int AccomodationRequestId { get; set; }
        public int RoomId { get; set; }
        public Room Room { get; set; }

        public virtual ICollection<AccomodationRequest> AccomodationRequest { get; set; }  //an accomodation can have more accomodation requests.
    }
}