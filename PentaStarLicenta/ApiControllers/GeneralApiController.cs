using PentaStarLicenta.DAL.Context;
using PentaStarLicenta.ViewModels;
using PentaStarLicenta.ViewModels.ViewModels;
using System;
using System.Collections;
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

        [Route("api/GeneralApi/GetNumberOfEmployees")]
        [ResponseType(typeof(UserViewModel))]
        public IHttpActionResult GetNumberOfEmployees()
        {
            var employeeList = db.Users.ToList().Select(x => ViewModelMapper.ToViewModelUsers(x)).ToList();
            var numberOfEmployees = employeeList.Count;

            return Ok(numberOfEmployees);
        }

        [Route("api/GeneralApi/GetNumberOfRooms")]
        [ResponseType(typeof(RoomViewModel))]
        public IHttpActionResult GetNumberOfRooms()
        {
            var roomList = db.Rooms.ToList().Select(x => ViewModelMapper.ToViewModelRooms(x)).ToList();
            var numberOfRooms = roomList.Count;

            return Ok(numberOfRooms);
        }

        [Route("api/GeneralApi/getAccomodationsPerMonth")]
        public int[] getAccomodationsPerMonth()
        {
            //var occupationDatesList = db.Accomodations.Select(a => new { a.OccupationDate }).ToList();
            //var occupationDateNumber = occupationDatesList.Count;

            //var accomodationList = db.Accomodations.Where(x => x.OccupationDate.Year == DateTime.Now.Year).GroupBy(x => x.OccupationDate.Month).Select(a => a.Count()).ToList();

            var accomodationList = db.Accomodations.Where(x => x.OccupationDate.Year == DateTime.Now.Year).ToList();
            int[] reservationsPerMonth = new int[12];
            for (int i = 0; i < 12; i++)
            {
                bool exists = false;
                foreach (var ac in accomodationList)
                {
                    if ((i + 1) == ac.OccupationDate.Month)
                    {
                        reservationsPerMonth[i] = accomodationList.Where(x => x.OccupationDate.Month == (i + 1)).Count();
                        exists = true;
                        break;
                    }

                }
                if (exists == false)
                {
                    reservationsPerMonth[i] = 0;
                }
            }

            return reservationsPerMonth;
        }

        

    }
}
