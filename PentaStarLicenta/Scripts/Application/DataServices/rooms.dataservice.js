define('rooms.dataservice', [], function () {
    'use strict';

    //Add/Show rooms
    function getAllRooms(continuation) {
        $.get('/api/RoomsApi', continuation);
    }

    function addRoom(newRoom, continuation) {
        $.post('/api/RoomsApi', newRoom, continuation);
    }

    function removeRoom(RoomId, continuation) {
        $.ajax({
            url: '/api/RoomsApi/' + RoomId,
            type: 'DELETE',
            success: continuation
        });  
    }
    

    return {
        getAllRooms: getAllRooms,
        addRoom: addRoom,
        removeRoom: removeRoom
    };
});