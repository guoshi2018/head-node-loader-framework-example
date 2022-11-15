/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): util/focustrap.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

//import EventHandler from '../dom/event-handler'
//import SelectorEngine from '../dom/selector-engine'
//import Config from './config'

/// <reference path="../dom/event-handler/manager.ts" />
/// <reference path="../dom/selector-engine.ts" />
/// <reference path="./config.ts"/>

/// <reference path="../alias.ts"/>
namespace CustomBootstrap.Util {
  /**
   * 封装元素及其后代元素的 focus 行为, 封锁其余元素的focusin 行为, 只为了
   * 元素自身及其后代元素永获焦点
   */
  export class FocusTrap extends Config {

    /**
     * Constants
     */
    private static readonly DATA_KEY = 'bs.focustrap'
    private static readonly EVENT_KEY = `.${this.DATA_KEY}`
    private static readonly EVENT_FOCUSIN = `focusin${this.EVENT_KEY}`
    private static readonly EVENT_KEYDOWN_TAB = `keydown.tab${this.EVENT_KEY}`

    private static readonly TAB_KEY = 'Tab'
    private static readonly TAB_NAV_FORWARD = 'forward'
    private static readonly TAB_NAV_BACKWARD = 'backward'

    private __isActive: boolean;
    private __lastTabNavDirection: 'forward' | 'backward';

    protected static override readonly _defaultOptions: FocustrapConfigOptions = {
      autofocus: true,
    }

    /**
     * 配置选项
     */
    protected override _options: FocustrapConfigOptions;

    public constructor(customConfig: FocustrapConfigOptions) {
      super();
      const opt = Object.assign({}, FocusTrap.defaultOptions, customConfig);
      this._options = this._generateOptions(opt);
      this.__isActive = false;
      this.__lastTabNavDirection = 'backward';
    }

    // Getters

    public static override get NAME() {
      return 'focustrap';
    }

    // Public
    public activate() {
      if (!this.__isActive && this._options.autofocus
        && this._options.element) {

        this._options.element.focus();

        // 避免 focus 无限循环
        EvtMgr.off({
          element: document.body,
          evtType: FocusTrap.EVENT_KEY
        });
        EvtMgr.on({
          element: document.body,
          evtType: FocusTrap.EVENT_FOCUSIN,
          clientListener: this.__handleFocusin.bind(this),
        });
        EvtMgr.on({
          element: document.body,
          evtType: FocusTrap.EVENT_KEYDOWN_TAB,
          clientListener: this.__handleKeydown.bind(this),
        });
        this.__isActive = true;
      }
    }

    public deactivate() {
      if (this.__isActive) {
        EvtMgr.off({
          element: document.body,
          evtType: FocusTrap.EVENT_KEY,
        })
        this.__isActive = false;
      }
    }

    /**
     * 处理 focusin 事件(可能是从下级一直冒泡到 document.body)
     * @param evt 事件参数
     * @remark 原理: 
     *  1. 关联 element 未设置, 忽略.
     *  2. focusin 由 body, 或者关联 element, 或者关联 element 的后代引发, 忽略
     *  3. 其它元素引发的 focusin, 则检查关联 element 的下级可聚焦可用可视元素;
     *    1)没有, 则聚焦关联 element 自身
     *    2)至少一个, 根据当前的 __lastTabNavDirection 配置(该配置受键盘 tab 操控)
     *   决定第一个或最后一个元素聚焦
     */
    private __handleFocusin(evt: Event) {
      const { element: ele } = this._options;
      if (ele && evt.target !== document.body && evt.target !== ele &&
        !ele.contains(evt.target as Node)) {

        const elements = SltEg.focusableChildren(ele)

        if (elements.length === 0) {
          ele.focus()
        } else if (this.__lastTabNavDirection === FocusTrap.TAB_NAV_BACKWARD) {
          elements[elements.length - 1].focus()
        } else {
          elements[0].focus()
        }
      }
    }

    private __handleKeydown(evt: Event) {
      const e = evt as KeyboardEvent;
      if (e.key === FocusTrap.TAB_KEY) {
        this.__lastTabNavDirection = e.shiftKey ?
          FocusTrap.TAB_NAV_BACKWARD : FocusTrap.TAB_NAV_FORWARD
      }
    }
  }
}
//export default FocusTrap
