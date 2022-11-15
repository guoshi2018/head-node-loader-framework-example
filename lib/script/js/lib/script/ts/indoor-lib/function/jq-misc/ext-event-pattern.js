"use strict";
($ => {
    $.event.special.event_pattern = {
        setup: function (data, namespace, eventHandle) {
        },
        add: function (handleObj) {
        },
        trigger: function (event, data) {
        },
        preDispatch: function (event) {
        },
        handle: function (event, data) {
            event.handleObj.handler.apply(this, [event, data]);
        },
        postDispatch: function (event) {
        },
        _default: function (event, data) {
        },
        remove: function (handleObj) {
        },
        teardown: function () {
        },
        description: 'this is my extension event pattern.',
    };
})(jQuery);
//# sourceMappingURL=ext-event-pattern.js.map