PageResourceLoader.getInstance().startEntry({

	//globalRes: 默认包含必要脚本的文件 '/lib/script/json/global.json',一般不用修改
	//globalRes: null, // 或 空字符串 '' 或 输入路劲不存在, 则放弃公共先决资源文件的加载

	//是否启用调试
	debug: true, //默认false

	//在此添加本入口文件需要包含的js css文件全路径,默认[]
	//页面用到的js文件列表的数组,排列顺序必须保证:组内无依赖关系,后面的组可依赖于前面的组,反之则不然
	//必要时,查看global.json(或在此指定的其替代文件), 以免重复加载(虽然自动忽略)
	privateRes: [
		[
			{ tag: "script", filepath: "/lib/script/js/indoor-lib/function/extensions/NumberExtensions.js", },
			{ tag: "script", filepath: "/lib/script/js/indoor-lib/function/extensions/ObjectExtensions.js", }
		],
		[{ tag: "script", filepath: "2.js", type: "module", defer: true, }],
		[{ tag: "script", filepath: "/lib/script/js/page/hybird/1-simple/another.js", }]
	],

	//业务主逻辑函数,默认hello,world,并打印当前的入口文件路径
	main: () => {
		//to do
		//window.scrollTo(0, document.body.clientHeight);

		//new SizeWatcher(".show-child-w", 'w');

		window.scrollTo(0, document.body.clientHeight);

		window.addEventListener('load', evt => {
			console.info('window loaded.........................');
		});


		temp();

		function temp() {
			console.log('temp called');
		}
	}
});


