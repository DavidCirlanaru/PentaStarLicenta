using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PentaStarLicenta.DAL.Models;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using PentaStarLicenta.DAL.Context;

namespace PentaStarLicenta.Controllers
{
    public class RezervariController : Controller
    {
        private PentaStarContext _context;

        public RezervariController()
        {
            _context = new PentaStarContext();
        }
        // GET: Rezervari
        public ActionResult Index()
        {
            var viewModel = new RoomType
            {
                Type = _context.Type.ToList()
            };
            return View(viewModel);

        }
    }
}