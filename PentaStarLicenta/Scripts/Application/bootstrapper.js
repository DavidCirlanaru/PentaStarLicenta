function startApplication() {
    'use strict';
    console.log('application has started!');
    require(['binder', 'routing'], function (binder, routing) {
        routing.initializeRouter();
        binder.bind();
       
    });
}

