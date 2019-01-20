using PentaStarLicenta.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PentaStarLicenta.ViewModels.ViewModels
{
  public class RoomViewModel
    {
        public int RoomId { get; set; }
        public string Name { get; set; }
        public string Floor { get; set; }
        public int RoomTypeId { get; set; }
    }
}
