define('home.viewModel',
    ['viewHandler', 'home.dataservice'],
    function (viewHandler, homeDataService) {
        'use strict';

        var firstName = ko.observable('');

        return {
            firstName: firstName
        };
    });