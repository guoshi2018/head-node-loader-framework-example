


/*********************************************************************************************************
 * 页面的入口文件，是前端页面文件（例如cshtml或html）中唯一包含的<script >标签中，entry属性指定的js脚本文件
 * 
 * 使用方法：
 *      1、在前端页面文件末尾，加入以下标签（普通html页面，则不需要@section，其他类型的页面文件，请参考相关文档）：
				@section custom_javascript{ 
							 <script src="<jscss-loader.js文件的全路径>" entry="<本js文件的全路径>"></script>
				}      
 *      2、找到main方法中，按照提示写入代码。
 * 
* 调试完毕，可考虑将 true改为false, 以关闭加载的调试信息
* *******************************************************************************************************/
//// <reference path='/page/ts-type/indoor-core/jscss-loader.d.ts' />

JscssLoader.getInstance().startEntry({
	// 默认包含必要脚本的文件 '/lib/script/json/global.json',一般不用修改
	//null 或 空字符串 '' 或 输入路劲不存在, 则放弃公共先决资源文件的加载	
	globalRes: null,

	//是否启用调试
	debug: true, //默认false

	//在此添加本入口文件需要包含的js css文件全路径,默认[]
	//页面用到的js文件列表的数组,排列顺序必须保证:组内无依赖关系,后面的组可依赖于前面的组,反之则不然
	//必要时,查看global.json(或在此指定的其替代文件), 以免重复加载(虽然自动忽略)
	privateRes: [
		[
			'/page/lesson/3-mdn-web-docs/01-mutation-observer/index.css',
		]
	],

	//业务主逻辑函数,默认hello,world,并打印当前的入口文件路径
	main: () => {
		//to do
		demo1();

		function demo1() {
			const MutationObserver = window.MutationObserver;// || window.WebKitMutationObserver || window.MozMutationObserver;
			// target
			const list = document.querySelector(`ol`);
			if (null != list) {
				// options
				const config = {
					attributes: true,
					childList: true,
					characterData: true,
					subtree: true,
				};
				const callback = (mutations: MutationRecord[], observer: MutationObserver) => {
					// console.log(`mutations =`, mutations); // MutationRecord
					mutations.forEach(function (mutation) {
						// console.log("mutation =", mutation);
						if (mutation.type === "characterData") {
							// mutation.target & object === typeof(mutation.target)
							// console.log("A child node has been added OR removed.", mutation.target, typeof(mutation.target));
							// console.log("[...mutation.addedNodes].length", [...mutation.addedNodes].length);
							// console.log("[...mutation.removedNodes].length", [...mutation.removedNodes].length);
							// if (mutation.target && [...mutation.addedNodes].length) {
							//     // [...mutation.addedNodes].length
							//     console.log(`A child node ${mutation.target} has been added!`, mutation.target);
							// }
							// if (mutation.target && [...mutation.removedNodes].length) {
							//     // [...mutation.removedNodes].length
							//     console.log(`A child node ${mutation.target} has been removed!`, mutation.target);
							// }
						}
						if (mutation.type === "childList") {
							if (mutation.target && mutation.addedNodes.length) {
								console.log(`At least one child node ${mutation.target} has been added!`, mutation.target);
							}
							if (mutation.target && mutation.removedNodes.length) {
								console.log(`At least one child node ${mutation.target} has been removed!`, mutation.target);
							}

							// do somwthings
							let list_values = new Array<string>();
							for (let i = 0; i < list.children.length; i++) {
								const ele = list.children.item(i);
								if (null != ele) {
									list_values.push(ele.innerHTML);
								}
							}

							// list_values = [].slice.call(list.children).map(function (node) {
							// 	return node.innerHTML;
							// })
							// .filter(function (str) {
							// 	if (str === "<br>") {
							// 		return false;
							// 	} else {
							// 		return true;
							// 	}
							// });
							//.filter(str => str !== "<br>");


							console.log(list_values);
						}
						if (mutation.type === "attributes") {
							console.log("mutation =", mutation);
							console.log(`The \`${mutation.attributeName}\` attribute was modified.`);
							// console.log("list style =", list.style);
							let {
								left,
								top,
								width,
								height,
							} = list.style;
							let style = {
								left,
								top,
								width,
								height
							};
							console.log("style =\n", JSON.stringify(style, null, 4));
						}
					});
				};
				// instance
				const observer = new MutationObserver(callback);
				observer.observe(list, config);
				// Later, you can stop observing
				// setTimeout(() => {
				//     observer.disconnect();
				// }, 1000 * 100);
				// bug ??? after disconnect
				// list.attributes;
				// list.setAttribute(`style`, `height: 212px; width: 213px;`);
				// list.setAttribute(`data-test`, `666`);
				// list.removeAttribute(`data-test`);
				// list.children;
				// list.childElementCount;
				// list.childNodes;
				// list.hasChildNodes();
				// list.firstElementChild;
				// list.firstChild;
				// list.removeChild(li);
				// list.removeChild(list.firstElementChild);
				// list.replaceChild(li, li);
				// list.replaceChild(list.firstElementChild, list.lastElementChild);

				setTimeout(() => {
					const restMutations = observer.takeRecords()
					if (restMutations.length > 0) {
						console.log('some changes are not be handled.....')
						callback(restMutations, observer);
					} else {
						console.log('no change rest');
					}
					observer.disconnect();
				}, 5000);
			}
		}

	}
});
