
/**
 * 加载选项
 */
type _LoaderOptions_ = {
	/**
	 * 要加载的文件的全路径(或相对于宿主html的路径)名称  
	 */
	filepath: string,
	/**
	 * 本次加载是否启用调试. 在调试模式下, 控制台将显示文件加载的详细信息
	 */
	debug?: boolean,
	/**
	 * 新添加标签是否位于最后,默认为false,即在最后一个标签前顺次插入
	 * 这主要是为了保证主js文件位于标签链的末端,然后才可以访问其余js文件
	 */
	atLast?: boolean,
	/**
	 * 保留字段
	 */
	reserve?: any,
}

/**
 * 加载结果类型
 */
type _LoadResult_ = {
	/**
	 * 错误码, 未发生错误则为0
	 */
	error: number,
	/**
	 * 描述本次加载结果的消息
	 */
	message: string,
	/**
	 * 当前加载的文件的全路径(或相对于宿主html的路径)名称
	 */
	filepath: string,
	/**
	 * 保留字段
	 */
	reserve?: any,
}



/**
 * 入口文件选项
 */
type EntryOptions = {
	/**
	 * 负责加载必须的公共先决资源文件的脚本文件,可以以此替换run方法参数指定的json文件路径
	 */
	globalRes?: string | null,
	/**
	 * 是否启用调试, 默认不启用
	 */
	debug?: boolean,
	/**
	 * 入口文件运行必须的特有的资源文件的路径数组,默认没有
	 */
	privateRes?: Array<string[]>,
	/**
	 * 入口文件包含的业务逻辑函数
	 */
	main?: () => void
};

/**
 * js,css文件加载器
 * v1.1:在v1.0的基础上，
 *      1. 使用JscssLoader封装 ,故调用与1.0版本有区别，在于需使用前缀 JscssLoader.
 *      2. 使用正则表达式检测js css 文件的格式,以便带参数
 * */
class JscssLoader {
	/**
 * 加载资源文件,如果超过该时限还监听不到'load'或'error'事件,则判断为超时错误
 */
	private _timeout?: number;

	/**
	 * 默认超时:3000毫秒
	 */
	private static _defaultTimeout = 3000;

	/**
	 * 加载器的唯一实例(针对一个html页面)
	 */
	private static _instance = new JscssLoader();
	/**
	 * 私有构造器, 以实现singleton模式
	 */
	private constructor() {
		this._loadedJsnodes = [];
	}
	/**
	 * 加载完成的文件路径列表
	 */
	private _loadedFilePaths: string[] = [];
	public get loadedFilePaths() {
		return this._loadedFilePaths;
	}

	/**
	 * 当前的入口文件路径
	 */
	private _currentEntry: string = '';

	/**
	 * 考虑到asp.net core WebAssembly等框架, 在jscss-loader.ts加载脚本的同时,可能会
	 * 生成并添加一些脚本(例如style),为保证jscss-loader加载的其他js脚本位于入口脚本之前,
	 * 
	 */
	private _lastJsnode?: HTMLScriptElement | HTMLLinkElement;

	/**
	 * 记录已经加载完成的javascrirpt 节点, 以便紧接在main方法调用前, 移除才不至于影响运行
	 */
	private _loadedJsnodes: HTMLScriptElement[];

	/**
	 * 默认的包含全局资源路径的json文件.
	 * undefined 或 null 或 空字符串 '' 或 路径不存在,则放弃公共先决资源文件的加载
	 */
	private _globalResDefault?: string | null;

	/**
	 * 获取唯一实例
	 * @returns 唯一实例
	 */
	public static getInstance() {
		return JscssLoader._instance;
	}

	/**
	 * 批量加载资源文件(仅限于css,js, 其余文件类型被忽略)
	 * @param arg 描述加载的资源文件的选项对象数组或字符串数组.如果是字符串数组
	 * @returns 结果为加载结果的Promise对象为元素的数组
	 */
	public loadResources(arg: string[] | _LoaderOptions_[]): Array<Promise<_LoadResult_>> {
		const results: Array<Promise<_LoadResult_>> = [];
		arg.forEach(async ar => {
			results.push(this._loadResource(ar));
		})
		return results;
	}

	/**
	 * 加载单一的资源文件(仅限于css,js, 其余文件类型被忽略))
	 * @param arg 如果是字符串,将以此代表文件路径,创建描述加载的资源文件的选项对象
	 * @returns 包含加载结果的promise对象
	 */
	private _loadResource(arg: string | _LoaderOptions_)
		: Promise<_LoadResult_> {
		let opt: _LoaderOptions_ = {
			filepath: '',
		};
		if (typeof arg == 'string') {
			opt.filepath = arg;
		} else {
			opt = arg;
		}

		return new Promise((resolve, reject) => {
			let node: HTMLScriptElement | HTMLLinkElement | undefined;
			if (!this._loadedFilePaths.includes(opt.filepath)) {
				if (/\.js$/i.test(opt.filepath)) {
					node = document.createElement('script');
					if (node) {
						node.type = 'text/javascript';
						node.src = opt.filepath;
						//js_node.charset = 'UTF-8';						
					}
				} else if (/\.css$/i.test(opt.filepath)) { //styel节点移除后样式就失效
					node = document.createElement('link');
					if (node) {
						node.type = 'text/css';
						node.href = opt.filepath;
						node.rel = 'stylesheet';
						//css_node.charset = 'UTF-8';						
					}
				} else {
					reject({
						error: 101,
						message: "invalid file type cannot be loaded.",
						filepath: opt.filepath,
					} as _LoadResult_); //非法类型
				}
			} else {
				reject({
					error: 102,
					message: "the file doesnot need be loaded twice.",
					filepath: opt.filepath,
				} as _LoadResult_);//二次加载
			}

			if (node) {
				node.addEventListener('load',
					function (this: HTMLScriptElement | HTMLLinkElement /*,evt: Event*/) {
						resolve({
							error: 0,
							message: "loaded successfully",
							filepath: opt.filepath,
						} as _LoadResult_);	//成功

					});
				node.addEventListener('error',
					function (evt: Event) {
						reject({
							error: 103,
							message: "An unexpected error has occurred while loading.",
							filepath: opt.filepath,
						} as _LoadResult_); //错误,例如文件不存在
					});

				if (opt.atLast || !document.head.hasChildNodes()) {
					document.head.appendChild(node);
					this._lastJsnode = node;
				} else {
					//console.log('currLast:', this._lastJsnode, ' node:', node);
					this._lastJsnode?.before(node);
				}
				this._loadedFilePaths.push(opt.filepath);
				node.type == 'text/javascript' && this._loadedJsnodes.push(node as HTMLScriptElement);

				//如果上述'load'或'error'事件在this._timeout定义的时限内被成功监听,
				//则下面的超时丢弃将不被引发
				setTimeout(() => {
					reject({
						error: 104,
						message: "sorry, load timeout",
						filepath: opt.filepath,
					} as _LoadResult_);
				}, this._timeout);		//超时
			} else {
				reject({
					error: 105,
					message: "failed to create node",
					filepath: opt.filepath,
				} as _LoadResult_); //失败
			}
		});
	}

	/**
	 * 当前页面加载完成的事件回调
	 */
	private async _onWindowLoaded_() {
		//把查找范围扩大到整个html
		let ele_jss = document.getElementsByTagName('script');
		for (let i = 0; i < ele_jss.length; i++) {
			let src = ele_jss[i].src;
			let idx = src.lastIndexOf('jscss-loader.js');
			if (idx != -1) {
				this._loadedFilePaths.push(src);
				const node = ele_jss[i];
				this._loadedJsnodes.push(node); //记录好,已被最后在main方法中移除

				//定位入口文件,并加载
				//const entrynode = node.attributes.entry;
				const entrynode = node.getAttributeNode("entry");
				if (entrynode?.value) {  //找到属性值,作为start.js的全路径
					this._currentEntry = entrynode.value;

					//入口文件的加载,始终不打印
					await this._loadResource({
						filepath: entrynode.value,
						atLast: true,		//入口文件必须位于最后
					} as _LoaderOptions_);
					break;
				}
			}
		}
	}

	/**
	 * 逐组加载资源文件,各个组内的资源应不存在依赖关系,
	 * 但第2组可依赖于第1组,第3组可依赖于第2组,以此类推
	 * @param resGroups 各个资源文件数组构成的数组
	 * @param debug 是否打印加载成功信息,默认不打印
	 */
	private async _loadResGroups(resGroups: Array<Array<string>>, debug?: boolean) {

		// forEach内部是异步执行,故为保证逐个资源组顺序加载,必须采用for循环	
		for (let i = 0; i < resGroups.length; i++) {	//逐组加载
			//对于一个组内的资源文件, 不存在依赖关系, 所以可以作为一个Promise来解决
			const result = await Promise.allSettled(this.loadResources(resGroups[i]));
			//调试状态,则逐个打印加载结果
			debug && console.log('resources loaded :', result);
		}
	}

	/**
	 * 运行入口方法, 由个入口文件调用, 详见示例
	 * @param options ,各字段默认值定义如下:
	 * 		1. globalRes: 
	 * 		    1) 有效的,良构的json文件路径, 则以此替换默认. 关于该json文件的schema, 可参看json/global.json
	 * 		    2) undefined, null 或 路径不存在(包括空字符串),或者空数组, 则放弃加载
	 * 		    3) 忽略此字段, 则使用run方法参数指定的json文件路径
	 * 		2. debug: 默认为false, 即不启用调试
	 * 		3. privateRes: 除了上述json文件指定的必须的全局资源外的任何资源, 默认为[]
	 * 		4. main: 业务逻辑函数, 默认为打印 hello,world,并提示当前的入口文件
	 */
	public async startEntry(options?: EntryOptions) {

		//合并各字段的默认值(如果未提供)
		const opt: EntryOptions = Object.assign({
			globalRes: this._globalResDefault,
			debug: false,
			privateRes: [],
			main: () => {
				console.log(`hello,world.This is ${this._currentEntry}.loaded files:`,
					this._loadedFilePaths);
			}
		}, options);

		let resGroups: Array<string[]>;

		try {
			//获取globalRes指定的文件记载的所有js文件列表(数组的数组)
			const requ = new Request(opt.globalRes || '');
			const resp = await fetch(requ);
			resGroups = (await resp.json()).paths as Array<string[]>;
		} catch (e) {
			resGroups = [];
		}

		//逐组加入私有资源组
		resGroups.push(...(opt.privateRes || []));

		//按顺序加载当前入口文件需要的资源文件, 逐组加载
		await this._loadResGroups(resGroups, opt.debug);

		//非调试状态, 则移除所有加载的js节点, 并不影响程序的运行
		!opt.debug && this._loadedJsnodes.forEach(jsnode => jsnode.remove());

		//执行主要逻辑
		opt.main && opt.main();
	}
	/**
	 * 运行加载器
	 * @param globalResDefault 默认的包含全局资源路径的json文件
	 *      undefined 或 null 或 空字符串 '' 或 路径不存在,则不指定公共先决资源文件.
	 *      然而不论此处指定与否, 入口文件调用startEntry方法时, 还可重新指定
	 * @param timeout 加载资源文件,如果超过该时限还监听不到'load'或'error'事件,则判断为超时错误
	 */
	public run(globalResDefault?: string | null, timeout?: number) {
		this._globalResDefault = globalResDefault;
		this._timeout = timeout || JscssLoader._defaultTimeout;
		if (window.addEventListener) {
			window.addEventListener('load', this._onWindowLoaded_.bind(this));
		} else {
			console.log('找不到window的load监听方法');
		}
	}
}

JscssLoader.getInstance().run('/lib/script/json/global.json', 5050);






