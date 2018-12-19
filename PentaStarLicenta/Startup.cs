using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Owin;
using PentaStarLicenta.DAL.Context;
using PentaStarLicenta.DAL.Models;
using PentaStarLicenta.Models;
using PentaStarLicenta.ViewModels;

namespace PentaStarLicenta
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            CreateRolesAndUsers();
            ViewModelMapper.InitializeMapper();
        }

        private void CreateRolesAndUsers()
        {
            PentaStarContext context = new PentaStarContext();

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            var UserManager = new UserManager<User>(new UserStore<User>(context));

            // Creating first Admin Role and creating a default Admin User
            if (!roleManager.RoleExists("Admin"))
            {

                // Create Admin role
                var role = new IdentityRole();
                role.Name = "Admin";
                roleManager.Create(role);

                //Create a Admin super user who will maintain the website                        
                var user = new User();
                user.UserName = "admin@gmail.com";
                user.Email = "admin@gmail.com";

                string userPWD = "Admin123#";
                var chkUser = UserManager.Create(user, userPWD);

                //Add default User to Role Admin
                if (chkUser.Succeeded)
                {
                    var result1 = UserManager.AddToRole(user.Id, "Admin");
                }
            }

            // Creating Manager role
            if (!roleManager.RoleExists("Receptionist"))
            {

                var role = new IdentityRole();
                role.Name = "Receptionist";
                roleManager.Create(role);
            }

            // creating Employee role
            //if (!roleManager.RoleExists("Employee"))
            //{
            //    var role = new Microsoft.AspNet.Identity.EntityFramework.IdentityRole();
            //    role.Name = "Employee";
            //    roleManager.Create(role);
            //}
        }
    }
}
