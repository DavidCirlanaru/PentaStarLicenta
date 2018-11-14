using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PentaStarLicenta.DAL.Models
{
    class AddReservationRequest
    {
        public string nume { get; set; }
        public string prenume { get; set; }
        public string email { get; set; }
        public string telefon { get; set; }
        public string cnp { get; set; }
        public string serieNr { get; set; }
        public string tara { get; set; }
        public string tipCamera { get; set; }
        public string dataSosire { get; set; }
        public string dataPlecare { get; set; }
    }
}
