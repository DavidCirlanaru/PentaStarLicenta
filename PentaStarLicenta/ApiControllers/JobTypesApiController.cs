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
    public class JobTypesApiController : ApiController
    {
        private PentaStarContext db = new PentaStarContext();

        // GET: api/JobTypes
        public List<JobTypeViewModel> GetJobTypes()
        {
            return db.JobTypes.ToList().Select(x => ViewModelMapper.ToViewModelJobTypes(x)).ToList();
        }

        // GET: api/JobTypes/5
        [ResponseType(typeof(JobTypeViewModel))]
        public IHttpActionResult GetJobType(int id)
        {
            JobType jobType = db.JobTypes.Find(id);
            if (jobType == null)
            {
                return NotFound();
            }

            return Ok(ViewModelMapper.ToViewModelJobTypes(jobType));
        }

        // PUT: api/JobTypes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutJobType(int id, JobTypeViewModel jobTypeViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != jobTypeViewModel.JobTypeId)
            {
                return BadRequest();
            }

            JobType jobType = ViewModelMapper.ToModelJobTypes(jobTypeViewModel);
            db.Entry(jobType).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobTypeExists(id))
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

        // POST: api/JobTypes
        [ResponseType(typeof(JobTypeViewModel))]
        public IHttpActionResult PostJobType(JobTypeViewModel jobTypeViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            JobType jobType = ViewModelMapper.ToModelJobTypes(jobTypeViewModel);
            db.JobTypes.Add(jobType);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = jobType.JobTypeId }, ViewModelMapper.ToViewModelJobTypes(jobType));
        }

        // DELETE: api/JobTypes/5
        [ResponseType(typeof(JobTypeViewModel))]
        public IHttpActionResult DeleteJobType(int id)
        {
            JobType jobType = db.JobTypes.Find(id);
            if (jobType == null)
            {
                return NotFound();
            }

            db.JobTypes.Remove(jobType);
            db.SaveChanges();

            return Ok(ViewModelMapper.ToViewModelJobTypes(jobType));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool JobTypeExists(int id)
        {
            return db.JobTypes.Count(e => e.JobTypeId == id) > 0;
        }
    }
}