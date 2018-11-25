function startApplication() {
    'use strict';
    console.log('Application has started!');
    require(['binder'], function (binder) {
        binder.bind();
    });
}

