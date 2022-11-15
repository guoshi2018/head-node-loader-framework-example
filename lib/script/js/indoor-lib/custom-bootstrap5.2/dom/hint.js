"use strict";
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
//# sourceMappingURL=hint.js.map