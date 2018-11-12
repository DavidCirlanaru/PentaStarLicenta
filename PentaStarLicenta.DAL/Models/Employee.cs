using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PentaStarLicenta.DAL.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string Cnp { get; set; }
        public string IdentityCard { get; set; }       
        public string Email { get; set; }      
        public string Phone { get; set; }

        public int JobTypeId { get; set; }
        public JobType JobType { get; set; }

    }
}