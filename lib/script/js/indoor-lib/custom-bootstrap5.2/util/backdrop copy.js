"use strict";
var CustomBootstrap;
(function (CustomBootstrap) {
    var Util;
    (function (Util) {
        var _a;
        const EvtMgr = CustomBootstrap.Dom.EventHandler.Manager;
        class Backdrop extends Util.Config {
            constructor(config) {
                super();
                this._config = this._makeConfig(config);
                this._isAppended = false;
            }
            static get Default() {
                return this._default;
            }
            static get DefaultType() {
                return this._defaultType;
            }
            static get NAME() {
                return this._name;
            }
            get isAppended() {
                return this._isAppended;
            }
            get element() {
                if (!this._element) {
                    const backdrop = document.createElement('div');
                    backdrop.className = this.config.className;
                    if (this.config.isAnimated) {
                        backdrop.classList.add(Backdrop.CLASS_NAME_FADE);
                    }
                    this._element = backdrop;
                }
                return this._element;
            }
            show(callback) {
                if (this.config.isVisible) {
                    this._append();
                    if (this.config.isAnimated) {
                        Util.Index.reflow(this.element);
                    }
                    this.element.classList.add(Backdrop.CLASS_NAME_SHOW);
                    this._emulateAnimation(callback);
                }
                else {
                    callback();
                }
            }
            hide(callback) {
                if (this.config.isVisible) {
                    this.element.classList.remove(Backdrop.CLASS_NAME_SHOW);
                    this._emulateAnimation(() => {
                        this.dispose();
                        callback();
                    });
                }
                else {
                    callback();
                }
            }
            dispose() {
                if (this.isAppended) {
                    EvtMgr.off({
                        element: this.element,
                        evtType: Backdrop.EVENT_MOUSEDOWN,
                        clientListener: this.config.clickCallback,
                    });
                    this.element.remove();
                    this._isAppended = false;
                }
            }
            _configAfterMerge(config) {
                config.rootElement = Util.Index.getElement(config.rootElement);
                return config;
            }
            _append() {
                if (!this.isAppended) {
                    this.config.rootElement.append(this.element);
                    EvtMgr.on({
                        element: this.element,
                        evtType: Backdrop.EVENT_MOUSEDOWN,
                        clientListener: this.config.clickCallback,
                    });
                    this._isAppended = true;
                }
            }
            _emulateAnimation(callback) {
                CustomBootstrap.Util.Index.executeAfterTransition(callback, this.element, this.config.isAnimated);
            }
        }
        _a = Backdrop;
        Backdrop._name = 'backdrop';
        Backdrop._default = {
            className: 'modal-backdrop',
            clickCallback: null,
            isAnimated: false,
            isVisible: true,
            rootElement: 'body'
        };
        Backdrop._defaultType = {
            className: 'string',
            clickCallback: '(function|null)',
            isAnimated: 'boolean',
            isVisible: 'boolean',
            rootElement: '(element|string)'
        };
        Backdrop.CLASS_NAME_FADE = 'fade';
        Backdrop.CLASS_NAME_SHOW = 'show';
        Backdrop.EVENT_MOUSEDOWN = `mousedown.bs.${_a._name}`;
        Util.Backdrop = Backdrop;
    })(Util = CustomBootstrap.Util || (CustomBootstrap.Util = {}));
})(CustomBootstrap || (CustomBootstrap = {}));
//# sourceMappingURL=backdrop%20copy.js.map