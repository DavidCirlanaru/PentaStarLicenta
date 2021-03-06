﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PentaStarLicenta.DAL.Models
{
    public class Room
    {
        public int RoomId { get; set; }
        public string Name { get; set; }
        public string Floor { get; set; }
        public int RoomTypeId { get; set; }
        public RoomType RoomType { get; set; }

        public virtual ICollection<Accomodation> Accomodations { get; set; }
    }
}