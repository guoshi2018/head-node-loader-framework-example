
/**
 * version 1.0, 支持各种可使用 script link 标签加载的资源文件(包括但不限于 js css),
 * 并支援他们所有可能需要的属性, 例如 async mode type 等,
 * 作为 jscss-loader 的替代
 * 遗留问题: 和 jscss-loader 一样, 这样加载资源完成后, 能否监听 window.onload 事件.
 * 和服务器有关.
 */


//#region 类型定义

/**
 * 表示文档、文件或字节流的性质和格式
 * https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types
 */
type _HtmlMime_ =
	"text/plain" | "text/html" | "text/css" | "text/javascript" | "module" |

	"image/gif" | "image/jpeg" | "image/png" | "image/bmp" | "image/webp" | "image/x-icon" |
	"image/vnd.microsoft.icon" | "image/svg+xml" |

	"audio/midi" | "audio/mpeg" | "audio/webm" | "audio/ogg" | "audio/wav" | "audio/wave" |
	"audio/x-wav" | "audio/x-pn-wav" | "" |

	"video/mp4" | "video/webm" | "video/ogg" |

	"application/pkcs12" | "application/json" | "application/vnd.mspowerpoint" |
	"application/xhtml+xml" | "application/xml" | "application/pdf" | "application/ogg" |
	"application/javascript" | "application/ecmascript" | "application/octet-stream" |
	"application/x-rar-compressed" |

	"multipart/form-data" | "multipart/byteranges" | "multipart/byteranges";

/**
 * link 和 script 资源的综合描述
 * link 型资源描述: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link
 * script 型资源描述: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script
 */
type _ResourceDescriptor_ = {

	// 公共部分
	tag: "link" | "script";
	/**
	 * 用于填写 link 的 href, 或者 script 的 src, 两者只能局其一
	 */
	filepath: string;
	/**
	 * 新添加标签是否位于最后,默认为false,即在最后一个标签前顺次插入
	 * 这主要是为了保证主js文件位于标签链的末端,然后才可以访问其余js文件
	 */
	atLast?: boolean,
	crossorigin?: "anonymous" | "use-credentials";
	integrity?: string;
	referrerpolicy?: "no-referrer" | "no-referrer-when-downgrade" | "origin"
	| "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin"
	| "unsafe-url";
	type?: _HtmlMime_;

	// link 部分
	/**
	 * default to stylesheet
	 */
	rel?: string;
	as?: "audio" | "document" | "embed" | "fetch" | "font"
	| "image" | "object" | "script" | "style" | "track" | "video" | "worker";
	disabled?: boolean;
	hreflang?: string;
	importance?: "auto" | "high" | "low";
	media?: string;
	sizes?: string;
	title?: string;
	methods?: string;
	prefetch?: string;
	target?: string;

	// 以下是 script 部分
	text?: string;
	async?: boolean;
	defer?: boolean;
	nomodule?: boolean;
	nonce?: string;
};


/**
 * 加载结果类型
 */
type _ResourceLoadResult_ = {
	node?: HTMLScriptElement | HTMLLinkElement;
	/**
	 * 错误码, 未发生错误则为0
	 */
	error: number,
	/**
	 * 描述本次加载结果的消息
	 */
	message: string,
};

/**
 * 资源信息, 包含资源描述, 资源加载选项, 资源加载结果
 */
type _ResourceInfomation_ = {
	descriptor: _ResourceDescriptor_;
	loadResult?: _ResourceLoadResult_;
	/**
	 * 保留字段, 备用
	 */
	reserve?: any;
};

/**
 * 资源加载结果的简要说明
 */
type _BriefResourceLoadResult_ = {
	filepath: string;
	message: string;
};

/**
 * 入口文件选项
 */
type _ClientEntryOptions_ = {
	/**
	 * 负责加载必须的公共先决资源文件的脚本文件,可以以此替换run方法参数指定的json文件路径
	 */
	globalRes?: string | null,
	/**
	 * 是否启用调试, 默认不启用
	 */
	debug?: boolean,
	/**
	 * 入口文件运行必须的特有的资源数组,默认没有
	 */
	privateRes?: Array<Array<_ResourceDescriptor_>>,
	/**
	 * 入口文件包含的业务逻辑函数
	 */
	main?: () => void
};

//#endregion

/**
 * html 页面资源加载器, 支援 script 和 link 两类资源(包括但不限于 js css)
 * 并支援他们所有可能需要的属性, 例如 async mode type 等,
 * 用法:
 * 	1. script: filepath="..." tag="script" 必须, 其余(例如 type="module" async defer) 可选
 * 	2. 用于 css 的 link: filepath="..." tag="link" rel="stylesheet" 必须, 其余可选 
 */
class PageResourceLoader {
	/**
	 * 版本号, 该版本号与文件名的关系: filename = jscss-loader{version}.ts
	 */
	public static version: string = "1.0";
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
	private static _instance = new PageResourceLoader();
	/**
	 * 私有构造器, 以实现singleton模式
	 */
	private constructor() {
		this._attemptedResources = [];
	}

	/**
	 * 记录已经尝试加载过(不论成功与否)的资源, 以便紧接在main方法调用前, 移除才不至于影响运行
	 */
	private _attemptedResources: Array<_ResourceInfomation_>;

	/**
	 * 获取加载成功的资源简要说明数组
	 */
	public get briefsOfSuccessfulResource(): Array<_BriefResourceLoadResult_> {
		return this._attemptedResources.filter(info => info.loadResult?.error == 0)
			.map(info => {
				return {
					filepath: info.descriptor.filepath,
					message: info.loadResult?.message,
				} as _BriefResourceLoadResult_;
			});
	}

	/**
	 * 获取加载失败的资源简要说明数组
	 */
	public get briefsOfFailedResourceBrief(): Array<_BriefResourceLoadResult_> {
		return this._attemptedResources.filter(info => info.loadResult?.error != 0)
			.map(info => {
				return {
					filepath: info.descriptor.filepath,
					message: info.loadResult?.message,
				} as _BriefResourceLoadResult_;
			});
	}

	/**
	 * 当前的入口文件路径
	 */
	private _currentEntry: string = '';

	/**
	 * 考虑到asp.net core WebAssembly等框架, 在jscss-loader.ts加载脚本的同时,可能会
	 * 生成并添加一些脚本(例如style),为保证jscss-loader加载的其他js脚本位于入口脚本之前
	 */
	private _clientEntryNode?: HTMLScriptElement | HTMLLinkElement;

	/**
	 * 默认的包含全局资源路径的json文件.
	 * undefined 或 空字符串 '' 或 路径不存在,则放弃公共先决资源文件的加载
	 */
	private _globalResDefault?: string;

	/**
	 * 获取唯一实例
	 * @returns 唯一实例
	 */
	public static getInstance() {
		return PageResourceLoader._instance;
	}

	/**
* 逐组加载资源文件,各个组内的资源应不存在依赖关系,
* 但第2组可依赖于第1组,第3组可依赖于第2组,以此类推
* @param resGroups 各个资源数组构成的数组
* @param debug 是否打印加载成功信息,默认不打印
*/
	private async _loadResourceGroups(resGroups: Array<Array<_ResourceInfomation_>>, debug?: boolean) {

		// forEach内部是异步执行,故为保证逐个资源组顺序加载,必须采用for循环
		for (let i = 0; i < resGroups.length; i++) {	//逐组加载
			//对于一个组内的资源文件, 不存在依赖关系, 所以可以作为一个Promise来解决
			const result = await Promise.allSettled(this._loadResources(resGroups[i]));
			//调试状态,则逐个打印加载结果
			debug && console.log('resources loaded :', result);
		}
	}

	/**
	 * 批量加载资源
	 * @param resinfos 描述加载的资源信息数组
	 * @returns 结果为加载结果的Promise对象为元素的数组
	 */
	public _loadResources(resinfos: Array<_ResourceInfomation_>): Array<Promise<_ResourceLoadResult_>> {
		const proms: Array<Promise<_ResourceLoadResult_>> = [];
		resinfos.forEach(async ri => {
			proms.push(this._loadResource(ri));
		})
		return proms;
	}

	private _isAttemped(resInfo: _ResourceInfomation_) {
		return this._attemptedResources.findIndex(
			ri => ri.descriptor.tag == resInfo.descriptor.tag
				&& ri.descriptor.filepath == resInfo.descriptor.filepath) != -1;
	}


	/**
	 * 加载单一的资源文件(仅限于css,js, 其余文件类型被忽略))
	 * @param arg 如果是字符串,将以此代表文件路径,创建描述加载的资源文件的选项对象
	 * @returns 包含加载结果的promise对象
	 */
	private _loadResource(resinfo: _ResourceInfomation_)
		: Promise<_ResourceLoadResult_> {

		return new Promise((resolve, reject) => {
			let node: HTMLScriptElement | HTMLLinkElement;
			if (!this._isAttemped(resinfo)) {
				// 因为是强类型检查 'link' / 'script' 标签, 在 ts 下, 不会出现其他标签
				const isLink = resinfo.descriptor.tag == "link";
				node = document.createElement(isLink ? 'link' : 'script');
				Object.assign(node, resinfo.descriptor)
				//@ts-ignore
				node[isLink ? "href" : "src"] = resinfo.descriptor.filepath;

				if (resinfo.descriptor.atLast || !document.head.hasChildNodes()) {
					document.head.appendChild(node);
					this._clientEntryNode = node;
				} else {
					//console.log('currLast:', this._clientEntryNode, ' node:', node);
					this._clientEntryNode?.before(node);
				}
				this._attemptedResources.push(resinfo);

				node.addEventListener('load',
					function (this: HTMLScriptElement | HTMLLinkElement, evt: Event) {
						const succ = {
							node: this,
							error: 0,
							message: "loaded successfully",
						} as _ResourceLoadResult_;
						resinfo.loadResult = succ;
						resolve(succ);	//成功
					});
				node.addEventListener('error',
					function (this: HTMLScriptElement | HTMLLinkElement, evt: Event) {
						const fail = {
							node: this,
							error: 103,
							message: "An unexpected error has occurred while loading.",
						} as _ResourceLoadResult_; //错误,例如文件不存在
						resinfo.loadResult = fail;
						reject(fail);
					});

				//如果上述'load'或'error'事件在this._timeout定义的时限内被成功监听,
				//则下面的超时丢弃将不被引发
				setTimeout(() => {
					const fail = {
						node,
						error: 104,
						message: "sorry, load timeout",
					} as _ResourceLoadResult_;
					resinfo.loadResult = fail;
					reject(fail);
				}, this._timeout);		//超时
			} else {
				const fail = {
					error: 102,
					message: "the file doesnot need be loaded twice.",
				} as _ResourceLoadResult_;//二次加载
				resinfo.loadResult = fail;
				reject(fail);
			}
		}) as Promise<_ResourceLoadResult_>;
	}

	/**
	 * 当前页面加载完成的事件回调
	 */
	private _start() {
		//把查找范围扩大到整个html
		let ele_jss = document.getElementsByTagName('script');
		for (let i = 0; i < ele_jss.length; i++) {
			let src = ele_jss[i].src;
			let idx = src.lastIndexOf(`page-resource-loader${PageResourceLoader.version}.js`);
			if (idx != -1) {

				// 由于全局的json配置文件位置相对于 page-resource-loader.t(j)s, 所以有必要先获取
				// page-resource-loader.t(j)s 在实际的 html 中的位置
				this._globalResDefault = `${src.slice(0, idx)}${this._globalResDefault}`;
				const node = ele_jss[i];
				// page-resource-loader.js 当然已经加载成功:
				this._attemptedResources.push({ //记录好,以备最后在main方法中移除
					descriptor: {
						tag: "script",
						filepath: src,
					},
					loadResult: {
						node,
						error: 0,
						message: "加载成功",
					}
				} as _ResourceInfomation_);

				//定位入口文件,并加载
				//const entrynode = node.attributes.entry;
				const entrynode = node.getAttributeNode("entry");
				if (entrynode?.value) {  //找到属性值,作为start.js的全路径
					this._currentEntry = entrynode.value;

					this._loadResource({
						descriptor: {
							tag: "script",
							filepath: entrynode.value,
							atLast: true,		//入口文件必须位于最后							
						}
					} as _ResourceInfomation_);
				}
				break;
			}
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
	public async startEntry(options?: _ClientEntryOptions_) {
		//合并各字段的默认值(如果未提供)
		const opt: _ClientEntryOptions_ = Object.assign({
			globalRes: this._globalResDefault,
			debug: false,
			privateRes: [],
			main: () => {
				console.log(`hello,world.This is ${this._currentEntry}`);
				console.log("success files:", this.briefsOfSuccessfulResource);
				this.briefsOfFailedResourceBrief.length > 0 &&
					console.log("failed files:", this.briefsOfFailedResourceBrief);
			}
		}, options);

		let descGroups: Array<Array<_ResourceDescriptor_>>;

		try {
			//获取globalRes指定的文件记载的所有js/css文件列表(数组的数组)
			const requ = new Request(opt.globalRes || '');
			const resp = await fetch(requ);
			descGroups = (await resp.json()).descriptors as Array<Array<_ResourceDescriptor_>>;
		} catch (e) {
			descGroups = [[]];
		}

		//逐组加入私有资源组
		descGroups.push(...(opt.privateRes || []));

		const rescInfoGroups: Array<Array<_ResourceInfomation_>> = [];
		descGroups.forEach(dg => {
			const rig = dg.map(d => {
				return {
					descriptor: d,
				} as _ResourceInfomation_;
			});
			rescInfoGroups.push(rig);
		});
		//按顺序加载当前入口文件需要的资源文件, 逐组加载
		await this._loadResourceGroups(rescInfoGroups, opt.debug);

		//非调试状态, 则移除所有加载的js节点, 并不影响程序的运行
		!opt.debug && this._attemptedResources
			.filter(ri => ri.descriptor.tag == "script"
				&& ri.loadResult?.error == 0)
			.forEach(ri => ri.loadResult?.node?.remove());

		//执行主要逻辑
		opt.main && opt.main();
	}
	/**
	 * 运行加载器
	 * @param globalResDefault 默认的包含全局资源路径的json文件, 可以是绝对/相对
	 * (相对于 page-resource-loader 文件)路径, undefined 或空字符串 '' 或 路径不存在,
	 * 则不指定公共先决资源文件. 然而不论此处指定与否, 入口文件调用startEntry方法时, 还可重新指定
	 * @param timeout 加载资源文件,如果超过该时限还监听不到'load'或'error'事件,则判断为超时错误
	 */
	public run(globalResDefault?: string, timeout?: number) {
		if (globalResDefault?.startsWith('/')) {
			globalResDefault = globalResDefault.slice(1);
		}
		this._globalResDefault = globalResDefault;
		this._timeout = timeout || PageResourceLoader._defaultTimeout;
		// if (window.addEventListener) {
		// 	window.addEventListener('load', this._start.bind(this));
		// } else {
		// 	console.log('找不到window的load监听方法!!');
		// }
		// 直接加载, 不等待 window.onload 了.
		this._start();
	}
}

//PageResourceLoader.getInstance().run('/lib/script/json/global.json', 5050);
/**
 * json 文件可以使绝对/相对(相对于 page-resource-loader 文件)路径
 */
PageResourceLoader.getInstance().run('json/global.json', 5050);


/*
		推荐配置如下,注意保证 json 全局配置复制到 dist/js 对应目录: resolveJsonModule=true
*/
// {
//   "compilerOptions": {
//     "removeComments": true,
//     "outDir": "lib/script/js",
//     //"allowJs": true,
//     "target": "ES2015",
//     //"module": "ESNext",
//     "strict": true,
//     "importHelpers": true,
//     "moduleResolution": "Node",
//     //"inlineSourceMap": true,
//     "sourceMap": true,
//     "skipLibCheck": true,
//     "resolveJsonModule": true,
//   },
//   "include": [
//     //其他自定义的.d.ts文件,务必位于lib/script/ts目录下,否则很麻烦
//     "lib/script/ts/**/*.ts",
// 		 "lib/script/ts/jscss-loader/**/*.json",
//   ],
// }









