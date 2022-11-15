import LinkDescriptor from "./link-descriptor.class.js";
import ScriptDescriptor from "./script-descriptor.class.js";
import config from "../config/global.js";
export default class DescriptorFactory {
    static createDescriptor(options) {
        const ctor = this.ctorMap.get(options.tag || config.defaultTag);
        if (!ctor) {
            throw new Error(`tag 参数错误:${options.tag}`);
        }
        return new ctor(options);
    }
}
DescriptorFactory.ctorMap = new Map([
    ["script", ScriptDescriptor],
    ["link", LinkDescriptor],
]);
//# sourceMappingURL=descriptor-factory.class.js.map