




namespace CustomBootstrap.Dom.EventHandler {

	/**
	 * 监听器包装器, 保存监听器的有关选项, 以方便监听器的存在识别, 触发, 响应, 移除.
	 */
	export class ListenerWrapper {
		/**
		* 重定向的事件类型对照表, key 为源类型, value 为目标类型
		* 主要是为了父子级发生这些事件时, 精简逻辑
		*/
		private static readonly REDR_EVENT_TYPES: Map<string, string> = new Map(
			[
				["mouseenter", "mouseover"],
				["mouseleave", "mouseout"],
			]
		);
		/**
		 * 事件的本地(原生)类型列表
		 */
		private static readonly NATIVE_EVENT_TYPES = new Set([
			'click',
			'dblclick',
			'mouseup',
			'mousedown',
			'contextmenu',
			'mousewheel',
			'DOMMouseScroll',
			'mouseover',
			'mouseout',
			'mousemove',
			'selectstart',
			'selectend',
			'keydown',
			'keypress',
			'keyup',
			'orientationchange',
			'touchstart',
			'touchmove',
			'touchend',
			'touchcancel',
			'pointerdown',
			'pointermove',
			'pointerup',
			'pointerleave',
			'pointercancel',
			'gesturestart',
			'gesturechange',
			'gestureend',
			'focus',
			'blur',
			'change',
			'reset',
			'select',
			'submit',
			'focusin',
			'focusout',
			'load',
			'unload',
			'beforeunload',
			'resize',
			'move',
			'DOMContentLoaded',
			'readystatechange',
			'error',
			'abort',
			'scroll'
		]);

		/**
		 * 用以保存所有正在生效的非一次性监听包装器
		 * 注意事件类型是客户端提供的原始事件名称, 可能包含命名空间
		 */
		protected static _wrapperRegistry: Set<ListenerWrapper> = new Set();
		/**
		 * 获取当前的监听包装注册列表
		 */
		public static get wrapperRegistry() {
			return this._wrapperRegistry;
		}

		/**
		 * 命名空间正则表达式, 在正规化事件类型时使用
		 */
		protected static readonly EVENT_NSPC = /\..*/;

		/**
	 * 原因: 因为客户端发起的 remove listener
	 */
		protected static REASON_CLIENT_REMOVE = "client removed it";

		/**
		 * 正规后的事件类型, 但如果正规化后发现不是本地原生事件, 则沿用原来
		 * 带命名空间的事件类型名
		 */
		protected _propType: string;

		/**
		 * 正规化后的事件监听器, 主要是考虑 mouseenter 映射 mouseover; 
		 * mouseleave 映射 mouseout 后的细节处理(增加执行条件)
		 */
		protected _propListener: EventListener;

		/**
		 * 终止控制器, 用于将移除事件的操作, 简单化处理
		 * 否则, 传统的 removeListener 移除事件方法, 需要精细检查,
		 * 且不支援一次移除多个. 
		 */
		protected _abortController: AbortController;

		/**
		 * 事件的目标元素, 在代理监听包装器中, 则只是所有被代理元素的代理者
		 */
		protected _element: HTMLElement;
		/**
		 * 获取事件的目标元素, 在代理监听包装器中, 则只是所有被代理元素的代理者
		 */
		public get element() {
			return this._element;
		}

		/**
		 * 保存客户端指定的事件类型名, 可能包含命名空间
		 */
		protected _evtType: string;
		/**
		 * 获取客户端指定的事件类型名, 可能包含命名空间
		 */
		public get evtType() {
			return this._evtType;
		}

		/**
		 * 客户端指定的监听函数(回调函数), 在内部调用 addEventListener 时, 可能
		 * 会经过加工, 以适应事件映射,代理操作.
		 */
		protected _clientListener: EventListener;
		/**
		 * 获取客户端指定的监听函数(回调函数)
		 */
		public get clientListener() {
			return this._clientListener;
		}

		/**
		 * 客户端指定该监听是否一次性
		 */
		protected _onceOnly: boolean;

		/**
		 * 构造一个监听包装器
		 * @param options 监听包装器选项
		 * @param onceOnly 是否仅仅一次性监听, 默认为 false
		 */
		constructor(options: ListenerWrapperOptions, onceOnly: boolean = false) {
			this._element = options.element;

			this._evtType = options.evtType;
			this._propType = ListenerWrapper.properEventType(options.evtType);

			this._clientListener = options.clientListener;
			this._propListener = ListenerWrapper.properListener(options.clientListener, this._propType);

			this._onceOnly = onceOnly;

			this._abortController = new AbortController();
		}

		/**
		 * 将可能带有命名空间的事件类型字符串, 转换为最合适的字符串
		 * @param evtType 可能带有命名空间的事件类型字符串
		 * @returns 最合适的字符串. 
		 *   去掉可能存在的命名空间后的本地事件类型, 如果被重定向, 则使用重定向后的本地事件类型;
		 * 如果得到的本地事件类型在模块的本地事件列表中未找到, 则原字符串原封不动返回 
		 */
		public static properEventType(evtType: string) {
			// 本地类型, 并考虑重定向
			const nativeType = evtType.replace(this.EVENT_NSPC, '');
			let t = this.REDR_EVENT_TYPES.get(nativeType) || nativeType;

			// 没有记录, 则只能继续使用原来的 bootstrap 风格的事件类型
			if (!this.NATIVE_EVENT_TYPES.has(t)) {
				t = evtType;
			}
			return t;
		}

		/**
		 * 为监听函数附加执行条件, 如果事件类型是 mouseover 或 mouseout.
		 * @param listener 为该事件类型配置的监听器
		 * @param propType 正规化后的事件类型, 可能仍然包含命名空间
		 * @returns 如果事件类型是 mouseover 或 mouseout, 则附加执行条件, 具体为:
		 *  1. 不能发生在代理和被代理之间;
		 *  2. 不能发生在被代理和它的子级之间
		 * @remark 注意: 
		 *  1. 如果未使用代理, 则自定义的 Event.delegateTarget 为元素自身
		 *  2. 如果事件类型不是 mouseover 和 mouseout, 以及一定命名空间下的这两个类型, 
		 * 则直接返回 listener
		 * 	3. 该方法存在的目的在于 mouseenter/mouseover/mouseleave/mouseout 事件参数的细微差别,
		 * 以及监听时, 结合代理存在的性能/效果等的差异. 其操作的逻辑背后的真正原因, 以后有时间再
		 * 做仔细研究
		 */
		public static properListener(listener: EventListener, propType: string) {
			let propListener = listener;
			if (propType in this.REDR_EVENT_TYPES.values()) {
				propListener = function (evt: Event) {
					// 对于 mouseover mouseout, event 必为 MouseEvent
					const e = evt as MouseEvent;
					if (
						// 对于 mouseenter, 是同时发生 mouseleave 的 target; 
						// 对于 mouseleave, 是同时发生 mouseenter 的 target;
						!e.relatedTarget ||
						(
							// mouseenter mouseleave 发生在代理和被代理之间则忽略
							e.relatedTarget !== e.delegateTarget &&
							// mouseenter mouseleave 发生在被代理和它的子级之间也忽略
							!e.delegateTarget?.contains(e.relatedTarget as Node))
					) {
						// return fn.call(this, e)
						return listener.call(e.target, e);
					}
				};
			}
			return propListener;
		}



		/**
		 * 连接事件监听包装器, 即添加事件处理到元素, 并注册非一次性包装器到注册列表
		 */
		public attach() {
			this._element.addEventListener(this._propType, this._propListener, {
				// 无代理, true / false 无所谓
				capture: true,
				once: this._onceOnly,
				signal: this._abortController.signal, // 埋好雷, 以便需要时移除
			});
			!this._onceOnly && ListenerWrapper._wrapperRegistry.add(this);
		}

		/**
		 * 断开监听包装器, 即注册列表中删除记录, 并取消监听
		 */
		public detach() {
			ListenerWrapper._wrapperRegistry.delete(this);

			// 对于代理监听包装器, 该操作一次移除所有被代理的后代级元素上注册的监听
			this._abortController.abort(ListenerWrapper.REASON_CLIENT_REMOVE);
		}
	}
}