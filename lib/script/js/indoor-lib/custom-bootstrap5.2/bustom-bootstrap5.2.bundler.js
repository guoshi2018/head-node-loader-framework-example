"use strict";
var CustomBootstrap;
(function (CustomBootstrap) {
    var Dom;
    (function (Dom) {
        class Manipulator {
            static _normalizeData(value) {
                if (value === 'true') {
                    return true;
                }
                if (value === 'false') {
                    return false;
                }
                if (value === Number(value).toString()) {
                    return Number(value);
                }
                if (value === '' || value === 'null') {
                    return null;
                }
                if (typeof value !== 'string') {
                    return value;
                }
                try {
                    return JSON.parse(decodeURIComponent(value));
                }
                catch (_a) {
                    return value;
                }
            }
            static _normalizeDataKey(key) {
                return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
            }
            static setDataAttribute(element, key, value) {
                element.setAttribute(`data-bs-${this._normalizeDataKey(key)}`, value);
            }
            static removeDataAttribute(element, key) {
                element.removeAttribute(`data-bs-${this._normalizeDataKey(key)}`);
            }
            static getDataAttributes(element) {
                const attributes = {};
                if (element) {
                    const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));
                    for (const key of bsKeys) {
                        let pureKey = key.replace(/^bs/, '');
                        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
                        attributes[pureKey] = this._normalizeData(element.dataset[key]);
                    }
                }
                return attributes;
            }
            static getDataAttribute(element, key) {
                return this._normalizeData(element.getAttribute(`data-bs-${this._normalizeDataKey(key)}`));
            }
        }
        Dom.Manipulator = Manipulator;
    })(Dom = CustomBootstrap.Dom || (CustomBootstrap.Dom = {}));
})(CustomBootstrap || (CustomBootstrap = {}));
var CustomBootstrap;
(function (CustomBootstrap) {
    var Util;
    (function (Util) {
        class Index {
            static toType_Orig(o) {
                if (o === null || o === undefined) {
                    return `${o}`;
                }
                return Object.prototype.toString.call(o).match(/\s([a-z]+)/i)[1].toLowerCase();
            }
            static toType(o, lowerBaseType = true) {
                let t = Object.prototype.toString.call(o).slice(8, -1);
                if (lowerBaseType) {
                    t = t.toLowerCase();
                }
                t = t.toLowerCase() == "object" ? o.constructor.name : t;
                if (t == 'Object' && lowerBaseType) {
                    t = 'object';
                }
                return t;
            }
            static getUID(prefix) {
                do {
                    prefix += Math.floor(Math.random() * this.MAX_UID);
                } while (document.getElementById(prefix));
                return prefix;
            }
            static getSelector_orig(element) {
                let selector = element.getAttribute('data-bs-target');
                if (!selector || selector === '#') {
                    let hrefAttribute = element.getAttribute('href');
                    if (!hrefAttribute || (!hrefAttribute.includes('#') && !hrefAttribute.startsWith('.'))) {
                        return null;
                    }
                    if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
                        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
                    }
                    selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
                }
                return selector;
            }
            static getSelector(element) {
                let selector = element.getAttribute('data-bs-target');
                if (!selector || selector === '#') {
                    selector = null;
                    let href = element.getAttribute('href');
                    if (href) {
                        const hashPos = href.indexOf('#');
                        const dotPos = href.indexOf('.');
                        if ((hashPos == 0 || dotPos == 0) && href.length > 1) {
                            selector = href;
                        }
                        else if (hashPos != -1 && hashPos != 0 && hashPos != href.length - 1) {
                            selector = `#${href.split('#')[1]}`;
                        }
                    }
                }
                const temp = selector ? selector.trim() : null;
                return temp == "#" || temp == "." ? null : temp;
            }
            static getSelectorFromElement(element) {
                const selector = this.getSelector(element);
                return selector && document.querySelector(selector) ? selector : null;
            }
            static getElementFromSelector(element) {
                const selector = this.getSelector(element);
                return selector ? document.querySelector(selector) : null;
            }
            static getTransitionDurationFromElement(element) {
                if (!element) {
                    return 0;
                }
                let { transitionDuration, transitionDelay } = window.getComputedStyle(element);
                const floatTransitionDuration = Number.parseFloat(transitionDuration);
                const floatTransitionDelay = Number.parseFloat(transitionDelay);
                if (!floatTransitionDuration && !floatTransitionDelay) {
                    return 0;
                }
                transitionDuration = transitionDuration.split(',')[0];
                transitionDelay = transitionDelay.split(',')[0];
                return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * this.MILLISECONDS_MULTIPLIER;
            }
            static getTransitionDuraDelay(element) {
                function _toSeconds(value) {
                    const n = Number.parseFloat(value.split(',')[0]);
                    return Number.isNaN(n) ? 0 : n;
                }
                let { transitionDuration, transitionDelay } = window.getComputedStyle(element);
                return (_toSeconds(transitionDuration) + _toSeconds(transitionDelay)) * this.MILLISECONDS_MULTIPLIER;
            }
            static triggerTransitionEnd(element) {
                element.dispatchEvent(new Event(this.TRANSITION_END));
            }
            static isElement_orig(object) {
                if (!object || typeof object !== 'object') {
                    return false;
                }
                if (typeof object.jquery !== 'undefined') {
                    object = object[0];
                }
                return typeof object.nodeType !== 'undefined';
            }
            static isElement(object) {
                let ok = false;
                if (object && typeof object === 'object') {
                    if (typeof object.jquery !== 'undefined') {
                        object = object[0];
                    }
                    ok = object instanceof Element;
                }
                return ok;
            }
            static isHTMLElement(object) {
                let ok = false;
                if (object && typeof object === 'object') {
                    if (typeof object.jquery !== 'undefined') {
                        object = object[0];
                    }
                    ok = object instanceof HTMLElement;
                }
                return ok;
            }
            static getElement(arg) {
                let result = null;
                if (typeof arg === 'string' && arg.length > 0) {
                    result = document.querySelector(arg);
                }
                else if (this.isElement(arg)) {
                    result = arg.jquery ? arg[0] : arg;
                }
                return result;
            }
            static getHTMLElement(arg) {
                let result = null;
                if (typeof arg === 'string' && arg.length > 0) {
                    result = document.querySelector(arg);
                }
                else if (this.isHTMLElement(arg)) {
                    result = arg.jquery ? arg[0] : arg;
                }
                return result;
            }
            static isVisible_orig(element) {
                if (!this.isElement(element) || element.getClientRects().length === 0) {
                    return false;
                }
                const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible';
                const closedDetails = element.closest('details:not([open])');
                if (!closedDetails) {
                    return elementIsVisible;
                }
                if (closedDetails !== element) {
                    const summary = element.closest('summary');
                    if (summary && summary.parentNode !== closedDetails) {
                        return false;
                    }
                    if (summary === null) {
                        return false;
                    }
                }
                return elementIsVisible;
            }
            static isVisible(element) {
                let vis = false;
                if (element.getClientRects().length !== 0) {
                    vis = getComputedStyle(element).getPropertyValue('visibility') === 'visible';
                    const closedDetails = element.closest('details:not([open])');
                    if (closedDetails && closedDetails !== element) {
                        const summary = element.closest('summary');
                        if (summary === null || summary.parentElement !== closedDetails) {
                            vis = false;
                        }
                    }
                }
                return vis;
            }
            static isDisabled_orig(element) {
                if (!element || element.nodeType !== Node.ELEMENT_NODE) {
                    return true;
                }
                if (element.classList.contains('disabled')) {
                    return true;
                }
                if (typeof element.disabled !== 'undefined') {
                    return element.disabled;
                }
                return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
            }
            static isDisabled(element) {
                const enabledWorkers = [NaN, undefined, "", false, 0,];
                return element.classList.contains('disabled') ||
                    !enabledWorkers.includes(element.disabled) || element.hasAttribute('disabled');
            }
            static findShadowRoot_orig(element) {
                if (!document.documentElement.attachShadow) {
                    return null;
                }
                if (typeof element.getRootNode === 'function') {
                    const root = element.getRootNode();
                    return root instanceof ShadowRoot ? root : null;
                }
                if (element instanceof ShadowRoot) {
                    return element;
                }
                if (!element.parentNode) {
                    return null;
                }
                return this.findShadowRoot_orig(element.parentElement);
            }
            static findShadowRoot(element) {
                let sr = null;
                if (typeof element.getRootNode === 'function') {
                    const root = element.getRootNode();
                    sr = root instanceof ShadowRoot ? root : null;
                }
                else if (element instanceof ShadowRoot) {
                    sr = element;
                }
                else if (element.parentElement) {
                    sr = this.findShadowRoot(element.parentElement);
                }
                return sr;
            }
            static noop() { }
            static reflow(element) {
                element.offsetHeight;
            }
            static getjQuery() {
                let jq = null;
                if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
                    jq = window.jQuery;
                }
                return jq;
            }
            static onDOMContentLoaded(callback) {
                if (document.readyState === 'loading') {
                    if (!this.DOMContentLoadedCallbacks.length) {
                        document.addEventListener('DOMContentLoaded', (evt) => {
                            for (const callback of this.DOMContentLoadedCallbacks) {
                                callback(evt);
                            }
                        });
                    }
                    this.DOMContentLoadedCallbacks.push(callback);
                }
                else {
                    callback();
                }
            }
            static isRTL() {
                return document.documentElement.dir === 'rtl';
            }
            static execute(callback) {
                if (typeof callback === 'function') {
                    callback();
                }
            }
            static executeAfterTransition(callback, transitionElement, waitForTransition = true) {
                if (waitForTransition) {
                    const durationPadding = 5;
                    const emulatedDuration = this.getTransitionDuraDelay(transitionElement) + durationPadding;
                    setTimeout(() => {
                        callback();
                    }, emulatedDuration);
                }
                else {
                    callback();
                }
            }
            static getNextActiveElement(list, activeElement, shouldGetNext, isCycleAllowed) {
                const listLength = list.length;
                let index = list.indexOf(activeElement);
                if (index === -1) {
                    return shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
                }
                index += shouldGetNext ? 1 : -1;
                if (isCycleAllowed) {
                    index = (index + listLength) % listLength;
                }
                return list[Math.max(0, Math.min(index, listLength - 1))];
            }
            static nextItem(list, current, forNext, cycled) {
                let tgtIdx;
                const listLength = list.length;
                let index = list.indexOf(current);
                if (index === -1) {
                    tgtIdx = forNext && cycled ? listLength - 1 : 0;
                }
                else {
                    tgtIdx = forNext ? index + 1 : index - 1;
                    if (cycled) {
                        tgtIdx = (tgtIdx + listLength) % listLength;
                    }
                    else {
                        tgtIdx = Math.max(0, Math.min(tgtIdx, listLength - 1));
                    }
                }
                return list[tgtIdx];
            }
        }
        Index.MAX_UID = 1000000;
        Index.MILLISECONDS_MULTIPLIER = 1000;
        Index.TRANSITION_END = 'transitionend';
        Index.DOMContentLoadedCallbacks = [];
        Util.Index = Index;
    })(Util = CustomBootstrap.Util || (CustomBootstrap.Util = {}));
})(CustomBootstrap || (CustomBootstrap = {}));
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
var CustomBootstrap;
(function (CustomBootstrap) {
    var Dom;
    (function (Dom) {
        Dom.SelectorEngine = {
            find(selector, element = document.documentElement) {
                return [...element.querySelectorAll(selector)];
            },
            findOne(selector, element = document.documentElement) {
                return element.querySelector(selector);
            },
            children(element, selector) {
                return [...element.children].filter(child => child.matches(selector));
            },
            parents(element, selector) {
                var _a, _b;
                const parents = [];
                let ancestor = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.closest(selector);
                while (ancestor) {
                    parents.push(ancestor);
                    ancestor = (_b = ancestor.parentElement) === null || _b === void 0 ? void 0 : _b.closest(selector);
                }
                return parents;
            },
            ancestors(element, selector) {
                const ancs = [];
                let current = element;
                while ((current = current.parentElement)) {
                    current.matches(selector) && ancs.push(current);
                }
                return ancs;
            },
            prev(element, selector) {
                let previous = element.previousElementSibling;
                while (previous) {
                    if (previous.matches(selector)) {
                        return [previous];
                    }
                    previous = previous.previousElementSibling;
                }
                return [];
            },
            firstPrev(element, selector) {
                let target = null;
                let prev = element;
                while ((prev = prev.previousElementSibling)) {
                    if (prev.matches(selector)) {
                        target = prev;
                        break;
                    }
                }
                return target;
            },
            prevSiblings(element, selector) {
                let targets = [];
                let prev = element;
                while ((prev = prev.previousElementSibling)) {
                    prev.matches(selector) && targets.push(prev);
                }
                return targets;
            },
            next(element, selector) {
                let next = element.nextElementSibling;
                while (next) {
                    if (next.matches(selector)) {
                        return [next];
                    }
                    next = next.nextElementSibling;
                }
                return [];
            },
            firstNext(element, selector) {
                let target = null;
                let next = element;
                while ((next = next.nextElementSibling)) {
                    if (next.matches(selector)) {
                        target = next;
                        break;
                    }
                }
                return target;
            },
            nextSiblings(element, selector) {
                let targets = [];
                let next = element;
                while ((next = next.nextElementSibling)) {
                    next.matches(selector) && targets.push(next);
                }
                return targets;
            },
            focusableChildren(element) {
                const focusables = [
                    'a',
                    'button',
                    'input',
                    'textarea',
                    'select',
                    'details',
                    '[tabindex]',
                    '[contenteditable="true"]'
                ].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
                return this.find(focusables, element).filter(el => !CustomBootstrap.Util.Index.isDisabled(el) && CustomBootstrap.Util.Index.isVisible(el));
            }
        };
    })(Dom = CustomBootstrap.Dom || (CustomBootstrap.Dom = {}));
})(CustomBootstrap || (CustomBootstrap = {}));
var CustomBootstrap;
(function (CustomBootstrap) {
    CustomBootstrap.DomManp = CustomBootstrap.Dom.Manipulator;
    CustomBootstrap.UIndex = CustomBootstrap.Util.Index;
    CustomBootstrap.EvtMgr = CustomBootstrap.Dom.EventHandler.Manager;
    CustomBootstrap.SltEg = CustomBootstrap.Dom.SelectorEngine;
    CustomBootstrap.DefAlwList = CustomBootstrap.Util.DefaultAllowlist;
})(CustomBootstrap || (CustomBootstrap = {}));
var CustomBootstrap;
(function (CustomBootstrap) {
    var Dom;
    (function (Dom) {
        class Data {
            static set(element, key, instance) {
                if (!this._elementMap.has(element)) {
                    this._elementMap.set(element, new Map());
                }
                const instanceMap = this._elementMap.get(element);
                if (!instanceMap.has(key) && instanceMap.size !== 0) {
                    console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
                    return;
                }
                instanceMap.set(key, instance);
            }
            static get(element, key) {
                var _a;
                return (_a = this._elementMap.get(element)) === null || _a === void 0 ? void 0 : _a.get(key);
            }
            static remove(element, key) {
                let ok = false;
                const eleM = this._elementMap.get(element);
                if (eleM) {
                    ok = eleM.delete(key);
                }
                return ok;
            }
        }
        Data._elementMap = new Map();
        Dom.Data = Data;
    })(Dom = CustomBootstrap.Dom || (CustomBootstrap.Dom = {}));
})(CustomBootstrap || (CustomBootstrap = {}));
var CustomBootstrap;
(function (CustomBootstrap) {
    var Dom;
    (function (Dom) {
        class Hint {
            static get div() {
                if (!this._div) {
                    this._div = document.createElement('div');
                    this._div.textContent = 'element field forgotten.';
                }
                return this._div;
            }
        }
        Dom.Hint = Hint;
    })(Dom = CustomBootstrap.Dom || (CustomBootstrap.Dom = {}));
})(CustomBootstrap || (CustomBootstrap = {}));
var CustomBootstrap;
(function (CustomBootstrap) {
    var Util;
    (function (Util) {
        class Config {
            constructor() {
                this._options = Object.assign({}, Config._defaultOptions);
            }
            static get NAME() {
                return "common-options";
            }
            static get defaultOptions() {
                return this._defaultOptions;
            }
            get options() {
                return this._options;
            }
            _generateOptions(customConfig) {
                const jsonConfig = customConfig.element ?
                    CustomBootstrap.Dom.Manipulator.getDataAttribute(customConfig.element, 'config') : {};
                return Object.assign(Object.assign(Object.assign({}, (typeof jsonConfig === 'object' ? jsonConfig : {})), CustomBootstrap.Dom.Manipulator.getDataAttributes(customConfig.element)), customConfig);
            }
        }
        Config._defaultOptions = {};
        Util.Config = Config;
    })(Util = CustomBootstrap.Util || (CustomBootstrap.Util = {}));
})(CustomBootstrap || (CustomBootstrap = {}));
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
var CustomBootstrap;
(function (CustomBootstrap) {
    var Util;
    (function (Util) {
        const uriAttributeNames = new Set([
            'background',
            'cite',
            'href',
            'itemtype',
            'longdesc',
            'poster',
            'src',
            'xlink:href'
        ]);
        const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
        const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
        const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
        const isAllowedAttribute = (attr, allowedAttributeNameList) => {
            let ok;
            const attributeName = attr.name.toLowerCase();
            if (allowedAttributeNameList.includes(attributeName)) {
                if (uriAttributeNames.has(attributeName)) {
                    const v = attr.value || "";
                    ok = Boolean(SAFE_URL_PATTERN.test(v) || DATA_URL_PATTERN.test(v));
                }
                else {
                    ok = true;
                }
            }
            else {
                const regs = allowedAttributeNameList.filter(attributeRegex => attributeRegex instanceof RegExp);
                ok = regs.some(reg => reg.test(attributeName));
            }
            return ok;
        };
        Util.DefaultAllowlist = {
            '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
            a: ['target', 'href', 'title', 'rel'],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        };
        function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
            let result = unsafeHtml;
            if (unsafeHtml.length != 0) {
                if (sanitizeFunction) {
                    result = sanitizeFunction(unsafeHtml);
                }
                else {
                    const domParser = new window.DOMParser();
                    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
                    const elements = [...createdDocument.body.querySelectorAll('*')];
                    for (const element of elements) {
                        const elementName = element.tagName.toLowerCase();
                        if (!Object.keys(allowList).includes(elementName)) {
                            element.remove();
                        }
                        else {
                            const attributeList = [...element.attributes];
                            const allowedAttributes = [...allowList['*'], ...allowList[elementName]];
                            for (const attribute of attributeList) {
                                if (!isAllowedAttribute(attribute, allowedAttributes)) {
                                    element.removeAttribute(attribute.nodeName);
                                }
                            }
                        }
                    }
                    result = createdDocument.body.innerHTML;
                }
            }
            return result;
        }
        Util.sanitizeHtml = sanitizeHtml;
    })(Util = CustomBootstrap.Util || (CustomBootstrap.Util = {}));
})(CustomBootstrap || (CustomBootstrap = {}));
var CustomBootstrap;
(function (CustomBootstrap) {
    var Util;
    (function (Util) {
        class ScrollBarHelper {
            constructor() {
                this._element = document.body;
            }
            getWidth() {
                const documentWidth = document.documentElement.clientWidth;
                return Math.abs(window.innerWidth - documentWidth);
            }
            hide() {
                const width = this.getWidth();
                this._hideOverFlow();
                this._setElementAttributes(this._element, ScrollBarHelper.PROPERTY_PADDING_RIGHT, (calculatedValue) => calculatedValue + width);
                this._setElementAttributes(ScrollBarHelper.SELECTOR_FIXED, ScrollBarHelper.PROPERTY_PADDING_RIGHT, (calculatedValue) => calculatedValue + width);
                this._setElementAttributes(ScrollBarHelper.SELECTOR_STICKY_TOP, ScrollBarHelper.PROPERTY_MARGIN_RIGHT, (calculatedValue) => calculatedValue - width);
            }
            reset() {
                this._resetElementAttributes(this._element, 'overflow');
                this._resetElementAttributes(this._element, ScrollBarHelper.PROPERTY_PADDING_RIGHT);
                this._resetElementAttributes(ScrollBarHelper.SELECTOR_FIXED, ScrollBarHelper.PROPERTY_PADDING_RIGHT);
                this._resetElementAttributes(ScrollBarHelper.SELECTOR_STICKY_TOP, ScrollBarHelper.PROPERTY_MARGIN_RIGHT);
            }
            isOverflowing() {
                return this.getWidth() > 0;
            }
            _hideOverFlow() {
                this._saveInitialAttribute(this._element, 'overflow');
                this._element.style.overflow = 'hidden';
            }
            _setElementAttributes(selector, styleProperty, callback) {
                const scrollbarWidth = this.getWidth();
                const manipulationCallBack = (ele) => {
                    if (ele !== this._element && window.innerWidth > ele.clientWidth + scrollbarWidth) {
                        return;
                    }
                    this._saveInitialAttribute(ele, styleProperty);
                    const calculatedValue = window.getComputedStyle(ele).getPropertyValue(styleProperty);
                    ele.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
                };
                this._applyManipulationCallback(selector, manipulationCallBack);
            }
            _saveInitialAttribute(element, styleProperty) {
                const actualValue = element.style.getPropertyValue(styleProperty);
                if (actualValue) {
                    CustomBootstrap.DomManp.setDataAttribute(element, styleProperty, actualValue);
                }
            }
            _resetElementAttributes(selector, styleProperty) {
                const manipulationCallBack = (ele) => {
                    const value = CustomBootstrap.DomManp.getDataAttribute(ele, styleProperty);
                    if (value === null) {
                        ele.style.removeProperty(styleProperty);
                    }
                    else {
                        CustomBootstrap.DomManp.removeDataAttribute(ele, styleProperty);
                        ele.style.setProperty(styleProperty, value);
                    }
                };
                this._applyManipulationCallback(selector, manipulationCallBack);
            }
            _applyManipulationCallback(selector, callback) {
                if (CustomBootstrap.UIndex.isHTMLElement(selector)) {
                    callback(selector);
                }
                else {
                    CustomBootstrap.SltEg.find(selector, this._element).forEach(ele => callback(ele));
                }
            }
        }
        ScrollBarHelper.SELECTOR_FIXED = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
        ScrollBarHelper.SELECTOR_STICKY_TOP = '.sticky-top';
        ScrollBarHelper.PROPERTY_PADDING_RIGHT = 'padding-right';
        ScrollBarHelper.PROPERTY_MARGIN_RIGHT = 'margin-right';
        Util.ScrollBarHelper = ScrollBarHelper;
    })(Util = CustomBootstrap.Util || (CustomBootstrap.Util = {}));
})(CustomBootstrap || (CustomBootstrap = {}));
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
//# sourceMappingURL=bustom-bootstrap5.2.bundler.js.map