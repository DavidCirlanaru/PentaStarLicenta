define('menu.viewModel', ["viewHandler"], function (viewHandler) {
    'use strict';

    function clickGeneral() {
        viewHandler.showContentView('general');
        $('.header-title').text('General');
        
        var app = Sammy('#general', function () {
            this.get('General', function () {
            });
        });
        app.run('General');

    }

    function clickRooms() {
        viewHandler.showContentView('rooms');
        $('.header-title').text('Camere');

        var app = Sammy('#rooms', function () {
            this.get('Camere', function () {
            });
        });
        app.run('Camere');

    }

    function clickStatistics() {
        viewHandler.showContentView('statistics');
        $('.header-title').text('Statistici');

        var app = Sammy('#statistics', function () {
            this.get('Statistics', function () {
            });
        });
        app.run('Statistics');
    }

    function clickRoomTypes() {
        viewHandler.showContentView('roomTypes');
        $('.header-title').text('Tipuri Camere');

        var app = Sammy('#roomTypes', function () {
            this.get('TipuriCamere', function () {
            });
        });
        app.run('TipuriCamere');
    }

    function clickEmployees() {
        viewHandler.showContentView('employees');
        $('.header-title').text('Angajati');

        var app = Sammy('#angajati', function () {
            this.get('Angajati', function () {
            });
        });
        app.run('Angajati');
    }

    function clickJobTypes() {
        viewHandler.showContentView('jobTypes');
        $('.header-title').text('Tipuri Job');

        var app = Sammy('#jobTypes', function () {
            this.get('TipuriJob', function () {
            });
        });
        app.run('TipuriJob');
    }

    function clickAccomodations() {
        viewHandler.showContentView('accomodations');
        $('.header-title').text('Rezervari');

        var app = Sammy('#accomodations', function () {
            this.get('Rezervari', function () {
            });
        });
        app.run('Rezervari');
    }

    return {
        clickGeneral: clickGeneral,
        clickRooms: clickRooms,
        clickStatistics: clickStatistics,
        clickRoomTypes: clickRoomTypes,
        clickEmployees: clickEmployees,
        clickJobTypes: clickJobTypes,
        clickAccomodations: clickAccomodations
    };
});