"use strict";
class PageResourceLoader {
    constructor() {
        this._currentEntry = '';
        this._attemptedResources = [];
    }
    get briefsOfSuccessfulResource() {
        return this._attemptedResources.filter(info => info.loadResult?.error == 0)
            .map(info => {
            return {
                filepath: info.descriptor.filepath,
                message: info.loadResult?.message,
            };
        });
    }
    get briefsOfFailedResourceBrief() {
        return this._attemptedResources.filter(info => info.loadResult?.error != 0)
            .map(info => {
            return {
                filepath: info.descriptor.filepath,
                message: info.loadResult?.message,
            };
        });
    }
    static getInstance() {
        return PageResourceLoader._instance;
    }
    async _loadResourceGroups(resGroups, debug) {
        for (let i = 0; i < resGroups.length; i++) {
            const result = await Promise.allSettled(this._loadResources(resGroups[i]));
            debug && console.log('resources loaded :', result);
        }
    }
    _loadResources(resinfos) {
        const proms = [];
        resinfos.forEach(async (ri) => {
            proms.push(this._loadResource(ri));
        });
        return proms;
    }
    _isAttemped(resInfo) {
        return this._attemptedResources.findIndex(ri => ri.descriptor.tag == resInfo.descriptor.tag
            && ri.descriptor.filepath == resInfo.descriptor.filepath) != -1;
    }
    _loadResource(resinfo) {
        return new Promise((resolve, reject) => {
            let node;
            if (!this._isAttemped(resinfo)) {
                const isLink = resinfo.descriptor.tag == "link";
                node = document.createElement(isLink ? 'link' : 'script');
                Object.assign(node, resinfo.descriptor);
                node[isLink ? "href" : "src"] = resinfo.descriptor.filepath;
                if (resinfo.descriptor.atLast || !document.head.hasChildNodes()) {
                    document.head.appendChild(node);
                    this._clientEntryNode = node;
                }
                else {
                    this._clientEntryNode?.before(node);
                }
                this._attemptedResources.push(resinfo);
                node.addEventListener('load', function (evt) {
                    const succ = {
                        node: this,
                        error: 0,
                        message: "loaded successfully",
                    };
                    resinfo.loadResult = succ;
                    resolve(succ);
                });
                node.addEventListener('error', function (evt) {
                    const fail = {
                        node: this,
                        error: 103,
                        message: "An unexpected error has occurred while loading.",
                    };
                    resinfo.loadResult = fail;
                    reject(fail);
                });
                setTimeout(() => {
                    const fail = {
                        node,
                        error: 104,
                        message: "sorry, load timeout",
                    };
                    resinfo.loadResult = fail;
                    reject(fail);
                }, this._timeout);
            }
            else {
                const fail = {
                    error: 102,
                    message: "the file doesnot need be loaded twice.",
                };
                resinfo.loadResult = fail;
                reject(fail);
            }
        });
    }
    _start() {
        let ele_jss = document.getElementsByTagName('script');
        for (let i = 0; i < ele_jss.length; i++) {
            let src = ele_jss[i].src;
            let idx = src.lastIndexOf(`page-resource-loader${PageResourceLoader.version}.js`);
            if (idx != -1) {
                this._globalResDefault = `${src.slice(0, idx)}${this._globalResDefault}`;
                const node = ele_jss[i];
                this._attemptedResources.push({
                    descriptor: {
                        tag: "script",
                        filepath: src,
                    },
                    loadResult: {
                        node,
                        error: 0,
                        message: "加载成功",
                    }
                });
                const entrynode = node.getAttributeNode("entry");
                if (entrynode?.value) {
                    this._currentEntry = entrynode.value;
                    this._loadResource({
                        descriptor: {
                            tag: "script",
                            filepath: entrynode.value,
                            atLast: true,
                        }
                    });
                }
                break;
            }
        }
    }
    async startEntry(options) {
        const opt = Object.assign({
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
        let descGroups;
        try {
            const requ = new Request(opt.globalRes || '');
            const resp = await fetch(requ);
            descGroups = (await resp.json()).descriptors;
        }
        catch (e) {
            descGroups = [[]];
        }
        descGroups.push(...(opt.privateRes || []));
        const rescInfoGroups = [];
        descGroups.forEach(dg => {
            const rig = dg.map(d => {
                return {
                    descriptor: d,
                };
            });
            rescInfoGroups.push(rig);
        });
        await this._loadResourceGroups(rescInfoGroups, opt.debug);
        !opt.debug && this._attemptedResources
            .filter(ri => ri.descriptor.tag == "script"
            && ri.loadResult?.error == 0)
            .forEach(ri => ri.loadResult?.node?.remove());
        opt.main && opt.main();
    }
    run(globalResDefault, timeout) {
        if (globalResDefault?.startsWith('/')) {
            globalResDefault = globalResDefault.slice(1);
        }
        this._globalResDefault = globalResDefault;
        this._timeout = timeout || PageResourceLoader._defaultTimeout;
        this._start();
    }
}
PageResourceLoader.version = "1.0";
PageResourceLoader._defaultTimeout = 3000;
PageResourceLoader._instance = new PageResourceLoader();
PageResourceLoader.getInstance().run('json/global.json', 5050);
//# sourceMappingURL=page-resource-loader1.0.js.map