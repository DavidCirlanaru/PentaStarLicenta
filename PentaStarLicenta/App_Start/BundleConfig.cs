using BundleTransformer.Core.Transformers;
using JavaScriptEngineSwitcher.Core;
using System.Web;
using System.Web.Optimization;
using JavaScriptEngineSwitcher.Msie;

namespace PentaStarLicenta
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            JsEngineSwitcher engineSwitcher = JsEngineSwitcher.Instance;
            engineSwitcher.EngineFactories.AddMsie();

            RegisterScriptBundles(bundles);
            RegisterStyleBundles(bundles);

        }
        private static void RegisterScriptBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/Application").IncludeDirectory(
                       "~/Scripts/Application", "*.js", true));

            bundles.Add(new ScriptBundle("~/bundles/Vendors").IncludeDirectory(
                       "~/Scripts/Vendors", "*.js", true));
        }

        private static void RegisterStyleBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/css").Include(
                     "~/Content/bootstrap.css",
                     "~/Content/site.css",
                     "~/Content/jquery-ui.min.css",
                     "~/Content/jqeury-ui.structure.min.css",
                     "~/Content/jquery-ui.theme.min.css",
                     "~/Styles/Vendors/pikaday.css"));

            var bundle = new StyleBundle("~/bundles/style/application")
                .IncludeDirectory("~/Styles/Application","*.less", true);
            AddStyleBundle(bundles, bundle);
        }

        private static void AddStyleBundle(BundleCollection bundles, Bundle bundle)
        {
            bundle.Transforms.Add(new StyleTransformer());
            bundles.Add(bundle);
        }
    }
}
