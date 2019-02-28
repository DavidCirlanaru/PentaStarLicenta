define('statistics.viewModel', ["viewHandler", "statistics.dataservice"], function (viewHandler, statisticsDataService) {
    'use strict';

    var isViewVisible = viewHandler.views.content.statistics;

    
    var pricesSum = ko.observable(0);


    function refreshStatistics() {
        statisticsDataService.getAllRoomTypePrices(loadStatistics);
    }

    function loadStatistics(data) {
        pricesSum(data);
    }

    isViewVisible.subscribe(function (newValue) {
        if (newValue) {
            refreshStatistics();
        }
    });

    return {
        isViewVisible: isViewVisible,
        pricesSum: pricesSum
        
    };
});
