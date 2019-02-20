define('routing', ['viewHandler'], function (viewHandler) {
    'use strict';


    function initializeRouter() {
        var app = Sammy('body', function () {
            this.get('#/general',
                function () {
                    viewHandler.showContentView('general');
                });

            this.get('#/rooms',
                function () {
                    viewHandler.showContentView('rooms');
                });

            this.get('#/statistics',
                function () {
                    viewHandler.showContentView('statistics');
                });

            this.get('#/roomTypes',
                function () {
                    viewHandler.showContentView('roomTypes');
                });

            this.get('#/employees',
                function () {
                    viewHandler.showContentView('employees');
                });

            this.get('#/jobTypes',
                function () {
                    viewHandler.showContentView('jobTypes');
                });

            this.get('#/accomodations',
                function () {
                    viewHandler.showContentView('accomodations');
                });

            this.get('#/clients',
                function () {
                    viewHandler.showContentView('clients');
                });

            this.get('',
                function () {
                    viewHandler.showContentView('general');
                });


        });

        jQuery(function () { app.run(); });
    }

    return {
        initializeRouter: initializeRouter
    };
});