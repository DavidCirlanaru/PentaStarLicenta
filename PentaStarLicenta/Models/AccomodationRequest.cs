﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PentaStarLicenta.Models
{
    public class AccomodationRequest
    {
        public int AccomodationRequestId { get; set; }
        public DateTime OccupationDate { get; set; }
        public DateTime ReleaseDate { get; set; }

        //public int ClientId { get; set; }
        //public int RoomTypeId { get; set; }
        public Client Client { get; set; }
        public RoomType RoomType { get; set; }
        public Accomodation Accomodation { get; set; }
        

    }
}