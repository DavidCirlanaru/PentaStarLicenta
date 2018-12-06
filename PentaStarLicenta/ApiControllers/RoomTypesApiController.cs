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
    
    public class RoomTypesApiController : ApiController
    {
        private PentaStarContext db = new PentaStarContext();

        // GET: api/RoomTypes
        public List<RoomTypeViewModel> GetRoomTypes()
        {
            return db.RoomTypes.ToList().Select(x => ViewModelMapper.ToViewModelRoomTypes(x)).ToList();
        }


        // GET: api/RoomTypes/5
        [ResponseType(typeof(RoomTypeViewModel))]
        public IHttpActionResult GetRoomType(int id)
        {
            RoomType roomType = db.RoomTypes.Find(id);
            if (roomType == null)
            {
                return NotFound();
            }

            return Ok(ViewModelMapper.ToViewModelRoomTypes(roomType));
        }

        // PUT: api/RoomTypes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRoomType(int id, RoomTypeViewModel roomTypeViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != roomTypeViewModel.RoomTypeId)
            {
                return BadRequest();
            }
            RoomType roomType = ViewModelMapper.ToModelRoomTypes(roomTypeViewModel); 
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
        [ResponseType(typeof(RoomTypeViewModel))]
        public IHttpActionResult PostRoomType(RoomTypeViewModel roomTypeViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            RoomType roomType = ViewModelMapper.ToModelRoomTypes(roomTypeViewModel);
            db.RoomTypes.Add(roomType);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = roomType.RoomTypeId }, ViewModelMapper.ToViewModelRoomTypes(roomType));
        }

        // DELETE: api/RoomTypes/5
        
        [ResponseType(typeof(RoomTypeViewModel))]
        public IHttpActionResult DeleteRoomType(int id)
        {
            RoomType roomType = db.RoomTypes.Find(id);
            if (roomType == null)
            {
                return NotFound();
            }

            db.RoomTypes.Remove(roomType);
            db.SaveChanges();

            return Ok(ViewModelMapper.ToViewModelRoomTypes(roomType));
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