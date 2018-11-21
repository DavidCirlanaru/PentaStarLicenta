function startApplication() {
    'use strict';
    console.log('application has started!');
    require(['binder'], function (binder) {
        binder.bind();
    });
}

