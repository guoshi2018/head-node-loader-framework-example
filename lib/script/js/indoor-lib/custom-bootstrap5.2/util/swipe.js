"use strict";
var CustomBootstrap;
(function (CustomBootstrap) {
    var Util;
    (function (Util) {
        class Swipe extends Util.Config {
            constructor(customConfig) {
                super();
                if (!customConfig.element || !Swipe.isSupported()) {
                    throw new Error("swipe element undefined or swipe is not supported");
                }
                const opt = Object.assign({}, Swipe.defaultOptions, customConfig);
                this._options = this._generateOptions(opt);
                this._deltaX = 0;
                this._supportPointerEvents = Boolean(window.PointerEvent);
                this._start_bind = this._start.bind(this);
                this._end_bind = this._end.bind(this);
                this._move_bind = this._move.bind(this);
                this._initEvents();
            }
            static get NAME() {
                return "swipe";
            }
            dispose() {
                CustomBootstrap.EvtMgr.off({
                    element: this._options.element,
                    evtType: Swipe.EVENT_KEY,
                });
            }
            _start(evt) {
                if (Swipe.isSupported()) {
                    const et = evt;
                    this._deltaX = et.touches[0].clientX;
                }
                else if (this._eventIsPointerPenTouch(evt)) {
                    const ep = evt;
                    this._deltaX = ep.clientX;
                }
            }
            _end(evt) {
                if (this._eventIsPointerPenTouch(evt)) {
                    this._deltaX = evt.clientX - this._deltaX;
                }
                const absDeltaX = Math.abs(this._deltaX);
                if (absDeltaX > Swipe.SWIPE_THRESHOLD) {
                    const direction = absDeltaX / this._deltaX;
                    this._deltaX = 0;
                    if (direction !== 0) {
                        direction > 0 ?
                            this._options.rightCallback && this._options.rightCallback() :
                            this._options.leftCallback && this._options.leftCallback();
                    }
                }
                this._options.endCallback && this._options.endCallback();
            }
            _move(evt) {
                const e = evt;
                this._deltaX = e.touches && e.touches.length > 1 ?
                    0 :
                    e.touches[0].clientX - this._deltaX;
            }
            _initEvents() {
                const element = this._options.element;
                if (this._supportPointerEvents) {
                    CustomBootstrap.EvtMgr.on({
                        element,
                        evtType: Swipe.EVENT_POINTERDOWN,
                        clientListener: this._start_bind,
                    });
                    CustomBootstrap.EvtMgr.on({
                        element,
                        evtType: Swipe.EVENT_POINTERUP,
                        clientListener: this._end_bind,
                    });
                    element.classList.add(Swipe.CLASS_NAME_POINTER_EVENT);
                }
                else if (Swipe.isSupported()) {
                    CustomBootstrap.EvtMgr.on({
                        element,
                        evtType: Swipe.EVENT_TOUCHSTART,
                        clientListener: this._start_bind,
                    });
                    CustomBootstrap.EvtMgr.on({
                        element,
                        evtType: Swipe.EVENT_TOUCHMOVE,
                        clientListener: this._move_bind,
                    });
                    CustomBootstrap.EvtMgr.on({
                        element,
                        evtType: Swipe.EVENT_TOUCHEND,
                        clientListener: this._end_bind,
                    });
                }
            }
            _eventIsPointerPenTouch(evt) {
                let ok = false;
                if (this._supportPointerEvents) {
                    const e = evt;
                    ok = e.pointerType == Swipe.POINTER_TYPE_PEN ||
                        e.pointerType === Swipe.POINTER_TYPE_TOUCH;
                }
                return ok;
            }
            static isSupported() {
                return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
            }
        }
        Swipe._defaultOptions = {
            leftCallback: () => {
                console.log('left callback forgotten');
            },
            rightCallback: () => {
                console.log('right callback forgotten');
            },
            endCallback: () => {
                console.log('end callback forgotten');
            },
        };
        Swipe.EVENT_KEY = '.bs.swipe';
        Swipe.EVENT_TOUCHSTART = `touchstart${Swipe.EVENT_KEY}`;
        Swipe.EVENT_TOUCHMOVE = `touchmove${Swipe.EVENT_KEY}`;
        Swipe.EVENT_TOUCHEND = `touchend${Swipe.EVENT_KEY}`;
        Swipe.EVENT_POINTERDOWN = `pointerdown${Swipe.EVENT_KEY}`;
        Swipe.EVENT_POINTERUP = `pointerup${Swipe.EVENT_KEY}`;
        Swipe.POINTER_TYPE_TOUCH = 'touch';
        Swipe.POINTER_TYPE_PEN = 'pen';
        Swipe.CLASS_NAME_POINTER_EVENT = 'pointer-event';
        Swipe.SWIPE_THRESHOLD = 40;
        Util.Swipe = Swipe;
    })(Util = CustomBootstrap.Util || (CustomBootstrap.Util = {}));
})(CustomBootstrap || (CustomBootstrap = {}));
//# sourceMappingURL=swipe.js.map