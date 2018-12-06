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
using PentaStarLicenta.ViewModels;
using PentaStarLicenta.ViewModels.ViewModels;

namespace PentaStarLicenta.ApiControllers
{
    public class RoomsApiController : ApiController
    {
        private PentaStarContext db = new PentaStarContext();
        
        // GET: api/RoomsApi
        public List<RoomViewModel> GetRooms()
        {
            return db.Rooms.ToList().Select(x => ViewModelMapper.ToViewModelRooms(x)).ToList();
        }

        // GET: api/RoomsApi/5
        [ResponseType(typeof(RoomViewModel))]
        public IHttpActionResult GetRoom(int id)
        {
            Room room = db.Rooms.Find(id);
            if (room == null)
            {
                return NotFound();
            }

            return Ok(ViewModelMapper.ToViewModelRooms(room));
        }

        // PUT: api/RoomsApi/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRoom(int id, RoomViewModel roomViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != roomViewModel.RoomId)
            {
                return BadRequest();
            }
            Room room = ViewModelMapper.ToModelRooms(roomViewModel);
            db.Entry(room).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExists(id))
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

        // POST: api/RoomsApi
        [ResponseType(typeof(RoomViewModel))]
        public IHttpActionResult PostRoom(RoomViewModel roomViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Room room = ViewModelMapper.ToModelRooms(roomViewModel);
            db.Rooms.Add(room);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = room.RoomId }, ViewModelMapper.ToViewModelRooms(room));
        }

        // DELETE: api/RoomsApi/5
        [ResponseType(typeof(RoomViewModel))]
        public IHttpActionResult DeleteRoom(int id)
        {
            Room room = db.Rooms.Find(id);
            if (room == null)
            {
                return NotFound();
            }

            db.Rooms.Remove(room);
            db.SaveChanges();

            return Ok(ViewModelMapper.ToViewModelRooms(room));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoomExists(int id)
        {
            return db.Rooms.Count(e => e.RoomId == id) > 0;
        }
    }
}