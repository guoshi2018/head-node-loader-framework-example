/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): dom/event-handler.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/// <reference path="./listen-wrapper.ts"/>

namespace CustomBootstrap.Dom.EventHandler {

	/**
	 * 通过添加字段表示代理选择哪些元素, 重写相关方法, 扩展了普通事件监听包装器的
	 * 能力
	 */
	export class DelegateListenerWrapper extends ListenerWrapper {
		/**
		 * 指示应该代理监听哪些后代级元素的 css 选择器
		 */
		private _dlgSelector: string;
		public get dlgSelector() {
			return this._dlgSelector;
		}

		/**
		 * 构造一个事件代理监听包装器
		 * @param options 选项
		 * @param onceOnly 是否一次性,默认为 false
		 */
		constructor(options: DelegateListenerWrapperOptions, onceOnly: boolean = false) {
			super(options, onceOnly);
			this._dlgSelector = options.dlgSelector;
		}

		/**
		 * 已重写.通过监听包装选项, 在监听包装器注册列表中, 查找这样的包装器
		 * @param options 监听包装选项
		 * @returns 找到返回该监听包装器, 找不到则返回 undefined
		 */
		// public static override findBy(options: DelegateListenerWrapperOptions) {
		// 	return [...this.REGISTRY.values()].find(w => {
		// 		const dw = w as DelegateListenerWrapper;
		// 		return dw._element === options.element &&
		// 			dw._evtType === options.evtType &&
		// 			dw._clientListener === options.clientListener &&
		// 			dw._dlgSelector === options.dlgSelector
		// 	});
		// }

		/**
		 * 已重写. 连接事件监听包装器, 即添加事件处理到元素, 并注册非一次性包装器到注册列表
		 */
		public override attach() {
			this._element.querySelectorAll(this._dlgSelector).forEach(ele => [
				ele.addEventListener(this._propType, this._propListener.bind(ele), {
					capture: true,
					once: this._onceOnly,
					signal: this._abortController.signal,
				})
			])
			!this._onceOnly && ListenerWrapper.wrapperRegistry.add(this);
		}
	}
}





//export default EventHandler
