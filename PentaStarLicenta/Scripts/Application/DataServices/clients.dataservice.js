define('clients.dataservice', [], function () {
    'use strict';

    //Show clients
    function getAllClients(continuation) {
        $.get('/api/ClientsApi', continuation);
    }

    //function addAccomodation(newAccomodation, continuation) {
    //    $.post('/api/AccomodationsApi', newAccomodation, continuation);
    //}

    //function removeAccomodation(AccomodationId, continuation) {
    //    $.ajax({
    //        url: '/api/AccomodationsApi/' + AccomodationId,
    //        type: 'DELETE',
    //        success: continuation
    //    });
    //}

    //function editAccomodation(AccomodationId, editedAccomodation, continuation) {
    //    $.ajax({
    //        url: 'api/AccomodationsApi/' + AccomodationId,
    //        type: 'PUT',
    //        data: editedAccomodation,
    //        success: continuation
    //    });
    //}

    return {
        getAllClients: getAllClients
        
    };
});