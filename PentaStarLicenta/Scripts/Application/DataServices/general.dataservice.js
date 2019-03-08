define('general.dataservice', [], function () {
    'use strict';

    function getAllRoomTypePrices() {
       return $.get('/api/GeneralApi/GetIncomeSum');
    }

    function getNumberOfClients() {
       return $.get('/api/GeneralApi/GetNumberOfClients');
    }


    return {
        getAllRoomTypePrices: getAllRoomTypePrices,
        getNumberOfClients: getNumberOfClients
    };
});