// const a: number = 1;
// const s: string = 'hello,wolrd';
// console.log(a as unknown as string, s);


// import * as ppt from 'sass';
// console.log(ppt.SassNumber);

//这是一个commonJs,package.json需要设置好"type": "commonjs",或保持默认
const sass = require('sass'); //可以运行, 但不能感知
//import * as sass from 'sass'; //可以感知, 但不能运行


(() => {
	//compileFileToCss();
	compileTextToCss();


	/**
	 * compile and compileAsync take a path to a Sass file and return the
	 * result of compiling that file to CSS.
	 */
	function compileFileToCss() {
		const result = sass.compile('../src/lesson2-en/08-css-rule.scss');
		console.log(result.css);
	}

	/**
	 * compileString and compileStringAsync take a string that represents 
	 * the contents of a Sass file and return the result of 
	 * compiling that file to CSS.
	 */
	async function compileTextToCss() {
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
		const result2 = await sass.compileStringAsync(scss_str);
		console.log(result1.css, result1.css == result2.css);

	}


})();




