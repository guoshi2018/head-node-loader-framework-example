"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sass = require('sass');
(() => {
    compileTextToCss();
    function compileFileToCss() {
        const result = sass.compile('../src/lesson2-en/08-css-rule.scss');
        console.log(result.css);
    }
    function compileTextToCss() {
        return __awaiter(this, void 0, void 0, function* () {
            const scss_str = `
		h1 {
				$v1:404px;
				font-size: $v1;
				code {
					font-face: Roboto Mono;
				}
			}
		`;
            const result1 = sass.compileString(scss_str);
            const result2 = yield sass.compileStringAsync(scss_str);
            console.log(result1.css, result1.css == result2.css);
        });
    }
})();
//# sourceMappingURL=01.js.map