using PentaStarLicenta.DAL.Context;
using PentaStarLicenta.DAL.Models;
using PentaStarLicenta.ViewModels.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace PentaStarLicenta.ApiControllers
{
    public class StatisticsApiController : ApiController
    {
        private PentaStarContext db = new PentaStarContext();

        // GET: api/AccomodationsApi
        [ResponseType(typeof(AccomodationViewModel))]
        public IHttpActionResult GetIncomeSum()
        {
            var data = db.Accomodations.Select(a => new { a.Room.RoomType.Price, a.OccupationDate, a.ReleaseDate }).ToList();
            var x = data.Sum(a => a.Price * (decimal)Math.Ceiling((a.ReleaseDate - a.OccupationDate).TotalDays));

            return Ok(x);
        }

    }
}
