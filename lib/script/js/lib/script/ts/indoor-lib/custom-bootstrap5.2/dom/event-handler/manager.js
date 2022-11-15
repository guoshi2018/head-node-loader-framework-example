"use strict";
var CustomBootstrap;
(function (CustomBootstrap) {
    var Dom;
    (function (Dom) {
        var EventHandler;
        (function (EventHandler) {
            EventHandler.Manager = {
                defaultCustomEventInit: {
                    bubbles: true,
                    cancelable: true,
                    composed: true,
                    detail: {},
                },
                on(options) {
                    if (this.findAllBy(options).length == 0) {
                        const wrapper = this.createWrapper(options, false);
                        wrapper.attach();
                    }
                },
                one(options) {
                    if (this.findAllBy(options).length == 0) {
                        const wrapper = this.createWrapper(options, true);
                        wrapper.attach();
                    }
                },
                off(options) {
                    this.findAllBy(options).forEach(w => w.detach());
                },
                trigger(element, evtType, options) {
                    const opt = Object.assign({}, this.defaultCustomEventInit, options);
                    const evt = new CustomEvent(EventHandler.ListenerWrapper.properEventType(evtType), opt);
                    element.dispatchEvent(evt);
                    return evt;
                },
                createWrapper(options, onceOnly = false) {
                    let w;
                    if ("dlgSelector" in options) {
                        w = new EventHandler.DelegateListenerWrapper(options, onceOnly);
                    }
                    else {
                        w = new EventHandler.ListenerWrapper(options, onceOnly);
                    }
                    return w;
                },
                findAllBy(options) {
                    return [...EventHandler.ListenerWrapper.wrapperRegistry.values()].filter(w => {
                        const cond1 = w.element == options.element;
                        const cond2 = !("clientListener" in options) &&
                            options.evtType.startsWith('.') && w.evtType.endsWith(options.evtType);
                        const cond3 = ("clientListener" in options) &&
                            w.evtType === options.evtType &&
                            w.clientListener === options.clientListener;
                        const cond4 = !("dlgSelector" in options) ||
                            w.dlgSelector == options.dlgSelector;
                        return cond1 && (cond2 || (cond3 && cond4));
                    });
                },
            };
        })(EventHandler = Dom.EventHandler || (Dom.EventHandler = {}));
    })(Dom = CustomBootstrap.Dom || (CustomBootstrap.Dom = {}));
})(CustomBootstrap || (CustomBootstrap = {}));
//# sourceMappingURL=manager.js.map