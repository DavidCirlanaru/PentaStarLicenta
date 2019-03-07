using PentaStarLicenta.DAL.Context;
using PentaStarLicenta.ViewModels;
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
    public class GeneralApiController : ApiController
    {
        private PentaStarContext db = new PentaStarContext();

        [Route("api/GeneralApi/GetIncomeSum")]
        [ResponseType(typeof(AccomodationViewModel))]
        public IHttpActionResult GetIncomeSum()
        {
            //Reveneu = Sum (RoomTypePrice * (ReleaseDate - OccupationDate));  
            var accomodationList = db.Accomodations.Select(a => new { a.Room.RoomType.Price, a.OccupationDate, a.ReleaseDate }).ToList();
            var revenue = accomodationList.Sum(a => a.Price * (decimal)Math.Ceiling((a.ReleaseDate - a.OccupationDate).TotalDays));

            return Ok(revenue);
        }

        [Route("api/GeneralApi/GetNumberOfClients")]
        [ResponseType(typeof(ClientViewModel))]
        public IHttpActionResult GetNumberOfClients()
        {
            var clientList = db.Clients.ToList().Select(x => ViewModelMapper.ToViewModelClients (x)).ToList();
            var numberOfClients = clientList.Count;

            return Ok(numberOfClients);
        }
    }
}
