define('roomtypes.dataservice', [], function () {
    'use strict';

    //Add/Show room types
    function getAllRoomTypes(continuation) {
        $.get('/api/RoomTypesApi', continuation);
    }

    function addRoomType(newRoomType, continuation) {
        $.post('/api/RoomTypesApi', newRoomType, continuation);
    }


    return {
        getAllRoomTypes: getAllRoomTypes,
        addRoomType: addRoomType
    };
});