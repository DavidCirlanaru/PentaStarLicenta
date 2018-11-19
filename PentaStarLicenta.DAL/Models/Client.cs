using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PentaStarLicenta.DAL.Models
{
    public class Client
    {
        public int ClientId { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string Cnp { get; set; }
        public string IdentityCard { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public virtual Nationality Nationality { get; set; }
        public virtual ICollection<AccomodationRequest> AccomodationRequest { get; set; }  //a client can have more accomodation requests.
    }
}