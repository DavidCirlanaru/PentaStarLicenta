define('binder',
    function () {
        'use strict';
        
        function bind() {
            console.log('Binder has initialised');
        };
        return {
            bind: bind
        };
    }
);