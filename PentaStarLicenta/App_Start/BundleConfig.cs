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
                    "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/Application").IncludeDirectory(
                       "~/Scripts/Application", "*.js", true));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/umd/popper.js",
                "~/Scripts/bootstrap.js"));

        }

        private static void RegisterStyleBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/css").Include(
                     "~/Content/bootstrap.css",
                     "~/Content/site.css"));

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
