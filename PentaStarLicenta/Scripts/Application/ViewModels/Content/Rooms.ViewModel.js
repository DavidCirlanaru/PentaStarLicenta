define('rooms.viewModel',
    ['viewHandler', 'rooms.dataservice', 'roomtypes.dataservice'],
    function (viewHandler, roomsDataService, roomTypesDataService) {
        'use strict';

        var isViewVisible = viewHandler.views.content.rooms;


        var validateNow = ko.observable(false);

        //For adding Rooms
        var rooms = ko.observableArray([]).extend({ paged: { pageSize: 10 } });
        var newRoomName = ko.observable().extend({
            required: {
                params: true,
                message: "Adauga numele camerei"
            },
            minLength: { params: 3, message: "Introduceti minim 3 caractere" }
        });

        var newRoomFloorName = ko.observable('').extend({
            required: {
                params: true,
                message: "Adauga etajul"
            }
        });

        var errors = ko.validation.group([newRoomName, newRoomFloorName, editedRoomName, editedRoomFloor]);
        errors.showAllMessages();
        

        //For dropdown with Room Types
        var availableRoomTypes = ko.observableArray([]);
        var selectedRoomType = ko.observable();

        //For editing rooms
        var editedRoomId = ko.observable('');
        var editedRoomName = ko.observable('').extend({
            minLength: { params: 3, message: "Introduceti minim 3 caractere" },
            required: {
                params: true,
                message: "Adauga un nume de camera"
            }
        });

        var editedRoomFloor = ko.observable('').extend({
            required: {
                params: true,
                message: "Adauga etajul"
            }
        });

        var editedRoomTypeId = ko.observable('');

        function clearInputs() {
            newRoomName('');
            newRoomFloorName('');
        }

        function loadRooms(data) {
            rooms(data);
        }

        function addNewRoom() {
            validateNow(true);
                roomsDataService.addRoom({
                    Name: newRoomName(),
                    Floor: newRoomFloorName(),
                    RoomTypeId: selectedRoomType().RoomTypeId

                },
                    refreshRooms
                );
        }

        //Edit
        function editRoom(id) {
            var editedRoom = ko.utils.arrayFirst(rooms(), function (item) {
                return item.RoomId == id;
            });

            editedRoomId(editedRoom.RoomId);
            editedRoomName(editedRoom.Name);
            editedRoomFloor(editedRoom.Floor);
            editedRoomTypeId(editedRoom.RoomTypeId);

        }

        function addEditedRoom() {
            roomsDataService.editRoom(editedRoomId(), {
                Name: editedRoomName(),
                Floor: editedRoomFloor(),
                RoomTypeId: editedRoomTypeId(),
                RoomId: editedRoomId()
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

        //Delete
        function removeExistingRoom() {
            roomsDataService.removeRoom(this.RoomId, refreshRooms);

        }

        function loadRoomTypes(data) {
            availableRoomTypes(data);
        }

        function refreshRooms() {
            roomsDataService.getAllRooms().done(loadRooms).fail(function () { console.log('Failed!') });
        }

        isViewVisible.subscribe(function (newValue) {
            if (newValue) {
                var loadRoomTypesPromise = roomTypesDataService.getAllRoomTypes().done(function (data) { loadRoomTypes(data) });
                $.when(loadRoomTypesPromise).done(function () {
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
            getRoomTypeName: getRoomTypeName,
            editRoom: editRoom,
            editedRoomName: editedRoomName,
            editedRoomFloor: editedRoomFloor,
            editedRoomTypeId: editedRoomTypeId,
            addEditedRoom: addEditedRoom,
            clearInputs: clearInputs
        };
    });