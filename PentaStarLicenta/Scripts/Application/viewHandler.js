define("viewHandler", [], function () {
    'use strict';

    var views = {
        content: {
            general: ko.observable(false),
            rooms: ko.observable(false),
            statistics: ko.observable(false),
            roomTypes: ko.observable(false),
            employees: ko.observable(false),
            jobTypes: ko.observable(false),
            accomodations: ko.observable(false),
            clients: ko.observable(false),
            //home: ko.observable(true)
        }
    };

    function showContentView(view) {

        $("#content-wrapper").removeClass("content-loading");
        for (var element in views.content) {
            views.content[element](false);
        }
        views.content[view](true);
    }

    return {
        views: views,
        showContentView: showContentView
    };
});