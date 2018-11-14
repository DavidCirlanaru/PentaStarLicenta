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

namespace PentaStarLicenta.Controllers
{
    public class RezervariController : Controller
    {
        // GET: Rezervari
        public ActionResult Index()
        {
            return View();

        }

        //private SqlConnection con; 

        //private void connection()
        //{
        //    string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString();
        //    con = new SqlConnection(constr);
        //}

        //[HttpPost]
        //public ActionResult AddReservationRequest (Client clients)
        //{
        //    try
        //    {
        //        if (ModelState.IsValid)
        //        {
        //             = new Client();
                   

                   
        //        }

        //        return View();
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}

    }
}