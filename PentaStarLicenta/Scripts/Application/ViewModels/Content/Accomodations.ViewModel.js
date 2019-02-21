define('accomodations.viewModel',
    ['viewHandler', 'accomodations.dataservice', 'clients.dataservice', 'employees.dataservice', 'rooms.dataservice'],
    function (viewHandler, accomodationsDataService, clientsDataService, employeesDataService, roomsDataService) {
        'use strict';

        var isViewVisible = viewHandler.views.content.accomodations;

        //For adding Accomodations
        var accomodations = ko.observableArray([]);
        var newOccupationDate = ko.observable();
        var newReleaseDate = ko.observable();


        //For editing Accomodations
        var editedAccomodationId = ko.observable('');
        var editedAccomodationOccupationDate = ko.observable('');
        var editedAccomodationReleaseDate = ko.observable('');

        //Dropdowns
        // -------
        //Clients
        var availableClients = ko.observableArray([]);
        var selectedClients = ko.observable();

        //RoomTypes Dropdown
        function getClientName(id) {
            // *arrayFirst() searches through the rooms array looking for a match on the id. 
            //Returns that object as a match.
            var match = ko.utils.arrayFirst(availableClients(), function (item) {
                return item.ClientId == id;
            });

            //Returns the object as a match
            // Else returns an empty string.
            return match ? match.Type : '';
        }

        function loadAccomodations(data) {
            accomodations(data);
        }

        function addNewAccomodation() {
            accomodationsDataService.addAccomodation({
                OccupationDate: newOccupationDate(),
                ReleaseDate: newReleaseDate(),
                ClientId: 1,
                UserId: '090476cb-1c90-401f-ad0f-34b42b23b2dc',
                RoomId: 2

            },
                refreshAccomodations
            );
        }

        function editAccomodation(id) {
            var editedAccomodation = ko.utils.arrayFirst(accomodations(), function (item) {
                return item.AccomodationId == id;
            });

            editedAccomodationId(editedAccomodation.AccomodationId);
            editedAccomodationReleaseDate(editedAccomodation.ReleaseDate);
            editedAccomodationOccupationDate(editedAccomodation.OccupationDate);
        }

        function addEditedAccomodation() {
            accomodationsDataService.editAccomodation(editedAccomodationId(), {
                OccupationDate: editedAccomodationOccupationDate(),
                ReleaseDate: editedAccomodationReleaseDate(),
                AccomodationId: editedAccomodationId()
            },
                refreshAccomodations
            );
        }

        function removeExistingAccomodation() {
            accomodationsDataService.removeAccomodation(this.AccomodationId, refreshAccomodations);
        }

        function refreshAccomodations() {
            accomodationsDataService.getAllAccomodations(loadAccomodations);
        }

        isViewVisible.subscribe(function (newValue) {
            if (newValue) {
                refreshAccomodations();
            }
        });

        //Calendar
        


        return {
            isViewVisible: isViewVisible,
            //Get
            accomodations: accomodations,
            //Add
            addNewAccomodation: addNewAccomodation,
            newOccupationDate: newOccupationDate,
            newReleaseDate: newReleaseDate,
            removeExistingAccomodation: removeExistingAccomodation,
            //Edit
            editAccomodation: editAccomodation,
            addEditedAccomodation: addEditedAccomodation,
            editedAccomodationId: editedAccomodationId,
            editedAccomodationOccupationDate: editedAccomodationOccupationDate,
            editedAccomodationReleaseDate: editedAccomodationReleaseDate,
            //Dropdowns
            availableClients: availableClients,
            selectedClients: selectedClients,
            getClientName: getClientName



        };
    });
