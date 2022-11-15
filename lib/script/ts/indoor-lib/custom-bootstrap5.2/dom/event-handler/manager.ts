/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): dom/event-handler.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */



/// <reference path="./listen-wrapper.ts"/>
/// <reference path="./delegate-listener-wrapper.ts" />
namespace CustomBootstrap.Dom.EventHandler {
  /**
   * 负责统管所有 bootstrap 组件的事件的监听, 处理, 代理, 触发, 移除等操作
   */
  export const Manager = {
    defaultCustomEventInit: {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {},
    } as CustomEventInit,
    /**
     * 按选项指示进行长久监听, 如果已经存在一致行为的监听, 则忽略
      * @param options 监听包装选项, 标识普通或代理及其他特征
      * @return void 
     */
    on(options: ListenerWrapperOptions | DelegateListenerWrapperOptions) {
      if (this.findAllBy(options).length == 0) {
        const wrapper = this.createWrapper(options, false);
        wrapper.attach();
      }
    },
    /**
     * 按选项指示进行一次性监听, 如果已经存在一致行为的长久监听, 也被忽略
      * @param options 监听包装选项, 标识普通或代理及其他特征
      * @return void 
     */
    one(options: ListenerWrapperOptions | DelegateListenerWrapperOptions) {
      if (this.findAllBy(options).length == 0) {
        const wrapper = this.createWrapper(options, true);
        wrapper.attach();
      }
    },

    /**
     * 按选项指示移除监听, 如果已经不存在一致行为的监听, 则忽略
      * @param options 监听包装选项, 标识普通或代理及其他特征
      * @return void 
     */
    off(options: ListenerWrapperBaseOptions) {
      this.findAllBy(options).forEach(w => w.detach());
    },

    /**
     * 手工触发事件
     * @param element 在哪个元素上触发
     * @param evtType 事件类型, 支援命名空间
     * @param options 自定义的事件参数选项
     * @returns 已经派发的事件对象
     */
    trigger<T>(element: HTMLElement, evtType: string, options?: CustomEventInit<T>) {
      const opt = Object.assign({}, this.defaultCustomEventInit, options);
      const evt = new CustomEvent(ListenerWrapper.properEventType(evtType), opt);
      element.dispatchEvent(evt);
      return evt;
    },

    /**
       * 创建事件监听器包装, 基于给定的包装器选项, 确定应该是普通监听包装, 还是代理包装
       * @param options 包装器选项
       * @param onceOnly 是否一次性监听, 默认为 false
       * @returns 事件监听器包装
       */
    createWrapper(options: ListenerWrapperOptions,
      onceOnly: boolean = false) {
      let w: ListenerWrapper | DelegateListenerWrapper;
      if ("dlgSelector" in options) {
        w = new DelegateListenerWrapper(options as DelegateListenerWrapperOptions, onceOnly);
      } else {
        w = new ListenerWrapper(options, onceOnly);
      }
      return w;
    },

    /**
     * 通过监听包装选项, 在监听包装器注册列表中, 查找这样的包装器, 可能是多个
     * @param options 监听包装选项
     * @returns 找到返回该监听包装器数组, 找不到则数组长度为 0
     */
    findAllBy(options: ListenerWrapperBaseOptions) {
      return [...ListenerWrapper.wrapperRegistry.values()].filter(w => {
        // 监听元素必须相同
        const cond1 = w.element == options.element;

        // 未指定 clientListener, 则指一类事件, 需要 options.evtType 以 . 开头, 
        // 检测的 item 的事件, 以 options.evtType 结尾
        const cond2 = !("clientListener" in options) &&
          options.evtType.startsWith('.') && w.evtType.endsWith(options.evtType);

        // 指定 clientListener, 则要求事件类型相同, 监听器也相同;
        const cond3 = ("clientListener" in options) &&
          w.evtType === options.evtType &&
          w.clientListener === (options as ListenerWrapperOptions).clientListener;

        // 指定 clientListener 的同时, 如果还指定 dlgSelector, 则要求也相同
        const cond4 = !("dlgSelector" in options) ||
          (w as DelegateListenerWrapper).dlgSelector == (options as DelegateListenerWrapperOptions).dlgSelector;

        return cond1 && (cond2 || (cond3 && cond4));
      });
    },
  }
}





//export default EventHandler
