/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): util/swipe.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

//import Config from './config'
//import EventHandler from '../dom/event-handler'
//import { execute } from './index'
/// <reference path="./config.ts"/>
/// <reference path="../dom/event-handler/manager.ts"/>
/// <reference path="./index.ts"/>

/// <reference path="../alias.ts"/>
namespace CustomBootstrap.Util {
  /**
   * 封装组件的划扫操作配置及其效果, 设备(touch,mouse,pen)数量限制为 1
   */
  export class Swipe extends Config {
    /**
     * 获取标识 backdrop 配置选项的名称
     */
    public static override get NAME() {
      return "swipe";
    }

    /**
     * 配置选项
     */
    protected override _options: SwipeConfigOptions;

    /**
     * 默认的配置项, 三个回调, 非调试版本, 应该留空(undefined)
     */
    protected static override readonly _defaultOptions: SwipeConfigOptions = {
      leftCallback: () => {
        console.log('left callback forgotten');
      },
      rightCallback: () => {
        console.log('right callback forgotten');
      },
      endCallback: () => {
        console.log('end callback forgotten');
      },
    }

    /**
     * swipe 系列的事件关键字(命名空间): .bs.swipe
     */
    private static readonly EVENT_KEY = '.bs.swipe'

    /**
     * 带命名空间的 TouchEvent: touchestart.bs.swipe
     */
    private static readonly EVENT_TOUCHSTART = `touchstart${Swipe.EVENT_KEY}`
    /**
     * 带命名空间的 TouchEvent: touchmove.bs.swipe
     */
    private static readonly EVENT_TOUCHMOVE = `touchmove${Swipe.EVENT_KEY}`
    /**
     * 带命名空间的 TouchEvent: touchend.bs.swipe
     */
    private static readonly EVENT_TOUCHEND = `touchend${Swipe.EVENT_KEY}`

    /**
     * 带命名空间的 PointerEvent: pointerdown.bs.swipe 
     */
    private static readonly EVENT_POINTERDOWN = `pointerdown${Swipe.EVENT_KEY}`
    /**
     * 带命名空间的 PointerEvent:pointerup.bs.swipe
     */
    private static readonly EVENT_POINTERUP = `pointerup${Swipe.EVENT_KEY}`

    /**
     * PointerEvent 事件的 pointerType 属性: touche
     */
    private static readonly POINTER_TYPE_TOUCH = 'touch'
    /**
     * PointerEvent 事件的 pointerType 属性: pen
     */
    private static readonly POINTER_TYPE_PEN = 'pen'

    /**
     * css 属性 class: .pointer-event, 其中定义为 
     * touch-action: pan-y, 启用单指垂直平移手势, 因为左右平移手势, 
     * 要留给 swipe (bootstrap 目前用到的仅仅是轮播图 carouse)
     */
    private static readonly CLASS_NAME_POINTER_EVENT = 'pointer-event';
    /**
     * 滑动距离阈值, 即小于此将被忽略
     */
    private static readonly SWIPE_THRESHOLD = 40

    /**
     * 记录手势的起始 x 位置, 以及两次手势的横向距离
     */
    private _deltaX: number;

    /**
     * 当前是否支持 PointerEvent 事件, 由 window.PointerEvent 属性
     * 是否存在判断
     */
    private _supportPointerEvents: boolean;
    /**
     * 绑定 this 指针为当前 swipe 实例的 _start 方法
     */
    private _start_bind: EventListener;
    /**
     * 绑定 this 指针为当前 swipe 实例的 _end 方法
     */
    private _end_bind: EventListener;
    /**
     * 绑定 this 指针为当前 swipe 实例的 _move 方法
     */
    private _move_bind: EventListener;

    /**
     * 初始化 Swipe 对象
     * @param customConfig 用于初始化的配置项
     */
    public constructor(customConfig: SwipeConfigOptions) {
      super();
      if (!customConfig.element || !Swipe.isSupported()) {
        throw new Error("swipe element undefined or swipe is not supported");
      }
      const opt = Object.assign({}, Swipe.defaultOptions, customConfig);
      this._options = this._generateOptions(opt);

      this._deltaX = 0;
      this._supportPointerEvents = Boolean(window.PointerEvent);

      this._start_bind = this._start.bind(this);
      this._end_bind = this._end.bind(this);
      this._move_bind = this._move.bind(this);

      this._initEvents();
    }

    /**
     * 释放 swipe
     */
    public dispose() {
      //EventHandler.off(this._element, EVENT_KEY)
      EvtMgr.off({
        element: this._options.element as HTMLElement,// 可以肯定, 必然不为 undefined
        evtType: Swipe.EVENT_KEY,
      });
    }

    /**
     * TouchEvent 的 touchstart, PointerEvent 的 pointerdown 事件处理
     * @param evt 事件参数对象
     * @remark 目的是记录触摸(按压)的起点
     */
    private _start(evt: Event) {
      // if (!this._supportPointerEvents) {
      //   const et = evt as TouchEvent;
      //   this._deltaX = et.touches[0].clientX
      // } else if (this._eventIsPointerPenTouch(evt)) {
      //   const ep = evt as PointerEvent;
      //   this._deltaX = ep.clientX
      // }
      if (Swipe.isSupported()) {
        const et = evt as TouchEvent;
        this._deltaX = et.touches[0].clientX
      } else if (this._eventIsPointerPenTouch(evt)) {
        const ep = evt as PointerEvent;
        this._deltaX = ep.clientX
      }
    }
    /**
     * TouchEvent 的 touchend, PointerEvent 的 pointerup 事件处理
     * @param evt 事件参数对象
     * @remark 计算起始点距离, 以便 _handleSwip() 处理
     */
    private _end(evt: Event) {
      if (this._eventIsPointerPenTouch(evt)) {
        this._deltaX = (evt as PointerEvent).clientX - this._deltaX
      }

      //this._handleSwipe()
      const absDeltaX = Math.abs(this._deltaX);
      if (absDeltaX > Swipe.SWIPE_THRESHOLD) {
        const direction = absDeltaX / this._deltaX;
        this._deltaX = 0;
        if (direction !== 0) {
          direction > 0 ?
            this._options.rightCallback && this._options.rightCallback() :
            this._options.leftCallback && this._options.leftCallback();
        }
      }

      //UIndex.execute(this._options.endCallback);
      this._options.endCallback && this._options.endCallback();
    }

    /**
     * 触摸移动处理
     * @param evt 参数对象
     */
    private _move(evt: Event) {
      const e = evt as TouchEvent;
      this._deltaX = e.touches && e.touches.length > 1 ?
        0 :
        e.touches[0].clientX - this._deltaX;
    }

    // 已经直接放在 _end() 方法中
    // private _handleSwipe() {
    //   // const absDeltaX = Math.abs(this._deltaX)

    //   // if (absDeltaX <=Swipe.SWIPE_THRESHOLD) {
    //   //   return
    //   // }

    //   // const direction = absDeltaX / this._deltaX

    //   // this._deltaX = 0

    //   // if (!direction) {
    //   //   return
    //   // }

    //   // execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback)

    //   const absDeltaX = Math.abs(this._deltaX);
    //   if (absDeltaX > Swipe.SWIPE_THRESHOLD) {
    //     const direction = absDeltaX / this._deltaX;
    //     this._deltaX = 0;
    //     if (direction !== 0) {
    //       direction > 0 ?
    //         this._options.rightCallback && this._options.rightCallback() :
    //         this._options.leftCallback && this._options.leftCallback();
    //     }
    //   }
    // }

    /**
     * 初始化事件类型, 针对支持 Pointer 设备, 与 Touched 设备
     */
    private _initEvents() {
      // if (this._supportPointerEvents) {
      //   EventHandler.on(this._element, Swipe.EVENT_POINTERDOWN, this._start.bind(this))
      //   EventHandler.on(this._element, Swipe.EVENT_POINTERUP, this._end.bind(this))

      //   this._element.classList.add(Swipe.CLASS_NAME_POINTER_EVENT)
      // } else {
      //   EventHandler.on(this._element, Swipe.EVENT_TOUCHSTART, this._start.bind(this))
      //   EventHandler.on(this._element, Swipe.EVENT_TOUCHMOVE, this._move.bind(this))
      //   EventHandler.on(this._element, Swipe.EVENT_TOUCHEND, this._end.bind(this))
      // }
      const element = this._options.element as HTMLElement;
      if (this._supportPointerEvents) {
        EvtMgr.on({
          element,
          evtType: Swipe.EVENT_POINTERDOWN,
          clientListener: this._start_bind,
        });
        EvtMgr.on({
          element,
          evtType: Swipe.EVENT_POINTERUP,
          clientListener: this._end_bind,
        });
        element.classList.add(Swipe.CLASS_NAME_POINTER_EVENT)
      } else if (Swipe.isSupported()) {
        EvtMgr.on({
          element,
          evtType: Swipe.EVENT_TOUCHSTART,
          clientListener: this._start_bind,
        });
        EvtMgr.on({
          element,
          evtType: Swipe.EVENT_TOUCHMOVE,
          clientListener: this._move_bind,
        });
        EvtMgr.on({
          element,
          evtType: Swipe.EVENT_TOUCHEND,
          clientListener: this._end_bind,
        });
      }
    }

    /**
     * 判断当前事件是否 PointerEvent 的 pen 或 touch
     * @param evt 事件
     * @returns true: 是; false: 否
     * @remark 是需要两个条件:
     *  1. 当前支持 PointerEvent 事件
     *  2. 给定的事件类型(pointerType 字段)是 "pen" 或 "touch" 
     */
    private _eventIsPointerPenTouch(evt: Event) {
      // return this._supportPointerEvents &&
      //   (evt.pointerType === Swipe.POINTER_TYPE_PEN ||
      //     evt.pointerType === Swipe.POINTER_TYPE_TOUCH)
      let ok = false;
      if (this._supportPointerEvents) {
        const e = evt as PointerEvent;
        ok = e.pointerType == Swipe.POINTER_TYPE_PEN ||
          e.pointerType === Swipe.POINTER_TYPE_TOUCH;
      }
      return ok;
    }

    /**
     * 是否支持 TouchEvent
     * @returns true: 是, false: 否
     */
    public static isSupported() {
      return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0
    }
  }
}
//export default Swipe
