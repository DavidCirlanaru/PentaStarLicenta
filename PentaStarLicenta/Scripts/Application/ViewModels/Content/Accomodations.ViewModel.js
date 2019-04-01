define('accomodations.viewModel',
    ['viewHandler', 'accomodations.dataservice', 'clients.dataservice', 'employees.dataservice', 'rooms.dataservice'],
    function (viewHandler, accomodationsDataService, clientsDataService, employeesDataService, roomsDataService) {
        'use strict';

        var isViewVisible = viewHandler.views.content.accomodations;

        //For adding Accomodations
        var accomodations = ko.observableArray([]);
        var currentDate = moment().format('MM-DD-YYYY');
        var newOccupationDate = ko.observable().extend({
            required: {
                message: "Adauga data sosirii"
            },
            min: { params: currentDate, message: "Data sosirii nu poate fi inaintea datei curente" },
        });
        var newReleaseDate = ko.observable().extend({
            required: {  
                message: "Adauga data plecarii"
            },
            min: { params: newOccupationDate, message: "Data sosirii nu poate fi inaintea datei curente" }
        });

        //For editing Accomodations
        var editedAccomodationId = ko.observable('');
        var editedAccomodationOccupationDate = ko.observable('').extend({
            required: {
                message: "Adauga data sosirii"
            },
           // min: { params: currentDate, message: "Data sosirii nu poate fi inaintea datei curente" },
        });

        var editedAccomodationReleaseDate = ko.observable('').extend({
            required: {
                message: "Adauga data plecarii"
            },
            min: { params: editedAccomodationOccupationDate, message: "Data sosirii nu poate fi inaintea datei curente" }
        });


        var editedClientId = ko.observable('');
        var editedEmployeeId = ko.observable('');
        var editedRoomId = ko.observable('');

        var errors = ko.validation.group([newOccupationDate, newReleaseDate, editedAccomodationOccupationDate, editedAccomodationReleaseDate]);
        errors.showAllMessages();

        function clearInputs() {
            newOccupationDate('');
            newReleaseDate('');
        }

        //Dropdowns
        //--Clients
        var availableClients = ko.observableArray([]);
        var selectedClients = ko.observable();

        function getClientFirstName(id) {
            // *arrayFirst() searches through the rooms array looking for a match on the id. 
            //Returns that object as a match.
            var matchClient = ko.utils.arrayFirst(availableClients(), function (item) {
                return item.ClientId == id;
            });

            //Returns the object as a match
            // Else returns an empty string.
            return matchClient ? matchClient.FirstName + ' ' + matchClient.LastName : '';
        }

        function loadClients(data) {
            availableClients(data);
        }

        //--Employees
        var availableEmployees = ko.observableArray([]);
        var selectedEmployees = ko.observable();

        function getEmployeeFirstName(id) {
            var matchEmployee = ko.utils.arrayFirst(availableEmployees(), function (item) {
                return item.Id == id;
            });
            return matchEmployee ? matchEmployee.FirstName + ' ' + matchEmployee.LastName : '';
        }

        function loadEmployees(data) {
            availableEmployees(data);
        }

        //--Rooms
        var availableRooms = ko.observableArray([]);
        var selectedRooms = ko.observable();

        function getRoomName(id) {
            var matchRoom = ko.utils.arrayFirst(availableRooms(), function (item) {
                return item.RoomId == id;
            });
            return matchRoom ? matchRoom.Name : '';
        }

        function loadRooms(data) {
            availableRooms(data);
        }
        // /Dropdowns
        

        //Load Accomodations
        function loadAccomodations(data) {
            accomodations(data);
        }

        function addNewAccomodation() {
            accomodationsDataService.isRoomOccupied(
                selectedRooms().RoomId,
                newOccupationDate(),
                newReleaseDate()).done(function (result) {
                    if (result == false) {
                        // room is empty
                        accomodationsDataService.addAccomodation({
                            OccupationDate: newOccupationDate(),
                            ReleaseDate: newReleaseDate(),
                            ClientId: selectedClients().ClientId,
                            UserId: selectedEmployees().Id,
                            RoomId: selectedRooms().RoomId

                        },
                            refreshAccomodations
                        );
                    } else {
                        // room is occupied
                        alert('camera nu e libera');
                        refreshAccomodations
                    }
                });
        }

        function editAccomodation(id) {
            var editedAccomodation = ko.utils.arrayFirst(accomodations(), function (item) {
                return item.AccomodationId == id;
            });

            editedAccomodationId(editedAccomodation.AccomodationId);
            editedAccomodationReleaseDate(moment(editedAccomodation.ReleaseDate).format('D-MM-YYYY'));
            editedAccomodationOccupationDate(moment(editedAccomodation.OccupationDate).format('D-MM-YYYY'));
            editedClientId(editedAccomodation.ClientId);
            editedEmployeeId(editedAccomodation.UserId);
            editedRoomId(editedAccomodation.RoomId);
        }

        function addEditedAccomodation() {
            accomodationsDataService.editAccomodation(editedAccomodationId(), {
                AccomodationId: editedAccomodationId(),
                OccupationDate: editedAccomodationOccupationDate(),
                ReleaseDate: editedAccomodationReleaseDate(),
                ClientId: editedClientId(),
                UserId: editedEmployeeId(),
                RoomId: editedRoomId()

            },
                refreshAccomodations
            );
        }

        function removeExistingAccomodation() {
            accomodationsDataService.removeAccomodation(this.AccomodationId, refreshAccomodations);
        }

        function refreshAccomodations() {
            accomodationsDataService.getAllAccomodations().done(loadAccomodations).fail(function () { console.log('Failed!') });
        }

        isViewVisible.subscribe(function (newValue) {
            if (newValue) {
                var loadAccomodationsPromise = accomodationsDataService.getAllAccomodations().done(function (data) { loadAccomodations(data) });
                var loadClientsPromise = clientsDataService.getAllClients().done(function (data) { loadClients(data) });
                var loadEmployeesPromise = employeesDataService.getAllEmployees().done(function (data) { loadEmployees(data) });
                var loadRoomPromise = roomsDataService.getAllRooms().done(function (data) { loadRooms(data) });

                $.when(loadAccomodationsPromise, loadClientsPromise, loadEmployeesPromise, loadRoomPromise).done(function () {
                    refreshAccomodations();
                });
            }
        });

        return {
            isViewVisible: isViewVisible,

            //Get
            accomodations: accomodations,

            //Add
            addNewAccomodation: addNewAccomodation,
            newOccupationDate: newOccupationDate,
            newReleaseDate: newReleaseDate,

            //Remove
            removeExistingAccomodation: removeExistingAccomodation,

            //Edit
            editAccomodation: editAccomodation,
            addEditedAccomodation: addEditedAccomodation,
            editedAccomodationId: editedAccomodationId,
            editedAccomodationOccupationDate: editedAccomodationOccupationDate,
            editedAccomodationReleaseDate: editedAccomodationReleaseDate,
            editedClientId: editedClientId,
            editedEmployeeId: editedEmployeeId,
            editedRoomId: editedRoomId,

            //Dropdowns
            //--Clients
            availableClients: availableClients,
            selectedClients: selectedClients,
            getClientFirstName: getClientFirstName,

            //--Employees
            availableEmployees: availableEmployees,
            selectedEmployees: selectedEmployees,
            getEmployeeFirstName: getEmployeeFirstName,

            //--Rooms
            availableRooms: availableRooms,
            selectedRooms: selectedRooms,
            getRoomName: getRoomName,
            // /Drodowns
            clearInputs: clearInputs

        };
    });
