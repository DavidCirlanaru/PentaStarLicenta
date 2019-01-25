define('roomtypes.dataservice', [], function () {
    'use strict';

    //Get room types
    function getAllRoomTypes(continuation) {
        $.get('/api/RoomTypesApi', continuation);
    }

    //Add room type
    function addRoomType(newRoomType, continuation) {
        $.post('/api/RoomTypesApi', newRoomType, continuation);
    }

    function removeRoomType(RoomTypeId, continuation) {
        $.ajax({
            url: '/api/RoomTypesApi/' + RoomTypeId,
            type: 'DELETE',
            success: continuation
        });
    }

    function editRoomType(RoomTypeId, editedRoomType, continuation) {
        $.ajax({
            url: 'api/RoomTypesApi/' + RoomTypeId,
            type: 'PUT',
            data: editedRoomType,
            success: continuation
        });
    }

    return {
        getAllRoomTypes: getAllRoomTypes,
        addRoomType: addRoomType,
        removeRoomType: removeRoomType,
        editRoomType: editRoomType

    };
});