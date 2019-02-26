require.config({
    paths: {
        "jquery": "https://code.jquery.com/jquery-2.2.4.min",
        "moment": "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.14.1/moment",
        "chartjs": "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.1.6/Chart"
    },
    shim: {
        jquery: {
            exports: "$"
        },
        chartjs: {
            deps: ["moment"]
        }
    }
});