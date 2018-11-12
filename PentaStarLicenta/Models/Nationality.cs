using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PentaStarLicenta.Models
{
    public class Nationality
    {
        public int NationalityId { get; set; }
        public string Country { get; set; }

        public virtual ICollection<Client> Client { get; set; } //more than one client can have the same nationality.
    }
}