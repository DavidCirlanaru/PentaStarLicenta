using PentaStarLicenta.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PentaStarLicenta.ViewModels.ViewModels
{
    public class AccomodationViewModel
    {
        public int AccomodationId { get; set; }
        public DateTime OccupationDate { get; set; }
        public DateTime ReleaseDate { get; set; }

        public int RoomId { get; set; }
        public string UserId { get; set; }
    }
}
