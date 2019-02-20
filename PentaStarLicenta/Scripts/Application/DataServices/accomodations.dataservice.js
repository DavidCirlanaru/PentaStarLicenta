define('accomodations.dataservice', [], function () {
    'use strict';

    //Add/Show employees
    function getAllAccomodations(continuation) {
        $.get('/api/AccomodationsApi', continuation);
    }

    function addAccomodation(newAccomodation, continuation) {
        $.post('/api/AccomodationsApi', newAccomodation, continuation);
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
        editAccomodation: editAccomodation
    };
});