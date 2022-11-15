"use strict";
var CustomBootstrap;
(function (CustomBootstrap) {
    var Util;
    (function (Util) {
        class Config {
            constructor() {
                this._config = {};
                this._element = null;
            }
            get config() {
                return this._config;
            }
            static get Default() {
                throw new Error('You have to implement the static property "Default", for each component!');
            }
            static get DefaultType() {
                throw new Error('You have to implement the static property "DefaultType", for each component!');
            }
            static get NAME() {
                throw new Error('You have to implement the static property "NAME", for each component!');
            }
            _makeConfig(customConfig) {
                let config = this._mergeConfigObj(customConfig);
                config = this._configAfterMerge(config);
                this._typeCheckConfig(config);
                return config;
            }
            _mergeConfigObj(customConfig, element) {
                const jsonConfig = element ?
                    CustomBootstrap.Dom.Manipulator.getDataAttribute(element, 'config') : {};
                return Object.assign(Object.assign(Object.assign(Object.assign({}, this.constructor.Default), (typeof jsonConfig === 'object' ? jsonConfig : {})), CustomBootstrap.Dom.Manipulator.getDataAttributes(element)), customConfig);
            }
            _configAfterMerge(config) {
                return config;
            }
            _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
                for (const property of Object.keys(configTypes)) {
                    const expectedTypes = configTypes[property];
                    const value = config[property];
                    const valueType = Util.Index.isElement(value) ? 'element' : Util.Index.toType(value);
                    if (!new RegExp(expectedTypes).test(valueType)) {
                        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
                    }
                }
            }
        }
        Util.Config = Config;
    })(Util = CustomBootstrap.Util || (CustomBootstrap.Util = {}));
})(CustomBootstrap || (CustomBootstrap = {}));
//# sourceMappingURL=config%20copy.js.map