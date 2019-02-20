define('accomodations.viewModel',
    ['viewHandler', 'accomodations.dataservice'],
    function (viewHandler, accomodationsDataService) {
        'use strict';

        var isViewVisible = viewHandler.views.content.accomodations;

        //For adding Accomodations
        var accomodations = ko.observableArray([]);
        var newOccupationDate = ko.observable();
        var newReleaseDate = ko.observable();


        var editedAccomodationId = ko.observable('');
        var editedAccomodationOccupationDate = ko.observable('');
        var editedAccomodationReleaseDate = ko.observable('');

        //To do:
        // Add the dropdowns for CLients, Users, Rooms. Then the edit for the accomodations.

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
            accomodations: accomodations,
            addNewAccomodation: addNewAccomodation,
            newOccupationDate: newOccupationDate,
            newReleaseDate: newReleaseDate,
            removeExistingAccomodation: removeExistingAccomodation,
            editAccomodation: editAccomodation,
            addEditedAccomodation: addEditedAccomodation,
            editedAccomodationId: editedAccomodationId,
            editedAccomodationOccupationDate: editedAccomodationOccupationDate,
            editedAccomodationReleaseDate: editedAccomodationReleaseDate



        };
    });
