define('general.viewModel', ["viewHandler"], function (viewHandler) {
    'use strict';
    var isViewVisible = viewHandler.views.content.general;

    return {
        isViewVisible: isViewVisible
    };
});