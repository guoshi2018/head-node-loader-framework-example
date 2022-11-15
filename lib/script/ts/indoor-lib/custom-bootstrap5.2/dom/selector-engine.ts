/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): dom/selector-engine.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

//import { isDisabled, isVisible } from '../util/index'
/// <reference path="../util/index.ts";
/**
 * Constants
 */
namespace CustomBootstrap.Dom {
  export const SelectorEngine = {
    /**
     * 查找指定元素下所有的符合选择符的后代元素
     * @param selector css 选择符
     * @param element 指定元素, 默认为文档 document
     * @returns 所有的符合选择符的后代元素
     */
    find(selector: string, element: Element = document.documentElement) {
      // 原版这样绕一圈使用 querySelectorAll, 很无聊啊
      //return [].concat(...Element.prototype.querySelectorAll.call(element, selector))
      return [...element.querySelectorAll(selector)] as HTMLElement[];
    },

    /**
     * 查找指定元素下第一个符合选择符的后代元素
     * @param selector css 选择符
     * @param element 指定元素, 默认为文档 document
     * @returns 第一个符合选择符的后代元素
     */
    findOne(selector: string, element: Element = document.documentElement) {
      // 无聊, 同上
      //return Element.prototype.querySelector.call(element, selector);
      return element.querySelector(selector) as Element;
    },

    /**
     * 查找指定元素下所有符合选择符的子元素(注意只是子级)
     * @param selector css 选择符
     * @param element 指定元素
     * @returns 符合选择符的子元素(注意只是子级)
     */
    children(element: Element, selector: string) {
      // 无聊, 应该是 ES5 时候写的
      //return [].concat(...element.children).filter(child => child.matches(selector))
      return [...element.children].filter(child => child.matches(selector));
    },

    /**
     * 获取指定元素的所有的符合选择符的祖先级元素, 不包含自身
     * @param element 指定元素
     * @param selector 选择符
     * @returns 所有的符合选择符的祖先级元素, 不包含自身
     * @deprecated 名称不精准, 算法有冗余, 主要是循环结构的选取上. 
     * 已废弃, 以 ancestors 代替. 
     */
    parents(element: Element, selector: string) {
      const parents = []
      //let ancestor = element.parentNode?.closest(selector)
      let ancestor = element.parentElement?.closest(selector);

      while (ancestor) {
        parents.push(ancestor)
        //ancestor = ancestor.parentNode.closest(selector)
        ancestor = ancestor.parentElement?.closest(selector);
      }
      return parents
    },

    /**
     * 获取指定元素的所有的符合选择符的祖先级元素, 不包含自身
     * @param element 指定元素
     * @param selector 选择符
     * @returns 所有的符合选择符的祖先级元素, 不包含自身. 替代原版 parents
     */
    ancestors(element: Element, selector: string) {
      const ancs = [];
      let current: Element | null = element;
      while ((current = current.parentElement)) {
        current.matches(selector) && ancs.push(current);
      }
      return ancs;
    },

    /**
     * 查找指定元素的符合选择符的第一个前兄弟元素
     * @param element 指定元素
     * @param selector 选择符
     * @returns 符合选择符的第一个前兄弟元素作为唯一 item 的数组. 无则返回空数组 []
     * @deprecated 已废弃. 很怪异, 既然是已经采用循环, 怎么不多返回几个呢.
     * @remark 应根据情况, 使用 firstPrevSibling 或 prevSiblings
     */
    prev(element: Element, selector: string) {
      let previous = element.previousElementSibling

      while (previous) {
        if (previous.matches(selector)) {
          return [previous]
        }
        previous = previous.previousElementSibling
      }
      return []
    },

    /**
     * 查找指定元素的符合选择符的第一个前兄弟元素
     * @param element 指定元素
     * @param selector 选择符
     * @returns 符合选择符的第一个前兄弟元素, 没有则返回 null
     */
    firstPrev(element: Element, selector: string) {
      let target: Element | null = null;
      let prev: Element | null = element;
      while ((prev = prev.previousElementSibling)) {
        if (prev.matches(selector)) {
          target = prev;
          break;
        }
      }
      return target;
    },

    /**
     * 查找指定元素的符合选择符的所有前兄弟元素
     * @param element 指定元素
     * @param selector 选择符
     * @returns 符合选择符的所有前兄弟元素, 没有则返回 空数组 []
     */
    prevSiblings(element: Element, selector: string) {
      let targets: Element[] = [];
      let prev: Element | null = element;
      while ((prev = prev.previousElementSibling)) {
        prev.matches(selector) && targets.push(prev);
      }
      return targets;
    },


    // TODO: this is now unused; remove later along with prev()
    /**
     * 查找指定元素的符合选择符的第一个后兄弟元素
     * @param element 指定元素
     * @param selector 选择符
     * @returns 符合选择符的第一个后兄弟元素作为唯一 item 的数组. 无则返回空数组 []
     * @deprecated 已废弃. 很怪异, 既然是已经采用循环, 怎么不多返回几个呢.
     * @remark 应根据情况, 使用 firstNextSibling 或 nextSiblings
     */
    next(element: Element, selector: string) {
      let next = element.nextElementSibling

      while (next) {
        if (next.matches(selector)) {
          return [next]
        }
        next = next.nextElementSibling
      }
      return []
    },

    /**
       * 查找指定元素的符合选择符的第一个后兄弟元素
       * @param element 指定元素
       * @param selector 选择符
       * @returns 符合选择符的第一个后兄弟元素, 没有则返回 null
       */
    firstNext(element: Element, selector: string) {
      let target: Element | null = null;
      let next: Element | null = element;
      while ((next = next.nextElementSibling)) {
        if (next.matches(selector)) {
          target = next;
          break;
        }
      }
      return target;
    },

    /**
     * 查找指定元素的符合选择符的所有后兄弟元素
     * @param element 指定元素
     * @param selector 选择符
     * @returns 符合选择符的所有后兄弟元素, 没有则返回 空数组 []
     */
    nextSiblings(element: Element, selector: string) {
      let targets: Element[] = [];
      let next: Element | null = element;
      while ((next = next.nextElementSibling)) {
        next.matches(selector) && targets.push(next);
      }
      return targets;
    },

    /**
     * 查找指定元素下, 所有可聚焦的可见的可用的后代元素
     * @param element 指定元素
     * @returns 所有可聚焦的可见的可用的后代元素数组, 没有则返回空数组
     */
    focusableChildren(element: HTMLElement) {
      const focusables = [
        'a',
        'button',
        'input',
        'textarea',
        'select',
        'details',
        '[tabindex]',
        '[contenteditable="true"]'
      ].map(selector => `${selector}:not([tabindex^="-"])`).join(',')

      return this.find(focusables, element).filter(el =>
        !CustomBootstrap.Util.Index.isDisabled(el) && CustomBootstrap.Util.Index.isVisible(el))
    }
  }
}


//export default SelectorEngine
