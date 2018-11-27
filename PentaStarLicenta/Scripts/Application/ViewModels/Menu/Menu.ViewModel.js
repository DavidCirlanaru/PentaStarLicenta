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

    return {
        clickGeneral: clickGeneral,
        clickRooms: clickRooms,
        clickStatistics: clickStatistics
    };
});