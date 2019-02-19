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
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                    "~/Scripts/Vendors/jquery-{version}.js",
                    "~/Scripts/Vendors/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/Vendors/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/Application").IncludeDirectory(
                       "~/Scripts/Application", "*.js", true));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/Vendors/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/Vendors/umd/popper.js",
                "~/Scripts/Vendors/bootstrap.js"));


            bundles.Add(new ScriptBundle("~/bundles/sammy").Include(
                "~/Scripts/Vendors/sammy-0.7.5.js"));
        }

        private static void RegisterStyleBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/css").Include(
                     "~/Content/bootstrap.css",
                     "~/Content/site.css",
                     "~/Content/jquery-ui.min.css",
                     "~/Content/jqeury-ui.structure.min.css",
                     "~/Content/jquery-ui.theme.min.css"));

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
