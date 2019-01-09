define('rooms.viewModel',
    ['viewHandler', 'rooms.dataservice', 'roomtypes.dataservice'],
    function (viewHandler, roomsDataService, roomTypesDataService) {
        'use strict';

        var isViewVisible = viewHandler.views.content.rooms;

        //For adding Rooms
        var rooms = ko.observableArray([]);
        var newRoomName = ko.observable('');
        var newRoomFloorName = ko.observable('');

        //For dropdown with Room Types
        var availableRoomTypes = ko.observableArray([]);
        var selectedRoomType = ko.observable();


        function loadRooms(data) {
            rooms(data);
        }

        function addNewRoom() {
            roomsDataService.addRoom({
                Name: newRoomName(),
                Floor: newRoomFloorName(),
                OccupationDate: '1-1-2001',
                ReleaseDate: '1-1-2002',
                RoomTypeId: selectedRoomType().RoomTypeId

            },
                refreshRooms
            );
        }

        //RoomTypes Dropdown
        function getRoomTypeName(id) {
            // *arrayFirst() searches through the roomTypes array looking for a match on the id. 
            //Returns that object as a match.
            var match = ko.utils.arrayFirst(availableRoomTypes(), function (item) {
                return item.RoomTypeId == id;
            });

            //Returns the object as a match
            // Else returns an empty string.
            return match ? match.Type : '';
        }
              
        function removeExistingRoom() {
            roomsDataService.removeRoom(this.RoomId, refreshRooms);

        }

        function loadRoomTypes(data) {
            availableRoomTypes(data);
        }

        function refreshRooms() {
            roomsDataService.getAllRooms(loadRooms);            
        }

        isViewVisible.subscribe(function (newValue) {
            if (newValue) {
                refreshRooms();
                roomTypesDataService.getAllRoomTypes(function (data) {
                    loadRoomTypes(data);
                    refreshRooms();

                });
            }
        });
        
        return {
            isViewVisible: isViewVisible,
            rooms: rooms,
            addNewRoom: addNewRoom,
            newRoomName: newRoomName,
            newRoomFloorName: newRoomFloorName,
            availableRoomTypes: availableRoomTypes,
            selectedRoomType: selectedRoomType,
            removeExistingRoom: removeExistingRoom,
            getRoomTypeName: getRoomTypeName
            
        };
    });