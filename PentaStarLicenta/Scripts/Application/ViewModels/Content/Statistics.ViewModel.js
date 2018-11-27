define('statistics.viewModel', ["viewHandler"], function (viewHandler) {
    'use strict';
    var isViewVisible = viewHandler.views.content.statistics;

    return {
        isViewVisible: isViewVisible
    };
});