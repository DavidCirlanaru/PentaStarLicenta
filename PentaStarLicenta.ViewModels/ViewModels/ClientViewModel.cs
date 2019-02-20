using PentaStarLicenta.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PentaStarLicenta.ViewModels.ViewModels
{
    public class ClientViewModel
    {
        public int ClientId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Cnp { get; set; }
        public string IdentityCard { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Nationality { get; set; }

        public int Accomodation { get; set; }

    }
}
