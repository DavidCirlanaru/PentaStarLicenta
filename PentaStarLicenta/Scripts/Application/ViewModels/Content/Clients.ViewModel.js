define('clients.viewModel',
    ['viewHandler', 'clients.dataservice', 'accomodations.dataservice'],
    function (viewHandler, clientsDataService) {
        'use strict';

        var isViewVisible = viewHandler.views.content.clients;

        var clients = ko.observableArray([]);

        function loadClients(data) {
            clients(data);
        }












        function refreshClients() {
            clientsDataService.getAllClients(loadClients);
        }

        isViewVisible.subscribe(function (newValue) {
            if (newValue) {
                refreshClients();
            }
        });

        return {
            isViewVisible: isViewVisible,
            loadClients: loadClients
       
        };
    });
