

// // import DescriptorFactory from "../../head-child-node-loader/core/descriptor-factory.class.js";



// // window.addEventListener('load', evt => {
// // 	console.log('head-child-node-loader testing started.');
// // 	demo1();
// // });


// // function demo1() {
// // 	const script1 = DescriptorFactory.createDescriptor({
// // 		src: "/page/hybird/2-head-child-node-test/temp/1.js",
// // 		//	tag: "script",

// // 	});
// // 	const script2 = DescriptorFactory.createDescriptor({
// // 		src: "/page/hybird/2-head-child-node-test/temp/2.js",
// // 		//	tag: "script",
// // 	});
// // 	const link1 = DescriptorFactory.createDescriptor({
// // 		href: "/page/hybird/2-head-child-node-test/temp/1.css",
// // 		tag: "link",
// // 	})
// // 	console.log(script1, script2, link1);
// // 	[script1, script2, link1].forEach(dr => dr.attachAsync());
// // }

// //------------------------------------------------------
import HeadChildNodeLoader from "../../head-child-node-loader/head-child-node-loader.js";

HeadChildNodeLoader.start({
	//abandonGlobal: true,
	release: true,
	localStuffs: [
		[
			{ tag: "link", href: "/lib/css/common.css", as: "image", title: 'link title' },
			{ href: "/lib/movie/cat.mp4", tag: "link", as: "document", sizes: "how old", timeout: 610, },
			{ tag: "link", href: "/lib/css/common.css", as: "image", title: 'link title234', importance: "high" },
			{ tag: "title", textContent: "动态指定的标题" },
		],
		[
			"/lib/image/jpg/12-adv-dom-oper/0386OT_Cocoa and OBjective-C Cookbookcov.jpg",
			"/lib/script/js/indoor-lib/class/effect-selector.js",
			"/lib/script/js/indoor-lib/class/effect-selector.js",
			{ tag: "link", href: "/lib/css/common.css", as: "audio", },
			// 指定 10 秒也超时, 说明无法加载到 head, 但会执行
			{ text: "console.log('this is text from script text attribute.(content script)');", timeout: 4000, },
			{ async: true, text: "console.log('this is text from script text attribute.(url script)');", timeout: 4000, },
			//	{ tag: "base", href: "https://www.baidu.com", target: "_blank" } as IBaseDescriptor,
			{ tag: "base", target: "_self" },
			{ tag: "meta", name: "apple-itunes-app", content: "app-id=987739104" },
			{ tag: "meta", name: "apple-itunes-app" },
			{ tag: "meta", content: "app-id=987739104" },
			{ tag: "title", textContent: "yes ok true is title" },
			{
				tag: "title",
				textContent: "<i style='color:blue;'>带有的标签,MDN说一律被忽略,其实是不被解析, 原样呈现</i>"
			},
			{ tag: "meta", httpEquiv: "content-security-policy" },
		]
	] as IAnyDescriptorOrString[][],
	entry: () => {
		console.log('entry called');

		window.addEventListener('load', evt => {
			console.log("当你看到这句话时, 说明还可以监听 window 的 load 事件!");
		})
	}

});


// function test1() {
// 	//console.log('...');
// 	interface Base {
// 		/**
// 		 * from Base
// 		 */
// 		name: string;

// 	}

// 	interface AAA extends Base {
// 		/**
// 		 * from AAA
// 		 */
// 		a1: number;
// 		/**
// 		 * from AAA
// 		 */
// 		a2: boolean;
// 	}
// 	interface BBB extends Base {
// 		/**
// 		 * from BBB
// 		 */
// 		b1: "hollo",
// 		/**
// 		 * from BBB
// 		 */
// 		b2: boolean;
// 		/**
// 		 * from BBB
// 		 */
// 		b3: string;
// 	}
// 	/**
// 	 * 各种借口之一
// 	 */
// 	type OneOfAB = AAA | BBB;

// 	function showIter(cany: OneOfAB[]) {
// 		console.log(cany);
// 		cany.forEach(c => {
// 			console.log(c, typeof c);
// 			const k: typeof c = { b1: "hollo", a2: false, a1: 23, name: 'willam' }
// 		})

// 	}

// 	showIter([
// 		{
// 			a1: 123, a2: true
// 		} as AAA, {
// 			b1: "hollo", b2: false, b3: 'hey', name: 'tity', a2: false
// 		}
// 	]);
// 	// const abc: abilty = {
// 	// 	name: "miniy", age: 19, beaty: false,tag:"hollo"
// 	// }
// 	const fish: AAA = { a1: 234, a2: true, name: 'fish' };
// 	console.log(fish, typeof fish);
// }
// function test2() {
// 	interface Person {
// 		name: string;
// 		age: number;
// 		location?: string;
// 	}

// 	const jack: Person = { name: 'jack', age: 100 };
// 	type Jack = typeof jack; // -> Person



// 	function foo(x: number): Array<number> {
// 		return [x];
// 	}

// 	type F = typeof foo; // -> (x: number) => number[]
// }
// function test3() {
// 	type AAA = {
// 		a1: number;
// 		b1?: never;
// 		c1?: never;
// 	};
// 	type BBB = {
// 		b1: boolean;
// 		a1?: never;
// 		c1?: never;
// 	};
// 	type CCC = {
// 		c1: string;
// 		a1?: never;
// 		b1?: never;
// 	}
// 	type ABC = AAA | BBB | CCC;
// 	const k: ABC[] = [
// 		{ b1: true,},
// 	]
// }
// function test4() {
// 	interface A{
// 		a: boolean;
// 	}
// 	interface B extends A{
// 		b1: string;
// 		b2: boolean;
// 	}
// 	interface C extends A{
// 		c1: number;
// 		c2: string;
// 	}
// 	type kb = keyof B;
// 	const s: kb = "a" || "b1" || "b2";
// }
//test1();
//test2();