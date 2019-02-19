function startApplication() {
    'use strict';
    console.log('application has started!');
    require(['binder', 'routing'], function (binder, routing) {
        routing.initializeRouter();
        binder.bind();

        ko.bindingHandlers.pikaday = {
            init: function (element) {
                var picker = new Pikaday({ field: element, format:'D MMM YYYY' });
            }
        }
    });
}

