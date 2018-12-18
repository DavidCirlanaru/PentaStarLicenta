using PentaStarLicenta.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PentaStarLicenta.DAL.Models
{
    public class JobType
    {
        public int JobTypeId { get; set; }
        public string Type { get; set; }

        public virtual ICollection<User> User { get; set; } // a job type can have more than one employees.
    }
}