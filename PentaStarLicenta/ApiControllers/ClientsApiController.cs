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
    public class ClientsApiController : ApiController
    {
        private PentaStarContext db = new PentaStarContext();

        // GET: api/ClientsApi
        public List<ClientViewModel> GetClients()
        {
            return db.Clients.ToList().Select(x => ViewModelMapper.ToViewModelClients(x)).ToList();
        }

        // GET: api/ClientsApi/5
        [ResponseType(typeof(ClientViewModel))]
        public IHttpActionResult GetClient(int id)
        {
            Client client = db.Clients.Find(id);
            if (client == null)
            {
                return NotFound();
            }

            return Ok(ViewModelMapper.ToViewModelClients(client));
        }

        // PUT: api/ClientsApi/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutClient(int id, ClientViewModel clientViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != clientViewModel.ClientId)
            {
                return BadRequest();
            }
            Client client = ViewModelMapper.ToModelClients(clientViewModel);
            db.Entry(clientViewModel).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientExists(id))
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

        // POST: api/ClientsApi
        [ResponseType(typeof(ClientViewModel))]
        public IHttpActionResult PostClient(ClientViewModel clientViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Client client = ViewModelMapper.ToModelClients(clientViewModel);
            db.Clients.Add(client);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = client.ClientId }, ViewModelMapper.ToViewModelClients(client));
        }

        // DELETE: api/ClientsApi/5
        [ResponseType(typeof(ClientViewModel))]
        public IHttpActionResult DeleteClient(int id)
        {
            Client client = db.Clients.Find(id);
            if (client == null)
            {
                return NotFound();
            }

            db.Clients.Remove(client);
            db.SaveChanges();

            return Ok(ViewModelMapper.ToViewModelClients(client));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClientExists(int id)
        {
            return db.Clients.Count(e => e.ClientId == id) > 0;
        }
    }
}