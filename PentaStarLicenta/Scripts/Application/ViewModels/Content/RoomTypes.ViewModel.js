define('roomTypes.viewModel',
    ['viewHandler', 'roomtypes.dataservice'],
    function (viewHandler, roomTypesDataService) {
        'use strict';

        var isViewVisible = viewHandler.views.content.roomTypes;

        //Storing Room Types in an observable array.
        var roomTypes = ko.observableArray([]);
        var newRoomTypeName = ko.observable('');
        var newRoomTypePrice = ko.observable('');

        //Load Rooms
        function loadRoomTypes(data) {
            roomTypes(data);
        }

        //Add Rooms
        function addNewRoomType() {
            roomTypesDataService.addRoomType({
                Type: newRoomTypeName(),
                Price: newRoomTypePrice(),
                RoomId: 1
            },
                refreshRoomTypes
            );
        }       

        //Delete room types
        function removeExistingRoomType() {          
            roomTypesDataService.removeRoomType(this.RoomTypeId, refreshRoomTypes);            
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
            newRoomTypePrice: newRoomTypePrice,
            removeExistingRoomType: removeExistingRoomType
        };
    });