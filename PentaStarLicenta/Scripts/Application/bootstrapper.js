function startApplication() {
    'use strict';
    console.log('Application has started');
    require(['binder', 'routing'], function (binder, routing) {
        setTimeout(function () { routing.initializeRouter() }, 10);
        console.log('Router has initialized')
        binder.bind();

        ko.bindingHandlers.pikaday = {
            init: function (element) {
                var picker = new Pikaday({ field: element, format: 'D MMM YYYY' });
            }
        }
    });
}

