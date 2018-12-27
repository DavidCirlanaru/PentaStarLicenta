define('binder',
    function () {
        'use strict';

        function applyBinding(viewModelName, elementId) {
            require([viewModelName], function (viewModel) {
                ko.applyBindings(viewModel, document.getElementById(elementId));
            });
        }

        function bind() {
            console.log('binder has initialised');
            applyBinding("menu.viewModel", "menuBackend");
            applyBinding("general.viewModel", "general");
            applyBinding("rooms.viewModel", "rooms");
            applyBinding("roomTypes.viewModel", "roomTypes");
            applyBinding("statistics.viewModel", "statistics");
            applyBinding("employees.viewModel", "employees")
        };
        return {
            bind: bind
        };       

    }
);
