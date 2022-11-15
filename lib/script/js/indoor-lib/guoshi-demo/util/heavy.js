"use strict";
var GuoshiDemo;
(function (GuoshiDemo) {
    let Util;
    (function (Util) {
        class Heavy extends Util.Hello {
            constructor(me, pitty) {
                super(me);
                this._pitty = pitty;
            }
            please(wk) {
                console.log(`${this._me} is now a worker, salary is ${this._pitty}`, wk);
            }
        }
        Util.Heavy = Heavy;
    })(Util = GuoshiDemo.Util || (GuoshiDemo.Util = {}));
})(GuoshiDemo || (GuoshiDemo = {}));
//# sourceMappingURL=heavy.js.map