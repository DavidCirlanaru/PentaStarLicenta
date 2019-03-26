define('general.dataservice', [], function () {
    'use strict';

    function getAllRoomTypePrices() {
       return $.get('/api/GeneralApi/GetIncomeSum');
    }

    function getNumberOfClients() {
       return $.get('/api/GeneralApi/GetNumberOfClients');
    }

    function getNumberOfEmployees() {
       return $.get('/api/GeneralApi/GetNumberOfEmployees');
    }


    return {
        getAllRoomTypePrices: getAllRoomTypePrices,
        getNumberOfClients: getNumberOfClients,
        getNumberOfEmployees: getNumberOfEmployees
    };
});