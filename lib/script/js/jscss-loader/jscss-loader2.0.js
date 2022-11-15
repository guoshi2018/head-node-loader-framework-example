"use strict";
class JscssLoader {
    constructor() {
        this._loadedFilePaths = [];
        this._currentEntry = '';
        this._loadedJsnodes = [];
    }
    get loadedFilePaths() {
        return this._loadedFilePaths;
    }
    static getInstance() {
        return JscssLoader._instance;
    }
    loadResources(arg) {
        const results = [];
        arg.forEach(async (ar) => {
            results.push(this._loadResource(ar));
        });
        return results;
    }
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
            let node;
            if (!this._loadedFilePaths.includes(opt.filepath)) {
                if (/\.js$/i.test(opt.filepath)) {
                    node = document.createElement('script');
                    if (node) {
                        node.type = 'text/javascript';
                        node.src = opt.filepath;
                    }
                }
                else if (/\.css$/i.test(opt.filepath)) {
                    node = document.createElement('link');
                    if (node) {
                        node.type = 'text/css';
                        node.href = opt.filepath;
                        node.rel = 'stylesheet';
                    }
                }
                else {
                    reject({
                        error: 101,
                        message: "invalid file type cannot be loaded.",
                        filepath: opt.filepath,
                    });
                }
            }
            else {
                reject({
                    error: 102,
                    message: "the file doesnot need be loaded twice.",
                    filepath: opt.filepath,
                });
            }
            if (node) {
                node.addEventListener('load', function () {
                    resolve({
                        error: 0,
                        message: "loaded successfully",
                        filepath: opt.filepath,
                    });
                });
                node.addEventListener('error', function (evt) {
                    reject({
                        error: 103,
                        message: "An unexpected error has occurred while loading.",
                        filepath: opt.filepath,
                    });
                });
                if (opt.atLast || !document.head.hasChildNodes()) {
                    document.head.appendChild(node);
                    this._lastJsnode = node;
                }
                else {
                    this._lastJsnode?.before(node);
                }
                this._loadedFilePaths.push(opt.filepath);
                node.type == 'text/javascript' && this._loadedJsnodes.push(node);
                setTimeout(() => {
                    reject({
                        error: 104,
                        message: "sorry, load timeout",
                        filepath: opt.filepath,
                    });
                }, this._timeout);
            }
            else {
                reject({
                    error: 105,
                    message: "failed to create node",
                    filepath: opt.filepath,
                });
            }
        });
    }
    async _onWindowLoaded_() {
        let ele_jss = document.getElementsByTagName('script');
        for (let i = 0; i < ele_jss.length; i++) {
            let src = ele_jss[i].src;
            let idx = src.lastIndexOf(`jscss-loader${JscssLoader.version}.js`);
            if (idx != -1) {
                this._globalResDefault = `${src.slice(0, idx)}${this._globalResDefault}`;
                this._loadedFilePaths.push(src);
                const node = ele_jss[i];
                this._loadedJsnodes.push(node);
                const entrynode = node.getAttributeNode("entry");
                if (entrynode?.value) {
                    this._currentEntry = entrynode.value;
                    await this._loadResource({
                        filepath: entrynode.value,
                        atLast: true,
                    });
                    break;
                }
            }
        }
    }
    async _loadResGroups(resGroups, debug) {
        for (let i = 0; i < resGroups.length; i++) {
            const result = await Promise.allSettled(this.loadResources(resGroups[i]));
            debug && console.log('resources loaded :', result);
        }
    }
    async startEntry(options) {
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
            const requ = new Request(opt.globalRes || '');
            const resp = await fetch(requ);
            resGroups = (await resp.json()).paths;
        }
        catch (e) {
            resGroups = [];
        }
        resGroups.push(...(opt.privateRes || []));
        await this._loadResGroups(resGroups, opt.debug);
        !opt.debug && this._loadedJsnodes.forEach(jsnode => jsnode.remove());
        opt.main && opt.main();
    }
    run(globalResDefault, timeout) {
        if (globalResDefault?.startsWith('/')) {
            globalResDefault = globalResDefault.slice(1);
        }
        this._globalResDefault = globalResDefault;
        this._timeout = timeout || JscssLoader._defaultTimeout;
        if (window.addEventListener) {
            window.addEventListener('load', this._onWindowLoaded_.bind(this));
        }
        else {
            console.log('找不到window的load监听方法!!!');
        }
    }
}
JscssLoader.version = "2.0";
JscssLoader._defaultTimeout = 3000;
JscssLoader._instance = new JscssLoader();
JscssLoader.getInstance().run('json/global.json', 5050);
//# sourceMappingURL=jscss-loader2.0.js.map