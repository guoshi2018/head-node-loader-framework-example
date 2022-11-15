

import defaultDescriptors from "./default-descriptors.js";

/**
 * 全局配置
 */
export default {
	/**
	 * 强制进入调试状态, 不管加载器启动文件如何设置
	 */
	forceDebug: false,
	/**
	 * 需要唯一使用 <script> 标签引用的 js 节点, flag 属性默认值,
	 * 以此判断加载节点位置
	 */
	defaultFlag: "load-head",
	/**
	 * tag 默认值
	 */
	defaultTag: "script" as HeadChildTag,

	/**
	 * 保存了所有实体描述符接口的默认配置的数组
	 */
	defaultDescriptors,

	/**
	 * 全局使用的资源, 先于本地(局部)资源加载(如果需要的话)
	 */
	globalStuffs: [
		[
			{ src: "/lib/external-core/jquery/jquery-3.4.1.min.js", },
			{ tag: "link", href: "/page/lesson/4-custom-bootstrap/05-forms-coms/index.css" },
		],
		[
			"/lib/external-core/custom-bootstrap-5.2.0/js/bootstrap.bundle.js",
		],
		[
			{ src: "/lib/external-core/jquery-plugin/jquery.cookie.js" },
			"/lib/external-core/jquery-ui-1.13.1.custom/jquery-ui.min.js",
			//{ tag: "base", href: "https://www.baidu123.com/abc.html", target: "_blank" },
			{ tag: "link", href: "/lib/external-core/jquery-ui-1.13.1.custom/jquery-ui.structure.min.css" },

		]
	] as IAnyDescriptorOrString[][],

};