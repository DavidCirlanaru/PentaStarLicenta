define('header.viewModel', ["viewHandler"], function (viewHandler) {
    'use strict';

    $('.menu-item').click(function () {
        var clickedLink = this.innerHTML;
        console.log(clickedLink);
        $('.page-title').html(clickedLink);
    });
    
    
    
    

    return {
    };
});