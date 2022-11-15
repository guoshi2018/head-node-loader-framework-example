"use strict";
var CustomBootstrap;
(function (CustomBootstrap) {
    var Dom;
    (function (Dom) {
        var EventHandler;
        (function (EventHandler) {
            class DelegateListenerWrapper extends EventHandler.ListenerWrapper {
                constructor(options, onceOnly = false) {
                    super(options, onceOnly);
                    this._dlgSelector = options.dlgSelector;
                }
                get dlgSelector() {
                    return this._dlgSelector;
                }
                attach() {
                    this._element.querySelectorAll(this._dlgSelector).forEach(ele => [
                        ele.addEventListener(this._propType, this._propListener.bind(ele), {
                            capture: true,
                            once: this._onceOnly,
                            signal: this._abortController.signal,
                        })
                    ]);
                    !this._onceOnly && EventHandler.ListenerWrapper.wrapperRegistry.add(this);
                }
            }
            EventHandler.DelegateListenerWrapper = DelegateListenerWrapper;
        })(EventHandler = Dom.EventHandler || (Dom.EventHandler = {}));
    })(Dom = CustomBootstrap.Dom || (CustomBootstrap.Dom = {}));
})(CustomBootstrap || (CustomBootstrap = {}));
//# sourceMappingURL=delegate-listener-wrapper.js.map