using Microsoft.AspNet.Identity.Owin;
using PentaStarLicenta.DAL.Context;
using PentaStarLicenta.ViewModels;
using PentaStarLicenta.ViewModels.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace PentaStarLicenta.ApiControllers
{
    public class UsersApiController : ApiController
    {
        private PentaStarContext db = new PentaStarContext();

        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.Current.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        public List<UserViewModel> GetUsers()
        {
            return db.Users.ToList().Select(x => ViewModelMapper.ToViewModelUsers(x)).ToList();
        }

    }
}