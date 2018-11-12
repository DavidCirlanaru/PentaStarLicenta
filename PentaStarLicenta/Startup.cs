using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PentaStarLicenta.Startup))]
namespace PentaStarLicenta
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
