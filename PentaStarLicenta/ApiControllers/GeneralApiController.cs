using Itenso.TimePeriod;
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
            //Revenue = Sum (RoomTypePrice * (ReleaseDate - OccupationDate));  
            var accomodationList = db.Accomodations.Select(a => new { a.Room.RoomType.Price, a.OccupationDate, a.ReleaseDate }).ToList();
            var revenue = accomodationList.Sum(a => a.Price * (decimal)Math.Ceiling((a.ReleaseDate - a.OccupationDate).TotalDays));

            return Ok(revenue);
        }

        [Route("api/GeneralApi/GetNumberOfClients")]
        [ResponseType(typeof(ClientViewModel))]
        public IHttpActionResult GetNumberOfClients()
        {
            var clientList = db.Clients.ToList().Select(x => ViewModelMapper.ToViewModelClients(x)).ToList();
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
            var accomodationList = db.Accomodations.Where(x => x.OccupationDate.Year == DateTime.Now.Year).ToList();
            int[] reservationsPerMonth = new int[12];
            for (int i = 0; i < 12; i++)
            {
                bool accomodationExists = false;
                foreach (var ac in accomodationList)
                {
                    if ((i + 1) == ac.OccupationDate.Month)
                    {
                        reservationsPerMonth[i] = accomodationList.Count(x => x.OccupationDate.Month == (i + 1));
                        accomodationExists = true;
                        break;
                    }

                }
                if (accomodationExists == false)
                {
                    reservationsPerMonth[i] = 0;
                }
            }

            return reservationsPerMonth;
        }

        [Route("api/GeneralApi/getIncomePerYear")]
        public IHttpActionResult getIncomePerYear()
        {
            var accomodationList = db.Accomodations.Select(a => new { a.Room.RoomType.Price, a.OccupationDate, a.ReleaseDate }).ToList();

            //number of unique years from all accomodations starting from 2016
            var yearsList = db.Accomodations.Where(x => x.OccupationDate.Year >= 2016)
                .Select(a => a.OccupationDate.Year).Distinct().ToList();
            
            decimal[] incomePerYear = new decimal[yearsList.Count()];
            int i = 0;
            foreach (var year in yearsList)
            {
                incomePerYear[i] += accomodationList.Where(x => x.OccupationDate.Year == year).
                    Sum(a => a.Price * (decimal)Math.Ceiling((a.ReleaseDate - a.OccupationDate).TotalDays));
                i++;
            }

            return Ok(incomePerYear);
        }

        [Route("api/GeneralApi/getOccupiedRooms")]
        public IHttpActionResult getOccupiedRooms()
        {
            DateTime start = new DateTime(DateTime.Now.Year, 1, 1);
            DateTime end = DateTime.Now;
            //time range between 01/01 - present
            TimeRange trPeriod = new TimeRange(start, end);
            
            double sum = 0;

            foreach (var r in db.Rooms.ToList())
            {
                foreach (var a in r.Accomodations)
                {
                    TimeRange tr = new TimeRange(a.OccupationDate, a.ReleaseDate);
                    var result = tr.GetIntersection(trPeriod);
                    if (result != null)
                    {
                        sum += result.Duration.TotalDays;
                    }
                }
            }

            // Procent ocupabilitate camere
            double frac = 100d * sum / (db.Rooms.Count() * trPeriod.Duration.TotalDays);

            return Ok (frac);
        }

    }
}
