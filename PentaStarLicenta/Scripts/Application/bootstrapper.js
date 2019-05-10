function startApplication() {
    'use strict';
    require(['binder', 'routing'], function (binder, routing) {
        setTimeout(function () { routing.initializeRouter() }, 10);
        binder.bind();

        ko.bindingHandlers.pikaday = {
            init: function (element) {
                var picker = new Pikaday({ field: element, format: 'MM-DD-YYYY' });
            }
        }
    });
}

