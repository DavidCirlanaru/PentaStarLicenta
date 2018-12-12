using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PentaStarLicenta.DAL;
using PentaStarLicenta.DAL.Models;
using PentaStarLicenta.Models;

namespace PentaStarLicenta.Controllers
{
    public class RezervariController : Controller
    {

        private ApplicationDbContext _context;
        // GET: Rezervari
        
        public ActionResult Index()
        {
            
            return View();
      
        }

        [HttpPost]
        public ActionResult Index(Client client)
        {
            _context = new ApplicationDbContext();
            try
            {
                if (ModelState.IsValid)
                {
                    ViewData["FirstName"] = client.FirstName;
                    ViewData["SecondName"] = client.SecondName;
                    ViewData["Cnp"] = client.Cnp;
                    ViewData["IdentityCard"] = client.IdentityCard;
                    ViewData["Email"] = client.Email;
                    ViewData["Phone"] = client.Phone;
                    ViewData["Nationality"] = client.Nationality;

                }

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }

        }
    }
}


   