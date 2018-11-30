using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using PentaStarLicenta.DAL.Context;
using PentaStarLicenta.DAL.Models;

namespace PentaStarLicenta.ApiControllers
{
    public class RoomTypesApiController : ApiController
    {
        private PentaStarContext db = new PentaStarContext();

        // GET: api/RoomTypes
        public IQueryable<RoomType> GetRoomTypes()
        {
            return db.RoomTypes;
        }

        // GET: api/RoomTypes/5
        [ResponseType(typeof(RoomType))]
        public IHttpActionResult GetRoomType(int id)
        {
            RoomType roomType = db.RoomTypes.Find(id);
            if (roomType == null)
            {
                return NotFound();
            }

            return Ok(roomType);
        }

        // PUT: api/RoomTypes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRoomType(int id, RoomType roomType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != roomType.RoomTypeId)
            {
                return BadRequest();
            }

            db.Entry(roomType).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomTypeExists(id))
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

        // POST: api/RoomTypes
        [ResponseType(typeof(RoomType))]
        public IHttpActionResult PostRoomType(RoomType roomType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RoomTypes.Add(roomType);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = roomType.RoomTypeId }, roomType);
        }

        // DELETE: api/RoomTypes/5
        [ResponseType(typeof(RoomType))]
        public IHttpActionResult DeleteRoomType(int id)
        {
            RoomType roomType = db.RoomTypes.Find(id);
            if (roomType == null)
            {
                return NotFound();
            }

            db.RoomTypes.Remove(roomType);
            db.SaveChanges();

            return Ok(roomType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoomTypeExists(int id)
        {
            return db.RoomTypes.Count(e => e.RoomTypeId == id) > 0;
        }
    }
}