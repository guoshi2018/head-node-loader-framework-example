
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): util/index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

namespace CustomBootstrap.Util {
  export class Index {
    /**
     * 用来指定产生的随机数的上限
     */
    private static readonly MAX_UID = 1_000_000

    /**
     * 转化为毫秒数, 需要乘的倍率
     */
    private static readonly MILLISECONDS_MULTIPLIER = 1000

    /**
     * 过渡结束(完成)事件的 type 
     */
    private static readonly TRANSITION_END = 'transitionend'

    /**
     * DOMContenLoad 事件的监听器回调函数列表
     */
    private static DOMContentLoadedCallbacks: Array<(evt?: Event) => void> = [];

    // Shout-out Angus Croll (https://goo.gl/pxwQGp)
    /**
     * 将对象转换为其对应的类型的字符串, 即获取对象的类型字符串. 
     * @param o 对象的类型字符串, 注意, 基础类型, 返回的是大写开头的字符串,
     * @returns 对象的类型字符串, 注意, 基础类型, 返回的是小写开头的字符串,
     * 即 boolean, number, date 等, 自定义对象, 匿名对象均返回 object, 
     * @deprecated 已废弃, 请使用 toType
     */
    public static toType_Orig(o: any) {
      if (o === null || o === undefined) {
        return `${o}`
      }
      //@ts-ignore
      return Object.prototype.toString.call(o).match(/\s([a-z]+)/i)[1].toLowerCase();
    }

    /**
     * 将对象转换为其对应的类型的字符串, 即获取对象的类型字符串
     * @param o 指定对象
     * @param lowerBaseType 基础类型(包括 Object)是否小写, 默认 true. 
     * @returns 对象的类型字符串. 其中,
     * 1. 基础类型, 受 lowerBaseType 控制. 
     *    lowerBaseType(默认为 true): 
     *    1) 为 true 时返回的是全部小写的类型字符串, 例如 boolean, number, object, date, regexp, function 等;
     *    2) 为 false 时返回大写开头的类型字符串, 例如 Boolean, Number, Date, RegExp, Function 等; 
     * 2. 自定义对象返回其对应 class, 大小写与定义相同, 不受 lowerBaseType 控制
     */
    public static toType(o: any, lowerBaseType: boolean = true): string {
      let t = Object.prototype.toString.call(o).slice(8, -1); // [object XXX]
      if (lowerBaseType) {
        t = t.toLowerCase();
      }

      t = t.toLowerCase() == "object" ? o.constructor.name : t;
      if (t == 'Object' && lowerBaseType) {
        t = 'object';
      }
      return t;
    }


    /**
     * 获取保证不同于当前整个页面任何元素 id 的值
     * @param prefix 需要指定的 id 前缀
     * @returns 唯一 id
     */
    public static getUID(prefix: string): string {
      do {
        prefix += Math.floor(Math.random() * this.MAX_UID)
      } while (document.getElementById(prefix))
      return prefix
    }

    /**
     * 获取元素的目标选择器.
     * @param element 指定元素
     * @returns 目标选择器, data-bs-target 优先于 href 
     * @deprecated 已弃用，因存在一点点瑕疵，请使用 getSelector
     */
    public static getSelector_orig(element: HTMLElement) {
      let selector = element.getAttribute('data-bs-target')

      if (!selector || selector === '#') {
        let hrefAttribute = element.getAttribute('href')

        // The only valid content that could double as a selector are IDs or classes,
        // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
        // `document.querySelector` will rightfully complain it is invalid.
        // See https://github.com/twbs/bootstrap/issues/32273
        if (!hrefAttribute || (!hrefAttribute.includes('#') && !hrefAttribute.startsWith('.'))) {
          return null
        }

        // Just in case some CMS puts out a full URL with the anchor appended
        if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
          hrefAttribute = `#${hrefAttribute.split('#')[1]}`
        }

        selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null
      }
      return selector
    }
    /**
      * 获取元素的目标选择器
      * @param element 指定元素
      * @returns 目标选择器, data-bs-target 优先于 href 
      */
    public static getSelector(element: HTMLElement) {
      let selector = element.getAttribute('data-bs-target');
      if (!selector || selector === '#') {
        selector = null;
        let href = element.getAttribute('href')

        // href 的合法形式: 
        // 1) .开头, 或 # 开头, 长度必须大于 1
        // 2) 被 # 分隔, 第一个 # 之后到第二个 # 之前(如果有)的长度必须大于0 
        if (href) {
          const hashPos = href.indexOf('#');
          const dotPos = href.indexOf('.');
          if ((hashPos == 0 || dotPos == 0) && href.length > 1) {
            selector = href; // 这里有可能 = '# ' 和 '. '
          } else if (hashPos != -1 && hashPos != 0 && hashPos != href.length - 1) {
            // 保证了存在 [1]
            selector = `#${href.split('#')[1]}`; // 存在2个#时,可能 = '#' 和 '# '
          }
        }
      }
      const temp = selector ? selector.trim() : null;
      return temp == "#" || temp == "." ? null : temp;
    }

    /**
     * 根据元素的 data-bs-target / href 属性, 获取元素的目标选择器. 
     * 注意: 这是在 getSelector 的基础上， 添加 selector 有效的条件， 
     * 即不但 selector 不为 null, 还需要通过 selector 能查询到真实的目标元素。 
     * @param element 指定获取目标选择器的元素
     * @returns 有效的目标选择器， 其他均返回 null(即使选择器合法, 但无元素与之对应)
     */
    public static getSelectorFromElement(element: HTMLElement) {
      // const selector = this.getSelector(element)
      // if (selector) {
      //   return document.querySelector(selector) ? selector : null
      // }
      // return null
      const selector = this.getSelector(element);
      return selector && document.querySelector(selector) ? selector : null;
    }
    /**
     * 根据元素的 data-bs-target / href 属性, 获取元素的目标元素.
     * @param element 指定获取目标元素的元素
     * @returns data-bs-target / href 属性合法, 且能查询到有效的目标元素, 则返回该元素, 
     * 其余均返回 null
     */
    public static getElementFromSelector(element: HTMLElement) {
      const selector = this.getSelector(element)
      return selector ? document.querySelector(selector) : null
    }

    /**
     * 获取元素的 transition-duration 与 transition-delay 的毫秒数之和. 
     * @param element 指定元素
     * @returns 两者之和. 
     * @deprecated 已废弃, 请使用 getTransitionDuraDelay
     */
    public static getTransitionDurationFromElement(element: HTMLElement) {
      if (!element) { // 对于 ts 调用, 不需要, 因为 element 必不为 null / undefined 之类
        return 0
      }

      // Get transition-duration of the element
      let { transitionDuration, transitionDelay } = window.getComputedStyle(element)

      const floatTransitionDuration = Number.parseFloat(transitionDuration)
      const floatTransitionDelay = Number.parseFloat(transitionDelay)

      // Return 0 if element or transition duration is not found
      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0
      }

      // If multiple durations are defined, take the first
      transitionDuration = transitionDuration.split(',')[0]
      transitionDelay = transitionDelay.split(',')[0]

      return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * this.MILLISECONDS_MULTIPLIER
    }

    /**
     * 获取元素的 transition-duration 与 transition-delay 的毫秒数之和. 
     * @param element 指定元素
     * @returns 两者之和. 对于一个属性, 如果声明多个值, 以第一个计;
     *  未声明者返回 0, 然后与另一个相加
     */
    public static getTransitionDuraDelay(element: HTMLElement) {
      /**
       * 将指定的 transition-duration / transition-delay 字符串, 转换为秒为单位的 number
       * @param value transition-duration / transition-delay 字符串, 
       * @returns  秒为单位的 number. 字符串如果包含以逗号分隔的多个值, 则以第一个为准
       */
      function _toSeconds(value: string) {
        const n = Number.parseFloat(value.split(',')[0]);
        return Number.isNaN(n) ? 0 : n;
      }
      let { transitionDuration, transitionDelay } = window.getComputedStyle(element)
      return (_toSeconds(transitionDuration) + _toSeconds(transitionDelay)) * this.MILLISECONDS_MULTIPLIER
    }

    /**
     * 触发过渡结束事件
     * @param element 指定在哪个元素上派发该事件
     */
    public static triggerTransitionEnd(element: HTMLElement) {
      element.dispatchEvent(new Event(this.TRANSITION_END))
    }

    /**
     * 指定对象是否是 Element ,已废弃, 请使用 isElement
     * @param object 指定对象, 如果是带 jquery 属性的对象, 则以第一个为准
     * @returns 是返回 true, 否则返回 false
     * @deprecated
     * 注意: 判断以是否有 nodeType 属性为依据
     */
    public static isElement_orig(object: any) {
      if (!object || typeof object !== 'object') {
        return false
      }
      if (typeof object.jquery !== 'undefined') {
        object = object[0]
      }
      return typeof object.nodeType !== 'undefined'
    }

    /**
     * 指定对象是否是 Element 
     * @param object 指定对象, 如果是带 jquery 属性的对象, 则测试第一个
     * @returns 是返回 true, 否则返回 false
     * 注意: 最终判断使用 instanceof
     */
    public static isElement(object: any) {
      let ok = false;
      if (object && typeof object === 'object') { // typeof null = 'object' 
        if (typeof object.jquery !== 'undefined') {
          object = object[0]
        }
        ok = object instanceof Element;
      }
      return ok;
    }

    /**
     * 指定对象是否是 HTMLElement 
     * @param object 指定对象, 如果是带 jquery 属性的对象, 则测试第一个
     * @returns 是返回 true, 否则返回 false
     * 注意: 最终判断使用 instanceof
     */
    public static isHTMLElement(object: any) {
      let ok = false;
      if (object && typeof object === 'object') {
        if (typeof object.jquery !== 'undefined') {
          object = object[0]
        }
        ok = object instanceof HTMLElement;
      }
      return ok;
    }

    /**
     * 根据给定的的参数, 返回正确的 Element 对象.
     * @param arg 指定参数
     * @returns 正确的 Element 对象.
     * 1) arg 是字符串且非空, 则返回符合该字符串为选择符的第一个元素 Element
     * 2) arg 自身就是 Element:
     *  (1) arg 是 jquery 对象, 则返回其第一个
     *  (2) arg 不是 jquery 对象, 则返回自身
     * 3) 其他情况, 返回 null
     */
    public static getElement(arg: any): Element | null {
      // it's a jQuery object or a node element
      // if (this.isElement(arg)) {
      //   return arg.jquery ? arg[0] : arg
      //   }
      // if (typeof arg === 'string' && arg.length > 0) {
      //   return document.querySelector(arg)
      //   }
      // return null
      let result: Element | null = null;
      if (typeof arg === 'string' && arg.length > 0) {
        result = document.querySelector(arg);
      } else if (this.isElement(arg)) {
        result = arg.jquery ? arg[0] : arg;
      }
      return result;
    }

    /**
     * 根据给定的的参数, 返回正确的 HTMLElement 对象.
     * @param arg 指定参数
     * @returns 正确的 Element 对象.
     * 1) arg 是字符串且非空, 则返回符合该字符串为选择符的第一个元素 HTMLElement
     * 2) arg 自身就是 HTMLElement:
     *  (1) arg 是 jquery 对象, 则返回其第一个
     *  (2) arg 不是 jquery 对象, 则返回自身
     * 3) 其他情况, 返回 null
     */
    public static getHTMLElement(arg: any): Element | null {
      let result: HTMLElement | null = null;
      if (typeof arg === 'string' && arg.length > 0) {
        result = document.querySelector(arg) as HTMLElement;
      } else if (this.isHTMLElement(arg)) {
        result = arg.jquery ? arg[0] : arg;
      }
      return result;
    }

    /**
     * 判断元素是否视觉可见
     * @param element 要判断的元素
     * @returns 视觉可见返回 true; 否则返回 false
     * @deprecated 逻辑比较啰嗦, 有面条嫌疑. 建议使用 isVisible
     * 注意, 视觉可见的条件:
     * 1) 自身以及祖先级元素未隐藏
     * 2) 没有位于被 close 的 details 标签内
     */
    public static isVisible_orig(element: Element) {
      if (!this.isElement(element) || element.getClientRects().length === 0) {
        return false
      }

      const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible'
      // Handle `details` element as its content may falsie appear visible when it is closed
      const closedDetails = element.closest('details:not([open])')

      if (!closedDetails) {
        return elementIsVisible
      }
      if (closedDetails !== element) {
        const summary = element.closest('summary')
        if (summary && summary.parentNode !== closedDetails) {
          return false
        }
        if (summary === null) {
          return false
        }
      }
      return elementIsVisible
    }

    /**
     * 判断元素是否视觉可见
     * @param element 要判断的元素
     * @returns 视觉可见返回 true; 否则返回 false
     * 注意, 视觉可见的条件:
     * 1) 自身以及祖先级元素 css 属性 visibility = visible
     * 2) 没有位于被 close 的 details 标签内
     */
    public static isVisible(element: Element) {
      let vis = false;

      // 如果连基本的 ClientRect 都没有, 就不用混了, 没法可见
      // 例如它或者它的祖先级被隐藏, 则物理上就不可见, 不管它的 css 属性 visible 如何.
      if (element.getClientRects().length !== 0) {

        // 默认按 visible 属性值
        vis = getComputedStyle(element).getPropertyValue('visibility') === 'visible'

        const closedDetails = element.closest('details:not([open])')

        // 如果元素位于被关闭的 details 内, 则要看 summary 的情况
        if (closedDetails && closedDetails !== element) {

          const summary = element.closest('summary')
          // 如果元素没有位于 summary 内; 或者位于 summary 内, 但此时的 summary 已不是
          // 关闭状态的 details 的直接子级(即: 该 summary 为 details 的孙辈或以下, 此时
          // summary 已经不起折叠展开作用, 所以其父级被 details 认为是内容而不显示),
          // 则判定为不可见
          if (summary === null || summary.parentElement !== closedDetails) {
            vis = false;
          }
        }
      }
      return vis;
    }


    /**
     * 元素是否被禁用
     * @param element 要判断的元素
     * @returns 被禁用返回 true, 否则返回 false.
     * @deprecated 有些许错误和不合理, 已废弃, 请使用 isDisabled
     */
    public static isDisabled_orig(element: any) {
      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        return true
      }

      if (element.classList.contains('disabled')) {
        return true
      }

      if (typeof element.disabled !== 'undefined') {
        return element.disabled
      }

      return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false'
    }

    /**
     * 元素是否被禁用
     * @param element 要判断的元素
     * @returns 被禁用返回 true, 否则返回 false.
     */
    public static isDisabled(element: Element) {
      // 促使 javascript 属性 disabled 无效的值列表
      const enabledWorkers = [NaN, undefined, "", false, 0,]
      return element.classList.contains('disabled') ||
        //@ts-ignore
        !enabledWorkers.includes(element.disabled) || element.hasAttribute('disabled');
    }

    /**
     * 查找元素的 shadow-root
     * @param element 指定元素
     * @returns 找到返回 shadow-root, 否则返回 null
     * @deprecated 已废弃, 请使用 findShadowRoot.
     * 查找顺序:
     *  1. 浏览器不支援 shadow-root, 返回 null
     *  2. 浏览器支援 shadow-root:
     *    1). 浏览器支援 getRootNode, 则元素从自身向上级查找, 直至文档根部
     *      a) 查找到 shadow-root 则返回.
     *      b) 查找不到, 则返回 null
     *    2). 浏览器不支援 getRootNode, 则检查元素本身是否 shadow-root:
     *      a) 是则返回自身
     *      b) 否则, 检查父节点是否为空
     *        (1) 是则返回 null
     *        (2) 否则, 按上述逻辑检查父节点(递归调用)
     */
    //@ts-ignore
    public static findShadowRoot_orig(element: Element | ShadowRoot) {
      if (!document.documentElement.attachShadow) {
        return null
      }

      // Can find the shadow root otherwise it'll return the document
      if (typeof element.getRootNode === 'function') {
        const root = element.getRootNode()
        return root instanceof ShadowRoot ? root : null
      }

      if (element instanceof ShadowRoot) {
        return element
      }

      // when we don't find a shadow root
      if (!element.parentNode) {
        return null
      }
      //@ts-ignore
      return this.findShadowRoot_orig(element.parentElement)
    }

    /**
     * 查找元素的 shadow-root
     * @param element 指定元素(可能本身就是 shadow-root)
     * @returns 找到返回 shadow-root, 否则返回 null
     * 查找顺序:
     *  1. 浏览器不支援 shadow-root, 返回 null
     *  2. 浏览器支援 shadow-root:
     *    1). 浏览器支援 getRootNode, 则元素从自身向上级查找, 直至文档根部
     *      a) 查找到 shadow-root 则返回.
     *      b) 查找不到, 则返回 null
     *    2). 浏览器不支援 getRootNode, 则检查元素本身是否 shadow-root:
     *      a) 是则返回自身
     *      b) 否则, 检查父节点是否为空
     *        (1) 是则返回 null
     *        (2) 否则, 按上述逻辑检查父节点(递归调用)
     */
    public static findShadowRoot(element: Element | ShadowRoot): ShadowRoot | null {
      let sr: ShadowRoot | null = null;
      if (typeof element.getRootNode === 'function') {
        const root = element.getRootNode()
        sr = root instanceof ShadowRoot ? root : null
      } else if (element instanceof ShadowRoot) {
        sr = element as ShadowRoot;
      } else if (element.parentElement) {
        sr = this.findShadowRoot(element.parentElement);
      }
      return sr;
    }

    /**
     * 空操作
     */
    public static noop() { }

    /**
     * Trick to restart an element's animation
     * 重启元素动画的小把戏
     *
     * @param {HTMLElement} element
     * @return void
     *
     * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
     */
    // public static reflow = (element: HTMLElement) => {
    //   element.offsetHeight // eslint-disable-line no-unused-expressions
    // }
    /**
     * 通过获取某个参数(本例是 offsetHeight), 后续马上设置 css, 以模拟动画.
     * @param element 
     */
    public static reflow(element: HTMLElement) {
      element.offsetHeight;
    }

    /**
     * 获取 window.jQuery 对象
     * @returns window.jQuery 对象
     * 注意: 成功返回的条件是已经引入 jQuery, 同时 body 没有附加属性 data-bs-no-jquery,
     * 缺一不可, 否则返回 null
     */
    public static getjQuery() {
      let jq = null;
      //@ts-ignore
      if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
        //@ts-ignore
        jq = window.jQuery;
      }
      return jq;
    }

    /**
     * 监听文档的 DOMContentLoaded 事件
     * @param callback 回调函数
     * @remark 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 
     * 事件被触发，而无需等待样式表、图像和子框架的完全加载
     */
    public static onDOMContentLoaded(callback: (evt?: Event) => void) {
      if (document.readyState === 'loading') {
        // add listener on the first call when the document is in loading state
        if (!this.DOMContentLoadedCallbacks.length) {
          document.addEventListener('DOMContentLoaded', (evt: Event) => {
            for (const callback of this.DOMContentLoadedCallbacks) {
              callback(evt);
            }
          })
        }
        this.DOMContentLoadedCallbacks.push(callback)
      } else {
        callback()
      }
    }

    /**
     * 当前文档书写方向是否 right to left
     * @returns 是则返回 true, 否则返回 false
     */
    public static isRTL() {
      return document.documentElement.dir === 'rtl';
    }

    // 迁移到 base-component, 避免循环引用
    // public static defineJQueryPlugin = (pluginClass:typeof BaseComponent) => {
    //     this.onDOMContentLoaded(() => {
    //       const $ = this.getjQuery()
    //       /* istanbul ignore if */
    //       if ($) {
    //         const name = pluginClass.NAME
    //         const JQUERY_NO_CONFLICT = $.fn[name]
    //         $.fn[name] = pluginClass.jQueryInterface
    //         $.fn[name].Constructor = pluginClass
    //         $.fn[name].noConflict = () => {
    //           $.fn[name] = JQUERY_NO_CONFLICT
    //           return pluginClass.jQueryInterface
    //         }
    //       }
    //     })
    //   }

    /**
     * 执行指定的回调函数
     * @param callback : 回调函数
     * @return void
     * @deprecated 已废弃, 由于内置类型检查的缘故, 可以直接调用 callback() 
     */
    public static execute(callback: () => any) {
      if (typeof callback === 'function') {
        callback()
      }
    }

    // /**
    //  * 延时执行指定函数, 时机位于 transition-duration 与 transition-delay 属性的毫秒数之和之后.
    //  * 并受 参数 waitForTransition 控制
    //  * @param callback 要执行的函数
    //  * @param transitionElement 将会执行变换的元素
    //  * @param waitForTransition true(默认): 等待变换完成, 才执行函数; false: 直接执行函数, 并返回
    //  * @returns void
    //  */
    // public static executeAfterTransition(callback: () => any, transitionElement: HTMLElement,
    //   waitForTransition: boolean = true) {
    //   if (waitForTransition) {
    //     // 时限余地
    //     const durationPadding = 5
    //     const emulatedDuration = this.getTransitionDuraDelay(transitionElement) + durationPadding

    //     let called = false
    //     const handler = ({ target }: Event) => {
    //       // 冒泡来的事件, 忽略. 所以, 最好不使用 addEventListener 时,
    //       // 设置 once 的方式来移除事件监听
    //       if (target === transitionElement) {
    //         called = true
    //         transitionElement.removeEventListener(this.TRANSITION_END, handler)
    //         this.execute(callback)
    //       }
    //     };
    //     transitionElement.addEventListener(this.TRANSITION_END, handler)
    //     setTimeout(() => {
    //       if (!called) {
    //         this.triggerTransitionEnd(transitionElement)
    //       }
    //     }, emulatedDuration)
    //   } else {
    //     this.execute(callback)
    //   }
    // }

    /**
     * 延时执行指定函数, 时机位于 transition-duration 与 transition-delay 属性的毫秒数之和之后.
     * 并受 参数 waitForTransition 控制 
     * @param callback 要执行的函数
     * @param transitionElement 将会执行变换的元素
     * @param waitForTransition true(默认): 等待变换完成, 才执行函数; false: 直接执行函数, 并返回
     * @returns void
     * @remark 注意, 原版饶了一个圈, 其实仅仅 setTimeout 就可以搞定.
     */
    public static executeAfterTransition(callback: () => any, transitionElement: HTMLElement,
      waitForTransition: boolean = true) {
      if (waitForTransition) {
        // 时限余地
        const durationPadding = 5;
        const emulatedDuration = this.getTransitionDuraDelay(transitionElement) + durationPadding;
        setTimeout(() => {
          //this.execute(callback)
          callback();
        }, emulatedDuration)
      } else {
        //this.execute(callback)
        callback();
      }
    }





    /**
     * Return the previous/next element of a list.
     *
     * @param  list    The list of elements
     * @param activeElement   The active element
     * @param shouldGetNext   Choose to get next or previous element
     * @param isCycleAllowed
     * @return The proper element
     * @deprecated 当前元素不存在, 且为循环获取时, 逻辑反人类. 其他地方还有冗余. 已废弃, 请使用
     *  nextElement
     */
    public static getNextActiveElement(list: Array<any>, activeElement: any, shouldGetNext: boolean, isCycleAllowed: boolean) {
      const listLength = list.length
      let index = list.indexOf(activeElement)

      // if the element does not exist in the list return an element
      // depending on the direction and if cycle is allowed
      if (index === -1) {
        //return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0]
        return shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0]
      }
      index += shouldGetNext ? 1 : -1
      if (isCycleAllowed) {
        index = (index + listLength) % listLength
      }
      return list[Math.max(0, Math.min(index, listLength - 1))]
    }

    /**
   * 获取当前列表中, 当前元素的后一个或前一个元素
   * @param list 列表
   * @param current 当前元素
   * @param forNext true: 表示获取后一个; false: 表示获取前一个元素
   * @param cycled 
   *  true: 循环方式获取, 即最后一个的后一个是第一个, 第一个的前一个是最后一个;
   *  false: 
   * @return 目标元素
   *  逻辑:
   *    1. 当前元素不存在于列表:
   *      1) 非循环方式: 返回首位元素
   *      2) 循环方式: (该情况与原版相反, 新修原版已更正为与此相一致)
   *        (1) 找后一个: 返回末尾元素
   *        (2) 找前一个: 返回首位元素
   *    2. 当前元素存在于列表, 若序号为 index, 则找后一个, 为 tgtIdx=index+1; 
   *      找前一个, 为 tgtIdx=index-1
   *    3. 如果允许循环方式, 则修正序号, 使之在有效范围内
   *       
   */
    public static nextItem<T>(list: Array<T>, current: T, forNext: boolean, cycled: boolean) {
      let tgtIdx: number;
      const listLength = list.length
      let index = list.indexOf(current);

      // if the element does not exist in the list return an element
      // depending on the direction and if cycle is allowed
      if (index === -1) {
        tgtIdx = forNext && cycled ? listLength - 1 : 0;
      } else {
        tgtIdx = forNext ? index + 1 : index - 1;
        if (cycled) {
          // + listLength 可保证正值, 此时的 tgtIdx 必然合规
          // 所以不需要后面的最大最小限制修正
          tgtIdx = (tgtIdx + listLength) % listLength
        } else {
          tgtIdx = Math.max(0, Math.min(tgtIdx, listLength - 1));
        }
      }
      return list[tgtIdx];
    }
  }
}


// export {
//   defineJQueryPlugin,
//   execute,
//   executeAfterTransition,
//   findShadowRoot,
//   getElement,
//   getElementFromSelector,
//   getjQuery,
//   getNextActiveElement,
//   getSelectorFromElement,
//   getTransitionDurationFromElement,
//   getUID,
//   isDisabled,
//   isElement,
//   isRTL,
//   isVisible,
//   noop,
//   onDOMContentLoaded,
//   reflow,
//   triggerTransitionEnd,
//   toType
// }
