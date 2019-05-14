define('binder',
    function () {
        'use strict';

        function applyBinding(viewModelName, elementId) {
            require([viewModelName], function (viewModel) {
                ko.applyBindings(viewModel, document.getElementById(elementId));
            });
        }

        function bind() {
            applyBinding("general.viewModel", "general");
            applyBinding("rooms.viewModel", "rooms");
            applyBinding("roomTypes.viewModel", "roomTypes");
            applyBinding("employees.viewModel", "employees");
            applyBinding("jobTypes.viewModel", "jobTypes");
            applyBinding("accomodations.viewModel", "accomodations");
            applyBinding("clients.viewModel", "clients");
            applyBinding("header.viewModel", "header");
        };
        return {
            bind: bind
        };       

    }
);
