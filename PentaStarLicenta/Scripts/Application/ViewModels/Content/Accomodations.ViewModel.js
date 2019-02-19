define('accomodations.viewModel',
    ['viewHandler', 'accomodations.dataservice'],
    function (viewHandler, accomodationsDataService) {
        'use strict';

        var isViewVisible = viewHandler.views.content.accomodations;

        //For adding Accomodations
        var accomodations = ko.observableArray([]);
        var newOccupationDate = ko.observable();
        var newReleaseDate = ko.observable();

        function loadAccomodations(data) {
            accomodations(data);
        }

        function addNewAccomodation() {
            accomodationsDataService.addAccomodation({
                OccupationDate: newOccupationDate(),
                ReleaseDate: newReleaseDate(),
                ClientId: 1,
                UserId: '090476cb-1c90-401f-ad0f-34b42b23b2dc',
                RoomId: 3

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
            removeExistingAccomodation: removeExistingAccomodation

        };
    });
