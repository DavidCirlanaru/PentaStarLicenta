using Microsoft.AspNet.Identity.Owin;
using PentaStarLicenta.DAL.Context;
using PentaStarLicenta.DAL.Models;
using PentaStarLicenta.ViewModels;
using PentaStarLicenta.ViewModels.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

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
            List<User> users = db.Users.ToList();

            List<UserViewModel> viewModels = new List<UserViewModel>();
            foreach (User u in users)
            {
                UserViewModel vm = ViewModelMapper.ToViewModelUsers(u);
                viewModels.Add(vm);
            }

            return viewModels;
          //  return db.Users.ToList().Select(x => ViewModelMapper.ToViewModelUsers(x)).ToList();
        }

        [ResponseType(typeof(UserViewModel))]
        public IHttpActionResult PostUser(UserViewModel userViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            User user = new User { UserName = userViewModel.UserName, Email = userViewModel.Email, FirstName = userViewModel.FirstName, LastName = userViewModel.LastName };
            //User user = ViewModelMapper.ToModelUsers(userViewModel);

            var result = UserManager.CreateAsync(user).Result;

            return CreatedAtRoute("DefaultApi", new { id = user.Id }, ViewModelMapper.ToViewModelUsers(user));
        }

    }
}