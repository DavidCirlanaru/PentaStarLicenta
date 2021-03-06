﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Itenso.TimePeriod;
using PentaStarLicenta.DAL.Context;
using PentaStarLicenta.DAL.Models;
using PentaStarLicenta.ViewModels;
using PentaStarLicenta.ViewModels.ViewModels;

namespace PentaStarLicenta.ApiControllers
{

    public class AccomodationsApiController : ApiController
    {
        private PentaStarContext db = new PentaStarContext();

        // GET: api/AccomodationsApi
        public List<AccomodationViewModel> GetAccomodations()
        {
            return db.Accomodations.OrderByDescending(x => x.AccomodationId).ToList().Select(x => ViewModelMapper.ToViewModelAccomodations(x)).ToList();
        }

        // GET: api/AccomodationsApi/5
        [ResponseType(typeof(AccomodationViewModel))]
        public IHttpActionResult GetAccomodation(int id)
        {
            Accomodation accomodation = db.Accomodations.Find(id);
            if (accomodation == null)
            {
                return NotFound();
            }

            return Ok(ViewModelMapper.ToViewModelAccomodations(accomodation));
        }

        // PUT: api/AccomodationsApi/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAccomodation(int id, AccomodationViewModel accomodationViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != accomodationViewModel.AccomodationId)
            {
                return BadRequest();
            }

            Accomodation accomodation = ViewModelMapper.ToModelAccomodations(accomodationViewModel);
            db.Entry(accomodation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccomodationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/AccomodationsApi
        [ResponseType(typeof(AccomodationViewModel))]
        public IHttpActionResult PostAccomodation(AccomodationViewModel accomodationViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Client c = db.Clients.SingleOrDefault(x => x.FirstName + " " + x.LastName == accomodationViewModel.ClientName);
            if(c == null)
            {
                string[] parts = accomodationViewModel.ClientName.Split(' ');
                Client newClient = new Client() { FirstName = parts.FirstOrDefault(), LastName = parts.LastOrDefault() };
                c = db.Clients.Add(newClient);
            }

            Accomodation accomodation = ViewModelMapper.ToModelAccomodations(accomodationViewModel);
            accomodation.Client = c;
            db.Accomodations.Add(accomodation);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = accomodation.AccomodationId }, ViewModelMapper.ToViewModelAccomodations(accomodation));
        }

        // DELETE: api/AccomodationsApi/5
        [ResponseType(typeof(AccomodationViewModel))]
        public IHttpActionResult DeleteAccomodation(int id)
        {
            Accomodation accomodation = db.Accomodations.Find(id);
            if (accomodation == null)
            {
                return NotFound();
            }

            db.Accomodations.Remove(accomodation);
            db.SaveChanges();

            return Ok(ViewModelMapper.ToViewModelAccomodations(accomodation));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccomodationExists(int id)
        {
            return db.Accomodations.Count(e => e.AccomodationId == id) > 0;
        }

        [HttpGet]
        [Route("api/AccomodationsApi/isRoomOccupied")]
        public IHttpActionResult IsRoomOccupied(int roomId, DateTime occupationDate, DateTime releaseDate)
        {
            var accomodationList = db.Accomodations.Where(x => x.Room.RoomId == roomId);
            TimeRange newPeriod = new TimeRange(occupationDate, releaseDate);
            bool IsOccupied = false;

            foreach (var date in accomodationList)
            {
                TimeRange existingPeriod = new TimeRange(date.OccupationDate, date.ReleaseDate);
                var intersection = existingPeriod.GetIntersection(newPeriod);
                if (intersection != null)
                {
                    IsOccupied = true;
                    break;

                }
            }

            return Ok(IsOccupied);

        }

        [Route("api/AccomodationsApi/getClientsArray")]
        public IHttpActionResult GetClientsArray()
        {
            var clientList = db.Clients.ToList().Select(x => x.FirstName + ' ' + x.LastName );

            return Ok(clientList);
        }


    }
}