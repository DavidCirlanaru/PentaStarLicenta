using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PentaStarLicenta.Controllers
{
    [AllowAnonymous]
    public class AcasaController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

    }
}