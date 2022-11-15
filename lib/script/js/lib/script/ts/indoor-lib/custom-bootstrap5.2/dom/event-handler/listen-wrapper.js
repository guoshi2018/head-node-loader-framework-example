"use strict";
var CustomBootstrap;
(function (CustomBootstrap) {
    var Dom;
    (function (Dom) {
        var EventHandler;
        (function (EventHandler) {
            class ListenerWrapper {
                constructor(options, onceOnly = false) {
                    this._element = options.element;
                    this._evtType = options.evtType;
                    this._propType = ListenerWrapper.properEventType(options.evtType);
                    this._clientListener = options.clientListener;
                    this._propListener = ListenerWrapper.properListener(options.clientListener, this._propType);
                    this._onceOnly = onceOnly;
                    this._abortController = new AbortController();
                }
                static get wrapperRegistry() {
                    return this._wrapperRegistry;
                }
                get element() {
                    return this._element;
                }
                get evtType() {
                    return this._evtType;
                }
                get clientListener() {
                    return this._clientListener;
                }
                static properEventType(evtType) {
                    const nativeType = evtType.replace(this.EVENT_NSPC, '');
                    let t = this.REDR_EVENT_TYPES.get(nativeType) || nativeType;
                    if (!this.NATIVE_EVENT_TYPES.has(t)) {
                        t = evtType;
                    }
                    return t;
                }
                static properListener(listener, propType) {
                    let propListener = listener;
                    if (propType in this.REDR_EVENT_TYPES.values()) {
                        propListener = function (evt) {
                            var _a;
                            const e = evt;
                            if (!e.relatedTarget ||
                                (e.relatedTarget !== e.delegateTarget &&
                                    !((_a = e.delegateTarget) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget)))) {
                                return listener.call(e.target, e);
                            }
                        };
                    }
                    return propListener;
                }
                attach() {
                    this._element.addEventListener(this._propType, this._propListener, {
                        capture: true,
                        once: this._onceOnly,
                        signal: this._abortController.signal,
                    });
                    !this._onceOnly && ListenerWrapper._wrapperRegistry.add(this);
                }
                detach() {
                    ListenerWrapper._wrapperRegistry.delete(this);
                    this._abortController.abort(ListenerWrapper.REASON_CLIENT_REMOVE);
                }
            }
            ListenerWrapper.REDR_EVENT_TYPES = new Map([
                ["mouseenter", "mouseover"],
                ["mouseleave", "mouseout"],
            ]);
            ListenerWrapper.NATIVE_EVENT_TYPES = new Set([
                'click',
                'dblclick',
                'mouseup',
                'mousedown',
                'contextmenu',
                'mousewheel',
                'DOMMouseScroll',
                'mouseover',
                'mouseout',
                'mousemove',
                'selectstart',
                'selectend',
                'keydown',
                'keypress',
                'keyup',
                'orientationchange',
                'touchstart',
                'touchmove',
                'touchend',
                'touchcancel',
                'pointerdown',
                'pointermove',
                'pointerup',
                'pointerleave',
                'pointercancel',
                'gesturestart',
                'gesturechange',
                'gestureend',
                'focus',
                'blur',
                'change',
                'reset',
                'select',
                'submit',
                'focusin',
                'focusout',
                'load',
                'unload',
                'beforeunload',
                'resize',
                'move',
                'DOMContentLoaded',
                'readystatechange',
                'error',
                'abort',
                'scroll'
            ]);
            ListenerWrapper._wrapperRegistry = new Set();
            ListenerWrapper.EVENT_NSPC = /\..*/;
            ListenerWrapper.REASON_CLIENT_REMOVE = "client removed it";
            EventHandler.ListenerWrapper = ListenerWrapper;
        })(EventHandler = Dom.EventHandler || (Dom.EventHandler = {}));
    })(Dom = CustomBootstrap.Dom || (CustomBootstrap.Dom = {}));
})(CustomBootstrap || (CustomBootstrap = {}));
//# sourceMappingURL=listen-wrapper.js.map