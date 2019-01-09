define('menu.viewModel', ["viewHandler"], function (viewHandler) {
    'use strict';

    function clickGeneral() {
        viewHandler.showContentView('general');
        $('.header-title').text('General');
    }

    function clickRooms() {
        viewHandler.showContentView('rooms');
        $('.header-title').text('Camere');
    }

    function clickStatistics() {
        viewHandler.showContentView('statistics');
        $('.header-title').text('Statistici');
    }

    function clickRoomTypes() {
        viewHandler.showContentView('roomTypes');
        $('.header-title').text('Tipuri Camere');
    }

    function clickEmployees() {
        viewHandler.showContentView('employees');
        $('.header-title').text('Angajati');
    }

    function clickJobTypes() {
        viewHandler.showContentView('jobTypes');
        $('.header-title').text('Tipuri Job');
    }

    return {
        clickGeneral: clickGeneral,
        clickRooms: clickRooms,
        clickStatistics: clickStatistics,
        clickRoomTypes: clickRoomTypes,
        clickEmployees: clickEmployees,
        clickJobTypes: clickJobTypes
    };
});