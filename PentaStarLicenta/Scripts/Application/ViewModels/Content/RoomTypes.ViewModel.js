define('roomTypes.viewModel',
    ['viewHandler', 'rooms.dataservice'],
    function (viewHandler, roomTypesDataService) {
        'use strict';
        var isViewVisible = viewHandler.views.content.rooms;

        var roomTypes = ko.observableArray([]);
        var newRoomTypeName = ko.observable('');
        var newRoomTypePrice = ko.observable('');

        function loadRoomTypes(data) {
            roomTypes(data);
        }

        function addNewRoomType() {
            roomTypesDataService.addRoomType({
                Type: newRoomTypeName(),
                Price: newRoomTypePrice()
            },
                refreshRoomTypes
            );
        }

        function refreshRoomTypes() {
            roomTypesDataService.getAllRoomTypes(loadRoomTypes);
        }

        isViewVisible.subscribe(function (newValue) {
            if (newValue) {
                refreshRoomTypes();
            }
        });

        return {
            isViewVisible: isViewVisible,
            roomTypes: roomTypes,
            addNewRoomType: addNewRoomType,
            newRoomTypeName: newRoomTypeName,           
        };
    });