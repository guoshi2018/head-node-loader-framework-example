"use strict";
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
//# sourceMappingURL=config.js.map