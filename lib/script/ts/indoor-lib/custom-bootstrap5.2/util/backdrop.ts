
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): util/backdrop.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

//import EventHandler from '../dom/event-handler'
//import { execute, executeAfterTransition, getElement, reflow } from './index'
//import Config from './config'

/// <reference path="../dom/event-handler/manager.ts" />
/// <reference path="./index.ts" />
/// <reference path="./config.ts" />

/// <reference path="../alias.ts"/>
namespace CustomBootstrap.Util {

	/**
	 * 表征 modal offcanvas 被背景配置
	 */
	export class Backdrop extends Config {

		// #region static constant

		/**
		 * 获取标识 backdrop 配置选项的名称
		 */
		public static override get NAME() {
			return "backdrop";
		}

		/**
		 * 配置选项
		 */
		protected override _options: BackdropConfigOptions;
		/**
		 * 获取配置选项
		 */
		// protected override get options() {
		// 	return this._options;
		// }
		/**
		 * 默认的配置项
		 */
		protected static override readonly _defaultOptions: BackdropConfigOptions = {
			className: 'modal-backdrop',
			clickCallback: (evt: Event) => {
				console.log('click callback not set');
			},
			isAnimated: false,
			isVisible: true, // if false, we use the backdrop helper without adding any element to the dom
			rootElement: document.body // give the choice to place backdrop under different elements
		};
		/**
		 * 获取默认的配置项
		 */
		// protected static override get defaultOptions(): BackdropConfigOptions {
		// 	return this._defaultOptions;
		// }

		/**
		 * 用于配合 css, 在需要淡入淡出使用的 class
		 */
		private static readonly CLASS_NAME_FADE = 'fade';

		/**
		 * 用于配合 css, 标识显现 backdrop 的 class
		 */
		private static readonly CLASS_NAME_SHOW = 'show';

		/**
		 * .bs.backdrop 形式的自定义事件类型, 在点击 backdrop 时发生
		 */
		private static readonly EVENT_MOUSEDOWN = `mousedown.bs.${this.NAME}`;

		/**
		 * 指示当前 backdrop 的 element, 是否已经添加到 rootElement
		 */
		private __isAppended: boolean;
		/**
		 * 获取指示当前是否已经添加了 element 到 rootElement
		 */
		// private get isAppended() {
		// 	return this.__isAppended;
		// }

		/**
		 * 初始化 backdrop 配置项
		 * @param customConfig 用于初始化的配置项
		 */
		public constructor(customConfig: BackdropConfigOptions) {
			super();
			const opt = Object.assign({}, Backdrop.defaultOptions, customConfig);
			this._options = this._generateOptions(opt);
			this.__isAppended = false;
		}

		//#endregion

		//#region Private getter


		/**
		 * 获取 element(晚加载的方式), 将被用来承受点击后关闭(或者不理)该配置相关的组件
		 */
		protected get element() {
			if (!this._options.element) {
				const backdrop = document.createElement('div');
				backdrop.className = this._options.className || '';
				if (this._options.isAnimated) {
					backdrop.classList.add(Backdrop.CLASS_NAME_FADE)
				}
				this._options.element = backdrop;
			}
			return this._options.element;
		}
		//#endregion

		/**
		 * 显示并执行指定的回调. 
		 * 	1. 如果配置项 isVisible 为 true:
		 * 		1) 内在配置的 isAnimated, 为 true 时, 执行动画, 动画结束后执行回调函数;
		 * 		2) 内在配置的 isAnimated, 为 false 时, 无动画, 显示和回调函数几乎同时进行.
		 *  2. 如果配置项 isVisible 为 false, 使用 callback 来自定义显示过程
		 * 		 
		 * @param callback 回调函数
		 */
		public show(callback: () => void) {

			if (this._options.isVisible as boolean) {
				this._append()

				if (this._options.isAnimated) {
					Index.reflow(this.element)
				}

				this.element.classList.add(Backdrop.CLASS_NAME_SHOW)

				this._emulateAnimation(callback);
			} else {
				//Index.execute(callback)
				callback();
			}
		}

		/**
		 * 隐藏(释放) element, 并执行回调函数. 时机与 show 类似
		 * @param callback 回调函数
		 */
		public hide(callback: () => any) {

			if (this._options.isVisible as boolean) {

				// 是不是也应该执行 reflow 以模拟动画?, 实验证明, 不需要
				// if (this._config.isAnimated) {
				// 		Index.reflow(this.element)
				// }
				this.element.classList.remove(Backdrop.CLASS_NAME_SHOW)

				this._emulateAnimation(() => {
					this.dispose();
					callback();
				})
			} else {
				callback();
			}
		}

		/**
		 * 析构 element, 释放资源, __isAppended 字段复位
		 */
		dispose() {
			if (this.__isAppended) {

				//EventHandler.off(this.element, EVENT_MOUSEDOWN)
				EvtMgr.off({
					element: this.element,
					evtType: Backdrop.EVENT_MOUSEDOWN,
					clientListener: this._options.clickCallback,
				} as WrpOpt)
				this.element.remove()
				this.__isAppended = false
			}
		}

		/**
		 * 添加 element　到 rootElement, 如果已经添加, 则忽略
		 */
		private _append() {
			if (!this.__isAppended) {

				this._options.rootElement.append(this.element);

				// EventHandler.on(element, EVENT_MOUSEDOWN, () => {
				// 	execute(this.config.clickCallback)
				// })
				EvtMgr.on({
					element: this.element,
					evtType: Backdrop.EVENT_MOUSEDOWN,
					clientListener: this._options.clickCallback,
				} as WrpOpt);

				this.__isAppended = true
			}
		}

		/**
		 * 延时 element 动画时限(或者, 如果内设的 config-is-animated 为 false 时,
		 * 则不等待动画结束), 执行相应函数.
		 * @param callback 要执行的函数
		 */
		private _emulateAnimation(callback: () => any) {
			CustomBootstrap.Util.Index.executeAfterTransition(callback,
				this.element, this._options.isAnimated as boolean)
		}
	}
}


//export default Backdrop
