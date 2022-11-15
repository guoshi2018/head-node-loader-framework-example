"use strict";
Promise.prototype.done = function (onfulfilled, onrejected) {
    this.then(onfulfilled, onrejected)
        .catch(function (reason) {
        setTimeout(() => { throw reason; }, 0);
    });
};
Promise.prototype.finally2 = function (callback) {
    let P = this.constructor;
    return this.then(value => P.resolve(callback()).then(() => value), reason => P.resolve(callback()).then(() => { throw reason; }));
};
//# sourceMappingURL=PromiseExtensions.js.map