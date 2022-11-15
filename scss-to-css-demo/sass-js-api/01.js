// const a: number = 1;
// const s: string = 'hello,wolrd';
// console.log(a as unknown as string, s);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// import * as ppt from 'sass';
// console.log(ppt.SassNumber);
//这是一个commonJs,package.json需要设置好"type": "commonjs",或保持默认
var sass = require('sass'); //可以运行, 但不能感知
//import * as sass from 'sass'; //可以感知, 但不能运行
(function () {
    //compileFileToCss();
    compileTextToCss();
    /**
     * compile and compileAsync take a path to a Sass file and return the
     * result of compiling that file to CSS.
     */
    function compileFileToCss() {
        var result = sass.compile('../src/lesson2-en/08-css-rule.scss');
        console.log(result.css);
    }
    /**
     * compileString and compileStringAsync take a string that represents
     * the contents of a Sass file and return the result of
     * compiling that file to CSS.
     */
    function compileTextToCss() {
        return __awaiter(this, void 0, void 0, function () {
            var scss_str, result1, result2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scss_str = "\n\t\th1 {\n\t\t\t\t$v1:404px;\n\t\t\t\tfont-size: $v1;\n\t\t\t\tcode {\n\t\t\t\t\tfont-face: Roboto Mono;\n\t\t\t\t}\n\t\t\t}\n\t\t";
                        result1 = sass.compileString(scss_str);
                        return [4 /*yield*/, sass.compileStringAsync(scss_str)];
                    case 1:
                        result2 = _a.sent();
                        console.log(result1.css, result1.css == result2.css);
                        return [2 /*return*/];
                }
            });
        });
    }
})();
