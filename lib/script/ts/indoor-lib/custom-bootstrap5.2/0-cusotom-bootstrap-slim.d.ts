//import { ListenerWrapper } from './dom/event-handler/listen-wrapper';


interface Event {
	/**
	 * 为 Event 事件扩展的属性, 用于记录当前的代理目标元素. 当不存在代理时, 为 undefiend
	 */
	delegateTarget?: HTMLElement;
}

/**
 * 将 CustomBootstrap.Util.TemplateFactory 实例, 解析为 string 的函数
 */
type TFParser = (tf: CustomBootstrap.Util.TemplateFactory) => string;

declare namespace CustomBootstrap.Dom.EventHandler {

	/**
	 * 基础监听包装器选项, 不包含事件监听器
	 */
	interface ListenerWrapperBaseOptions {
		/**
		 * 被监听事件的元素, 做代理操作时, 是所有被代理元素的代理者
		 */
		element: HTMLElement,
		/**
		 * 客户端指定的原始事件类型, 可能包括命名空间
		 */
		evtType: string,
	}
	/**
	 * 监听包装器选项
	 */
	interface ListenerWrapperOptions extends ListenerWrapperBaseOptions {
		/**
		 * 客户端指定的事件监听器
		 */
		clientListener: EventListener,
	}
	/**
	 * 代理监听包装器选项, 仅仅在 ListenerWrapperOptions 基础上增加 dlgSelector 属性
	 */
	interface DelegateListenerWrapperOptions extends ListenerWrapperOptions {
		/**
		 * css 选择器, 指示要代理的元素, 都有什么特征. 只能是 element 的后代元素
		 */
		dlgSelector: string,
	}
}

declare namespace CustomBootstrap.Util {
	/**
	 * bootstrap 组件的配置包括的通用选项
	 */
	//type ConfigDataType = Record<string, null | boolean | string | Function | Element>;
	interface ConfigOptions {

		/**
		 * 该配置选项关联的 element, 不同的配置或组件, 会有不同的意义
		 */
		element?: HTMLElement;

		//	[key: string]: any;
	}

	interface BackdropConfigOptions extends ConfigOptions {
		/**
		 * element 将会应用的 css class
		 */
		className?: string;
		/**
		 * element 点击后的事件处理回调
		 */
		clickCallback?: EventListener;
		/**
		 * 是否需要 fade 动画
		 */
		isAnimated: boolean;
		/**
		 * element 是否可见, 如果为 false, 就必须使用 callback 来自定义显示/隐藏过程
		 */
		isVisible?: boolean;
		/**
		 * element 作为子元素添加到此元素内
		 */
		rootElement: Element;
	}

	interface FocustrapConfigOptions extends ConfigOptions {
		/**
		 * 元素是否自动聚焦
		 */
		autofocus: boolean;
	}

	interface SwipeConfigOptions extends ConfigOptions {
		/**
		 * 触摸后划向左边后的回调函数
		 */
		leftCallback?: () => void;
		/**
		 * 触摸后划向右边后的回调函数
		 */
		rightCallback?: () => void;
		/**
		 * 触摸操作结束后的回调函数
		 */
		endCallback?: () => void;
	}

	interface TemplateFactoryContent {
		//entry?: string | HTMLElement | Function;  //'(string|element|function|null)',
		entry?: string | HTMLElement | TFParser;
		selector?: string | HTMLElement;			//'(string|element)'
	}

	interface TemplateFactoryConfigOptions extends ConfigOptions {
		allowList: Record<string, Array<string | RegExp>>,
		content: TemplateFactoryContent,
		extraClass: string | Function; //'(string|function)',
		html: boolean;  //'boolean',
		sanitize: boolean;  //'boolean',
		sanitizeFn?: Function;  //'(null|function)',
		template: string; //'string'
	}
}


//#region alias
/**
 * alias for CustomBootstrap.Dom.EventHandler.ListenerWrapperOptions
 */
type WrpOpt = CustomBootstrap.Dom.EventHandler.ListenerWrapperOptions;

//#endregion
