"use strict";
var CustomBootstrap;
(function (CustomBootstrap) {
    var Util;
    (function (Util) {
        var _a;
        class Backdrop extends Util.Config {
            constructor(customConfig) {
                super();
                const opt = Object.assign({}, Backdrop.defaultOptions, customConfig);
                this._options = this._generateOptions(opt);
                this.__isAppended = false;
            }
            static get NAME() {
                return "backdrop";
            }
            get element() {
                if (!this._options.element) {
                    const backdrop = document.createElement('div');
                    backdrop.className = this._options.className || '';
                    if (this._options.isAnimated) {
                        backdrop.classList.add(Backdrop.CLASS_NAME_FADE);
                    }
                    this._options.element = backdrop;
                }
                return this._options.element;
            }
            show(callback) {
                if (this._options.isVisible) {
                    this._append();
                    if (this._options.isAnimated) {
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
                if (this._options.isVisible) {
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
                if (this.__isAppended) {
                    CustomBootstrap.EvtMgr.off({
                        element: this.element,
                        evtType: Backdrop.EVENT_MOUSEDOWN,
                        clientListener: this._options.clickCallback,
                    });
                    this.element.remove();
                    this.__isAppended = false;
                }
            }
            _append() {
                if (!this.__isAppended) {
                    this._options.rootElement.append(this.element);
                    CustomBootstrap.EvtMgr.on({
                        element: this.element,
                        evtType: Backdrop.EVENT_MOUSEDOWN,
                        clientListener: this._options.clickCallback,
                    });
                    this.__isAppended = true;
                }
            }
            _emulateAnimation(callback) {
                CustomBootstrap.Util.Index.executeAfterTransition(callback, this.element, this._options.isAnimated);
            }
        }
        _a = Backdrop;
        Backdrop._defaultOptions = {
            className: 'modal-backdrop',
            clickCallback: (evt) => {
                console.log('click callback not set');
            },
            isAnimated: false,
            isVisible: true,
            rootElement: document.body
        };
        Backdrop.CLASS_NAME_FADE = 'fade';
        Backdrop.CLASS_NAME_SHOW = 'show';
        Backdrop.EVENT_MOUSEDOWN = `mousedown.bs.${_a.NAME}`;
        Util.Backdrop = Backdrop;
    })(Util = CustomBootstrap.Util || (CustomBootstrap.Util = {}));
})(CustomBootstrap || (CustomBootstrap = {}));
//# sourceMappingURL=backdrop.js.map