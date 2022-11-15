"use strict";
var CustomBootstrap;
(function (CustomBootstrap) {
    var Util;
    (function (Util) {
        var _a;
        class FocusTrap extends Util.Config {
            constructor(customConfig) {
                super();
                const opt = Object.assign({}, FocusTrap.defaultOptions, customConfig);
                this._options = this._generateOptions(opt);
                this.__isActive = false;
                this.__lastTabNavDirection = 'backward';
            }
            static get NAME() {
                return 'focustrap';
            }
            activate() {
                if (!this.__isActive && this._options.autofocus
                    && this._options.element) {
                    this._options.element.focus();
                    CustomBootstrap.EvtMgr.off({
                        element: document.body,
                        evtType: FocusTrap.EVENT_KEY
                    });
                    CustomBootstrap.EvtMgr.on({
                        element: document.body,
                        evtType: FocusTrap.EVENT_FOCUSIN,
                        clientListener: this.__handleFocusin.bind(this),
                    });
                    CustomBootstrap.EvtMgr.on({
                        element: document.body,
                        evtType: FocusTrap.EVENT_KEYDOWN_TAB,
                        clientListener: this.__handleKeydown.bind(this),
                    });
                    this.__isActive = true;
                }
            }
            deactivate() {
                if (this.__isActive) {
                    CustomBootstrap.EvtMgr.off({
                        element: document.body,
                        evtType: FocusTrap.EVENT_KEY,
                    });
                    this.__isActive = false;
                }
            }
            __handleFocusin(evt) {
                const { element: ele } = this._options;
                if (ele && evt.target !== document.body && evt.target !== ele &&
                    !ele.contains(evt.target)) {
                    const elements = CustomBootstrap.SltEg.focusableChildren(ele);
                    if (elements.length === 0) {
                        ele.focus();
                    }
                    else if (this.__lastTabNavDirection === FocusTrap.TAB_NAV_BACKWARD) {
                        elements[elements.length - 1].focus();
                    }
                    else {
                        elements[0].focus();
                    }
                }
            }
            __handleKeydown(evt) {
                const e = evt;
                if (e.key === FocusTrap.TAB_KEY) {
                    this.__lastTabNavDirection = e.shiftKey ?
                        FocusTrap.TAB_NAV_BACKWARD : FocusTrap.TAB_NAV_FORWARD;
                }
            }
        }
        _a = FocusTrap;
        FocusTrap.DATA_KEY = 'bs.focustrap';
        FocusTrap.EVENT_KEY = `.${_a.DATA_KEY}`;
        FocusTrap.EVENT_FOCUSIN = `focusin${_a.EVENT_KEY}`;
        FocusTrap.EVENT_KEYDOWN_TAB = `keydown.tab${_a.EVENT_KEY}`;
        FocusTrap.TAB_KEY = 'Tab';
        FocusTrap.TAB_NAV_FORWARD = 'forward';
        FocusTrap.TAB_NAV_BACKWARD = 'backward';
        FocusTrap._defaultOptions = {
            autofocus: true,
        };
        Util.FocusTrap = FocusTrap;
    })(Util = CustomBootstrap.Util || (CustomBootstrap.Util = {}));
})(CustomBootstrap || (CustomBootstrap = {}));
//# sourceMappingURL=focustrap.js.map