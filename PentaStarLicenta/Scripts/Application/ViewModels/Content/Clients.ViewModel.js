define('clients.viewModel',
    ['viewHandler', 'clients.dataservice', 'accomodations.dataservice'],
    function (viewHandler, clientsDataService) {
        'use strict';

        var isViewVisible = viewHandler.views.content.clients;
        //Add
        var clients = ko.observableArray([]);
        var newClientFirstName = ko.observable('');
        var newClientLastName = ko.observable('');
        var newClientCnp = ko.observable('');
        var newClientIdentityCard = ko.observable('');
        var newClientEmail = ko.observable('');
        var newClientPhone = ko.observable('');
        var newClientNationality = ko.observable('');

        //Edit
        var editedClientId = ko.observable('');
        var editedClientFirstName = ko.observable('');
        var editedClientLastName = ko.observable('');
        var editedClientCnp = ko.observable('');
        var editedClientIdentityCard = ko.observable('');
        var editedClientEmail = ko.observable('');
        var editedClientPhone = ko.observable('');
        var editedClientNationality = ko.observable('');

        function loadClients(data) {
            clients(data);
        }

        function addNewClient() {
            clientsDataService.addClient({
                FirstName: newClientFirstName(),
                LastName: newClientLastName(),
                Cnp: newClientCnp(),
                IdentityCard: newClientIdentityCard(),
                Email: newClientEmail(),
                Phone: newClientPhone(),
                Nationality: newClientNationality(),
                AccomodationId: 1
            },
                refreshClients
            );
        }

        function editClient(id) {
            var editedClient = ko.utils.arrayFirst(clients(), function (item) {
                return item.ClientId == id;
            });

            editedClientId(editedClient.ClientId);
            editedClientFirstName(editedClient.FirstName);
            editedClientLastName(editedClient.LastName);
            editedClientCnp(editedClient.Cnp);
            editedClientIdentityCard(editedClient.IdentityCard);
            editedClientEmail(editedClient.Email);
            editedClientPhone(editedClient.Phone);
            editedClientNationality(editedClient.Nationality);
        }

        function addEditedClient() {
            clientsDataService.editClient(editedClientId(), {
                Type: editedClientName(),
                ClientId: editedClientId()
            },
                refreshClients
            );
        }

        function removeExistingClient() {
            clientsDataService.removeClient(this.ClientId, refreshClients);
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
            clients: clients,
            newClientFirstName: newClientFirstName,
            newClientLastName: newClientLastName,
            newClientCnp: newClientCnp,
            newClientIdentityCard: newClientIdentityCard,
            newClientEmail: newClientEmail,
            newClientPhone: newClientPhone,
            newClientNationality: newClientNationality,
            addNewClient: addNewClient,
            editClient: editClient, 
            addEditedClient: addEditedClient,
            removeExistingClient: removeExistingClient,
            editedClientId: editedClientId,
            editedClientFirstName: editedClientFirstName,
            editedClientLastName: editedClientLastName,
            editedClientCnp: editedClientCnp,
            editedClientIdentityCard: editedClientIdentityCard,
            editedClientEmail: editedClientEmail,
            editedClientPhone: editedClientPhone,
            editedClientNationality: editedClientNationality
        };
    });
