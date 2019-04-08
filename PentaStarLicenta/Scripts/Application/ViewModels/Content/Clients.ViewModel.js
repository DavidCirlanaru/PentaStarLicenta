define('clients.viewModel',
    ['viewHandler', 'clients.dataservice', 'accomodations.dataservice'],
    function (viewHandler, clientsDataService) {
        'use strict';

        var isViewVisible = viewHandler.views.content.clients;
        //Add
        var clients = ko.observableArray([]).extend({ paged: { pageSize: 10 } });
        var newClientFirstName = ko.observable('').extend({
            minLength: { params: 3, message: "Prenumele trebuie sa contina minim 3 caractere" },
            maxLength: { params: 20, message: "Prenumele nu poate contine mai mult de 20 caractere" },
            required: {
                message: "Adauga prenume"
            }
        });
        var newClientLastName = ko.observable('').extend({
            minLength: { params: 3, message: "Numele trebuie sa contina minim 3 caractere" },
            maxLength: { params: 20, message: "Numele nu poate contine mai mult de 20 caractere" },
            required: {
                message: "Adauga nume"
            }
        });
        var newClientCnp = ko.observable('').extend({
            number: { params: true, message: "CNP-ul este format doar din numere"},
            minLength: { params: 13, message: "CNP-ul trebuie sa contina 13 caractere numerice" },
            maxLength: { params: 13 , message: "CNP-ul trebuie sa contina 13 caractere numerice" },
            required: {
                message: "Adauga CNP"
            }
        });
        var newClientIdentityCard = ko.observable('').extend({
            pattern: { params: /^[a-zA-Z]{2}\s+[0-9]{6}$/ , message: 'Seria & Nr trebuie sa fie de forma "AA 123456" '},
            required: {
                message: "Adauga Serie & Nr"
            }
        });
        var newClientEmail = ko.observable('').extend({
            pattern: { params: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Email-ul nu este valid" ' },
            required: {
                message: "Adauga mail"
            }
        });
        
        var newClientPhone = ko.observable('').extend({
            pattern: { params: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, message: 'Numarul de telefon nu este valid" ' },
            required: {
                message: "Adauga numar de telefon"
            }
        });
        var newClientNationality = ko.observable('').extend({
            minLength: { params: 3, message: "Tara trebuie sa contina minim 3 caractere" },
            maxLength: { params: 20, message: "Tara nu poate contine mai mult de 20 caractere" },
            required: {
                message: "Adauga tara"
            }
        });

        var errors = ko.validation.group([newClientFirstName, newClientLastName, newClientCnp, newClientIdentityCard, newClientEmail, newClientPhone, newClientNationality,
            editedClientFirstName, editedClientLastName, editedClientCnp, editedClientIdentityCard, editedClientEmail, editedClientPhone, editedClientNationality]);
        errors.showAllMessages();

        function clearInputs() {
            newClientFirstName('');
            newClientLastName('');
            newClientCnp('');
            newClientIdentityCard('');
            newClientEmail('');
            newClientPhone('');
            newClientNationality('');
        }

        //Edit
        var editedClientId = ko.observable('');
        var editedClientFirstName = ko.observable('').extend({
            minLength: { params: 3, message: "Prenumele trebuie sa contina minim 3 caractere" },
            maxLength: { params: 20, message: "Prenumele nu poate contine mai mult de 20 caractere" },
            required: {
                message: "Adauga prenume"
            }
        });
        var editedClientLastName = ko.observable('').extend({
            minLength: { params: 3, message: "Numele trebuie sa contina minim 3 caractere" },
            maxLength: { params: 20, message: "Numele nu poate contine mai mult de 20 caractere" },
            required: {
                message: "Adauga nume"
            }
        });
        var editedClientCnp = ko.observable('').extend({
            number: { params: true, message: "CNP-ul este format doar din numere" },
            minLength: { params: 13, message: "CNP-ul trebuie sa contina 13 caractere numerice" },
            maxLength: { params: 13, message: "CNP-ul trebuie sa contina 13 caractere numerice" },
            required: {
                message: "Adauga CNP"
            }
        });
        var editedClientIdentityCard = ko.observable('').extend({
            pattern: { params: /^[a-zA-Z]{2}\s+[0-9]{6}$/, message: 'Seria & Nr trebuie sa fie de forma "AA 123456" ' },
            required: {
                message: "Adauga Serie & Nr"
            }
        });
        var editedClientEmail = ko.observable('').extend({
            pattern: { params: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Mailul nu este valid (a@a.a)" ' },
            required: {
                message: "Adauga mail"
            }
        });
        var editedClientPhone = ko.observable('').extend({
            pattern: { params: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, message: 'Numarul de telefon nu este valid" ' },
            required: {
                message: "Adauga numar de telefon"
            }
        });
        var editedClientNationality = ko.observable('').extend({
            minLength: { params: 3, message: "Tara trebuie sa contina minim 3 caractere" },
            maxLength: { params: 20, message: "Tara nu poate contine mai mult de 20 caractere" },
            required: {
                message: "Adauga tara"
            }
        });

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
                Nationality: newClientNationality()
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
                ClientId: editedClientId(),
                FirstName: editedClientFirstName(),
                LastName: editedClientLastName(),
                Cnp: editedClientCnp(),
                IdentityCard: editedClientIdentityCard(),
                Email: editedClientEmail(),
                Phone: editedClientPhone(),
                Nationality: editedClientNationality()
                
            },
                refreshClients
            );
        }

        function removeExistingClient() {
            clientsDataService.removeClient(this.ClientId, refreshClients);
        }


        function refreshClients() {
            clientsDataService.getAllClients().done(loadClients).fail(function () { console.log('Failed!') });
        }

        isViewVisible.subscribe(function (newValue) {
            if (newValue) {
                $.when().done(function () {
                    refreshClients();
                });
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
            editedClientNationality: editedClientNationality,
            clearInputs: clearInputs
        };
    });
