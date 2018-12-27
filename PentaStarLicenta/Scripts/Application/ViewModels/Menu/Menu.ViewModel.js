define('menu.viewModel', ["viewHandler"], function (viewHandler) {
    'use strict';

    function clickGeneral() {
        viewHandler.showContentView('general');
    }

    function clickRooms() {
        viewHandler.showContentView('rooms');
    }

    function clickStatistics() {
        viewHandler.showContentView('statistics');
    }

    function clickRoomTypes() {
        viewHandler.showContentView('roomTypes');
    }

    function clickEmployees() {
        viewHandler.showContentView('employees');
    }

    return {
        clickGeneral: clickGeneral,
        clickRooms: clickRooms,
        clickStatistics: clickStatistics,
        clickRoomTypes: clickRoomTypes,
        clickEmployees: clickEmployees
    };
});