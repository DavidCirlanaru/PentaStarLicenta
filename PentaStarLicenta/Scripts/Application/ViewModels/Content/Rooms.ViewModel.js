define('rooms.viewModel', ["viewHandler"], function (viewHandler) {
    'use strict';
    var isViewVisible = viewHandler.views.content.rooms;

    return {
        isViewVisible: isViewVisible
    };
});