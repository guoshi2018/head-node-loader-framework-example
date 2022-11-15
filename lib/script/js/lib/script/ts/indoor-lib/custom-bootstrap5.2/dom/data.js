"use strict";
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
//# sourceMappingURL=data.js.map