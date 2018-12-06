define('rooms.viewModel',
    ['viewHandler', 'rooms.dataservice'],
    function (viewHandler, roomsDataService) {
        'use strict';
        var isViewVisible = viewHandler.views.content.rooms;

        var rooms = ko.observableArray([]);
        var newRoomName = ko.observable('');
        var newRoomFloorName = ko.observable('');

        function loadRooms(data) {
            rooms(data);
        }

        function addNewRoom() {
            roomsDataService.addRoom({
                Name: newRoomName(),
                Floor: newRoomFloorName(),
                OccupationDate: '1-1-2001',
                ReleaseDate: '1-1-2002',
                RoomTypeId: 35
            },
                refreshRooms
            );
        }

        function refreshRooms() {
            roomsDataService.getAllRooms(loadRooms);
        }

        isViewVisible.subscribe(function (newValue) {
            if (newValue) {
                refreshRooms();
            }
        });

        return {
            isViewVisible: isViewVisible,
            rooms: rooms,
            addNewRoom: addNewRoom,
            newRoomName: newRoomName,
            newRoomFloorName: newRoomFloorName
        };
    });