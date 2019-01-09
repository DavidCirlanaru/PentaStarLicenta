define("viewHandler", [], function () {
    'use strict';

    var views = {
        content: {
            general: ko.observable(false),
            rooms: ko.observable(false),
            statistics: ko.observable(false),
            roomTypes: ko.observable(false),
            employees: ko.observable(false),
            jobTypes: ko.observable(false)
        }
    };

    function showContentView(view) {
        views.content.general;
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