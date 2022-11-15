import config from "../config/global.js";
export default class DescriptorBase {
    constructor(options) {
        this._options = Object.assign({}, DescriptorBase._defaultOptions, options);
        this._node = document.createElement(options.tag || config.defaultTag);
        Object.assign(this._node, options);
    }
    static get defaultOptions() {
        return this._defaultOptions;
    }
    static set defaultOptions(value) {
        this._defaultOptions = value;
    }
    static get loaderNode() {
        if (!this._loaderNode) {
            let ele_jss = document.getElementsByTagName('script');
            this._loaderNode = [...ele_jss].find(ele => this._regexLoaderfilepath.test(ele.src));
            if (!this._loaderNode) {
                throw new Error('未知错误, 无法查找加载器对应的 script 节点');
            }
        }
        return this._loaderNode;
    }
    ;
    get node() { return this._node; }
    attachAsync() {
        DescriptorBase.loaderNode[this._options.atlast ? "after" : "before"](this._node);
    }
}
DescriptorBase._defaultOptions = {
    tag: config.defaultTag,
    atlast: config.defaultAtlast,
    timeout: config.defaultTimeout,
};
DescriptorBase._regexLoaderfilepath = /\.*head-child-node-loader.js$/i;
//# sourceMappingURL=descriptor-base.class.js.map