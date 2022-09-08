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
/**
 * js,css文件加载器
 * v1.1:在v1.0的基础上，
 *      1. 使用JscssLoader封装 ,故调用与1.0版本有区别，在于需使用前缀 JscssLoader.
 *      2. 使用正则表达式检测js css 文件的格式,以便带参数
 * */
class JscssLoader {
    /**
     * 私有构造器, 以实现singleton模式
     */
    constructor() {
        /**
         * 加载完成的文件路径列表
         */
        this._loadedFilePaths = [];
        /**
         * 当前的入口文件路径
         */
        this._currentEntry = '';
        this._loadedJsnodes = [];
    }
    get loadedFilePaths() {
        return this._loadedFilePaths;
    }
    /**
     * 获取唯一实例
     * @returns 唯一实例
     */
    static getInstance() {
        return JscssLoader._instance;
    }
    /**
     * 批量加载资源文件(仅限于css,js, 其余文件类型被忽略)
     * @param arg 描述加载的资源文件的选项对象数组或字符串数组.如果是字符串数组
     * @returns 结果为加载结果的Promise对象为元素的数组
     */
    loadResources(arg) {
        const results = [];
        arg.forEach((ar) => __awaiter(this, void 0, void 0, function* () {
            results.push(this._loadResource(ar));
        }));
        return results;
    }
    /**
     * 加载单一的资源文件(仅限于css,js, 其余文件类型被忽略))
     * @param arg 如果是字符串,将以此代表文件路径,创建描述加载的资源文件的选项对象
     * @returns 包含加载结果的promise对象
     */
    _loadResource(arg) {
        let opt = {
            filepath: '',
        };
        if (typeof arg == 'string') {
            opt.filepath = arg;
        }
        else {
            opt = arg;
        }
        return new Promise((resolve, reject) => {
            var _a;
            let node;
            if (!this._loadedFilePaths.includes(opt.filepath)) {
                if (/\.js$/i.test(opt.filepath)) {
                    node = document.createElement('script');
                    if (node) {
                        node.type = 'text/javascript';
                        node.src = opt.filepath;
                        //js_node.charset = 'UTF-8';						
                    }
                }
                else if (/\.css$/i.test(opt.filepath)) { //styel节点移除后样式就失效
                    node = document.createElement('link');
                    if (node) {
                        node.type = 'text/css';
                        node.href = opt.filepath;
                        node.rel = 'stylesheet';
                        //css_node.charset = 'UTF-8';						
                    }
                }
                else {
                    reject({
                        error: 101,
                        message: "invalid file type cannot be loaded.",
                        filepath: opt.filepath,
                    }); //非法类型
                }
            }
            else {
                reject({
                    error: 102,
                    message: "the file doesnot need be loaded twice.",
                    filepath: opt.filepath,
                }); //二次加载
            }
            if (node) {
                node.addEventListener('load', function () {
                    resolve({
                        error: 0,
                        message: "loaded successfully",
                        filepath: opt.filepath,
                    }); //成功
                });
                node.addEventListener('error', function (evt) {
                    reject({
                        error: 103,
                        message: "An unexpected error has occurred while loading.",
                        filepath: opt.filepath,
                    }); //错误,例如文件不存在
                });
                if (opt.atLast || !document.head.hasChildNodes()) {
                    document.head.appendChild(node);
                    this._lastJsnode = node;
                }
                else {
                    //console.log('currLast:', this._lastJsnode, ' node:', node);
                    (_a = this._lastJsnode) === null || _a === void 0 ? void 0 : _a.before(node);
                }
                this._loadedFilePaths.push(opt.filepath);
                node.type == 'text/javascript' && this._loadedJsnodes.push(node);
                //如果上述'load'或'error'事件在this._timeout定义的时限内被成功监听,
                //则下面的超时丢弃将不被引发
                setTimeout(() => {
                    reject({
                        error: 104,
                        message: "sorry, load timeout",
                        filepath: opt.filepath,
                    });
                }, this._timeout); //超时
            }
            else {
                reject({
                    error: 105,
                    message: "failed to create node",
                    filepath: opt.filepath,
                }); //失败
            }
        });
    }
    /**
     * 当前页面加载完成的事件回调
     */
    _onWindowLoaded_() {
        return __awaiter(this, void 0, void 0, function* () {
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
                    if (entrynode === null || entrynode === void 0 ? void 0 : entrynode.value) { //找到属性值,作为start.js的全路径
                        this._currentEntry = entrynode.value;
                        //入口文件的加载,始终不打印
                        yield this._loadResource({
                            filepath: entrynode.value,
                            atLast: true, //入口文件必须位于最后
                        });
                        break;
                    }
                }
            }
        });
    }
    /**
     * 逐组加载资源文件,各个组内的资源应不存在依赖关系,
     * 但第2组可依赖于第1组,第3组可依赖于第2组,以此类推
     * @param resGroups 各个资源文件数组构成的数组
     * @param debug 是否打印加载成功信息,默认不打印
     */
    _loadResGroups(resGroups, debug) {
        return __awaiter(this, void 0, void 0, function* () {
            // forEach内部是异步执行,故为保证逐个资源组顺序加载,必须采用for循环	
            for (let i = 0; i < resGroups.length; i++) { //逐组加载
                //对于一个组内的资源文件, 不存在依赖关系, 所以可以作为一个Promise来解决
                const result = yield Promise.allSettled(this.loadResources(resGroups[i]));
                //调试状态,则逐个打印加载结果
                debug && console.log('resources loaded :', result);
            }
        });
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
    startEntry(options) {
        return __awaiter(this, void 0, void 0, function* () {
            //合并各字段的默认值(如果未提供)
            const opt = Object.assign({
                globalRes: this._globalResDefault,
                debug: false,
                privateRes: [],
                main: () => {
                    console.log(`hello,world.This is ${this._currentEntry}.loaded files:`, this._loadedFilePaths);
                }
            }, options);
            let resGroups;
            try {
                //获取globalRes指定的文件记载的所有js文件列表(数组的数组)
                const requ = new Request(opt.globalRes || '');
                const resp = yield fetch(requ);
                resGroups = (yield resp.json()).paths;
            }
            catch (e) {
                resGroups = [];
            }
            //逐组加入私有资源组
            resGroups.push(...(opt.privateRes || []));
            //按顺序加载当前入口文件需要的资源文件, 逐组加载
            yield this._loadResGroups(resGroups, opt.debug);
            //非调试状态, 则移除所有加载的js节点, 并不影响程序的运行
            !opt.debug && this._loadedJsnodes.forEach(jsnode => jsnode.remove());
            //执行主要逻辑
            opt.main && opt.main();
        });
    }
    /**
     * 运行加载器
     * @param globalResDefault 默认的包含全局资源路径的json文件
     *      undefined 或 null 或 空字符串 '' 或 路径不存在,则不指定公共先决资源文件.
     *      然而不论此处指定与否, 入口文件调用startEntry方法时, 还可重新指定
     * @param timeout 加载资源文件,如果超过该时限还监听不到'load'或'error'事件,则判断为超时错误
     */
    run(globalResDefault, timeout) {
        this._globalResDefault = globalResDefault;
        this._timeout = timeout || JscssLoader._defaultTimeout;
        if (window.addEventListener) {
            window.addEventListener('load', this._onWindowLoaded_.bind(this));
        }
        else {
            console.log('找不到window的load监听方法');
        }
    }
}
/**
 * 默认超时:3000毫秒
 */
JscssLoader._defaultTimeout = 3000;
/**
 * 加载器的唯一实例(针对一个html页面)
 */
JscssLoader._instance = new JscssLoader();
JscssLoader.getInstance().run('/lib/script/json/global.json', 5050);
//# sourceMappingURL=jscss-loader.js.map