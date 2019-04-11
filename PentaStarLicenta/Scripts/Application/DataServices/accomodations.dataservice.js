define('accomodations.dataservice', [], function () {
    'use strict';

    //Add/Show employees
    function getAllAccomodations() {
        return $.get('/api/AccomodationsApi');
    }

    function isRoomOccupied(roomId, occupationDate, releaseDate) {
        return $.get('/api/AccomodationsApi/isRoomOccupied/', { roomId: roomId, occupationDate: occupationDate, releaseDate: releaseDate });
    }

    function addAccomodation(newAccomodation) {
        return $.post('/api/AccomodationsApi', newAccomodation);
    }

    function getClientArray() {
        return $.get('/api/AccomodationsApi/getClientsArray');
    }


    function removeAccomodation(AccomodationId, continuation) {
        $.ajax({
            url: '/api/AccomodationsApi/' + AccomodationId,
            type: 'DELETE',
            success: continuation
        });
    }
        
    function editAccomodation(AccomodationId, editedAccomodation, continuation) {
        $.ajax({
            url: 'api/AccomodationsApi/' + AccomodationId,
            type: 'PUT',
            data: editedAccomodation,
            success: continuation
        });
    }

    return {
        getAllAccomodations: getAllAccomodations,
        addAccomodation: addAccomodation,
        removeAccomodation: removeAccomodation,
        editAccomodation: editAccomodation,
        isRoomOccupied: isRoomOccupied,
        getClientArray: getClientArray
    };
});