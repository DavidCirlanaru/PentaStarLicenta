﻿define('rooms.dataservice', [], function () {
    'use strict';

    function getAllRooms(continuation) {
        $.get('/api/RoomsApi', continuation);
    }

    function addRoom(newRoom, continuation) {
        $.post('/api/RoomsApi', newRoom, continuation);
    }

    return {
        getAllRooms: getAllRooms,
        addRoom: addRoom
    }
});