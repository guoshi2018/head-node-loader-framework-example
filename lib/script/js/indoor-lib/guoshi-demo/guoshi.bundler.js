"use strict";
var GuoshiDemo;
(function (GuoshiDemo) {
    let Util;
    (function (Util) {
        class Hello {
            constructor(me) {
                this._me = me;
            }
            ;
            intro() {
                console.log(`hello,world. my name is ${this._me}`);
            }
            please(stu) {
                console.log(`${this._me} say: please sit down `, stu);
            }
        }
        Util.Hello = Hello;
    })(Util = GuoshiDemo.Util || (GuoshiDemo.Util = {}));
})(GuoshiDemo || (GuoshiDemo = {}));
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
//# sourceMappingURL=guoshi.bundler.js.map