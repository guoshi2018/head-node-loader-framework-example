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
                catch {
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
//# sourceMappingURL=manipulator.js.map