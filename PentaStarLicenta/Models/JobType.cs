using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PentaStarLicenta.Models
{
    public class JobType
    {
        public int JobTypeId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Employee> Employee { get; set; } // a job type can have more than one employees.
    }
}