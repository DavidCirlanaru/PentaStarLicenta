define('general.dataservice', [], function () {
    'use strict';

    function getAllRoomTypePrices(continuation) {
        $.get('/api/GeneralApi/GetIncomeSum', continuation);
    }

    function getNumberOfClients(continuation) {
        $.get('/api/GeneralApi/GetNumberOfClients', continuation);
    }


    return {
        getAllRoomTypePrices: getAllRoomTypePrices,
        getNumberOfClients: getNumberOfClients
    };
});