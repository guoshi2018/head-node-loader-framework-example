"use strict";
Object.defineProperties(Number.prototype, {
    asEqual: {
        value: function (another) {
            return Math.abs(this - another) < Number.EPSILON;
        },
        writable: false,
        configurable: false,
        enumerable: true,
    }
});
//# sourceMappingURL=NumberExtensions.js.map