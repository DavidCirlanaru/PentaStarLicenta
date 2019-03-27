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

    function getNumberOfRooms() {
        return $.get('/api/GeneralApi/getNumberOfRooms');
    }

    function getAccomodationsPerMonth() {
        return $.get('/api/GeneralApi/getAccomodationsPerMonth');
    }



    return {
        getAllRoomTypePrices: getAllRoomTypePrices,
        getNumberOfClients: getNumberOfClients,
        getNumberOfEmployees: getNumberOfEmployees,
        getNumberOfRooms: getNumberOfRooms,
        getAccomodationsPerMonth: getAccomodationsPerMonth
    };
});