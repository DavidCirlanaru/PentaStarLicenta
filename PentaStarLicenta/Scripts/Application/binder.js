define('binder',
    function () {
        'use strict';
        
        function bind() {
            console.log('binder has initialised');

            
        };
        return {
            bind: bind
        };
    }
);