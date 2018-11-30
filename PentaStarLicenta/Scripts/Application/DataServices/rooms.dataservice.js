define('rooms.dataservice', [], function () {
    'use strict';
    //Add/Show rooms
    function getAllRooms(continuation) {
        $.get('/api/RoomsApi', continuation);
    }

    function addRoom(newRoom, continuation) {
        $.post('/api/RoomsApi', newRoom, continuation);
    }

    //Add/Show room types
    function getAllRoomTypes(continuation) {
        $.get('/api/RoomTypesApi', continuation);
    }

    function addRoomTypes(newRoomType, continuation) {
        $.post('/api/RoomTypesApi', newRoomType, continuation);
    }

    

    return {
        getAllRooms: getAllRooms,
        addRoom: addRoom,
        getAllRoomTypes: getAllRoomTypes,
        addRoomTypes: addRoomTypes
    }
});