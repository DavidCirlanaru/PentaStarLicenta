define('header.viewModel', ["viewHandler"], function (viewHandler) {
    'use strict';

    $('.menu-item').click(function () {
        var clickedLink = this.innerHTML;
        $('.page-title').html(clickedLink);
    });
    
    
    
    

    return {
    };
});