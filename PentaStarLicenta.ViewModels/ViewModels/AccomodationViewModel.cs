using PentaStarLicenta.DAL.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PentaStarLicenta.ViewModels.ViewModels
{
    public class AccomodationViewModel
    {
        public int AccomodationId { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime OccupationDate { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime ReleaseDate { get; set; }

        public int RoomId { get; set; }
        public string UserId { get; set; }
        public int ClientId { get; set; }
    }
}
