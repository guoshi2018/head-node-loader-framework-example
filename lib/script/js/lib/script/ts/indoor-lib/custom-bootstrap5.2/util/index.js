"use strict";
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
//# sourceMappingURL=index.js.map