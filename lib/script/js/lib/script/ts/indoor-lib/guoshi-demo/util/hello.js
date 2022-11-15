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
//# sourceMappingURL=hello.js.map