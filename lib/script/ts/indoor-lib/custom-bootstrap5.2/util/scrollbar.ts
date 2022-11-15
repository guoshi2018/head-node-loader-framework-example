/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): util/scrollBar.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

//import SelectorEngine from '../dom/selector-engine'
//import Manipulator from '../dom/manipulator'
//import { isElement } from './index'
/// <reference path="../dom/selector-engine.ts"/>
/// <reference path="../dom/manipulator.ts"/>
/// <reference path="./index.ts"/>

/// <reference path="../alias.ts"/>
namespace CustomBootstrap.Util {
  // const DomManp = CustomBootstrap.Dom.Manipulator;
  // const UIndex = CustomBootstrap.Util.Index;
  // const SltEg = CustomBootstrap.Dom.SelectorEngine;
  /**
   * 为 document 文档窗口垂直滚动条提供一些渐变方法, 这个没多少意思
   */
  export class ScrollBarHelper {
    /**
   * Constants
   */

    private static readonly SELECTOR_FIXED =
      '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'
    private static readonly SELECTOR_STICKY_TOP = '.sticky-top'
    private static readonly PROPERTY_PADDING_RIGHT = 'padding-right'
    private static readonly PROPERTY_MARGIN_RIGHT = 'margin-right'

    private _element: HTMLElement;

    public constructor() {
      this._element = document.body
    }

    /**
     * 获取滚动条宽度
     * @returns 
     */
    public getWidth() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
      const documentWidth = document.documentElement.clientWidth
      return Math.abs(window.innerWidth - documentWidth)
    }

    /**
     * 隐藏滚动条, 并保存相关属性, 以便恢复滚动条显示时还原
     */
    public hide() {
      const width = this.getWidth()
      this._hideOverFlow()
      // give padding to element to balance the hidden scrollbar width
      this._setElementAttributes(this._element, ScrollBarHelper.PROPERTY_PADDING_RIGHT,
        (calculatedValue: number) => calculatedValue + width)

      // trick: We adjust positive paddingRight and negative marginRight 
      // to sticky - top elements to keep showing fullwidth
      this._setElementAttributes(ScrollBarHelper.SELECTOR_FIXED, ScrollBarHelper.PROPERTY_PADDING_RIGHT,
        (calculatedValue: number) => calculatedValue + width)
      this._setElementAttributes(ScrollBarHelper.SELECTOR_STICKY_TOP, ScrollBarHelper.PROPERTY_MARGIN_RIGHT,
        (calculatedValue: number) => calculatedValue - width)
    }

    /**
     * 还原所有被改变过属性的元素的相关属性
     */
    public reset() {
      this._resetElementAttributes(this._element, 'overflow')
      this._resetElementAttributes(this._element, ScrollBarHelper.PROPERTY_PADDING_RIGHT)
      this._resetElementAttributes(ScrollBarHelper.SELECTOR_FIXED, ScrollBarHelper.PROPERTY_PADDING_RIGHT)
      this._resetElementAttributes(ScrollBarHelper.SELECTOR_STICKY_TOP, ScrollBarHelper.PROPERTY_MARGIN_RIGHT)
    }

    /**
     * 判断当前内容是否溢出
     * @returns true: 是, false: 否
     */
    public isOverflowing() {
      return this.getWidth() > 0
    }

    /**
     * 配置元素的 css overflow 为 hidden, 并保存原始值到 data-bs-overflow
     */
    private _hideOverFlow() {
      this._saveInitialAttribute(this._element, 'overflow')
      this._element.style.overflow = 'hidden'
    }

    /**
     * 
     * @param selector 
     * @param styleProperty 
     * @param callback 
     */
    _setElementAttributes(selector: string | HTMLElement, styleProperty: string, callback: (n: number) => number) {
      const scrollbarWidth = this.getWidth()
      const manipulationCallBack = (ele: HTMLElement) => {
        if (ele !== this._element && window.innerWidth > ele.clientWidth + scrollbarWidth) {
          return
        }

        this._saveInitialAttribute(ele, styleProperty)
        const calculatedValue = window.getComputedStyle(ele).getPropertyValue(styleProperty)
        ele.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`)
      }

      this._applyManipulationCallback(selector, manipulationCallBack)
    }

    /**
     * 保存元素的初始 style css 属性值, 到 data-bs-* 
     * @param element 指定元素
     * @param styleProperty css 属性名称
     */
    _saveInitialAttribute(element: HTMLElement, styleProperty: string) {
      const actualValue = element.style.getPropertyValue(styleProperty)
      if (actualValue) {
        DomManp.setDataAttribute(element, styleProperty, actualValue)
      }
    }

    /**
     * 还原元素的 css 属性值
     * @param selector 如果是 string, 则作为 css 选择器, 查找 this._element 
     *  下的符合该选择器的后代元素(可能是多个)作为目标; 如果是 HTMLElement, 则
     *  以此元素为目标
     * @param styleProperty 需要还原的 css 属性
     */
    _resetElementAttributes(selector: string | HTMLElement, styleProperty: string) {
      const manipulationCallBack = (ele: HTMLElement) => {
        const value = DomManp.getDataAttribute(ele, styleProperty)
        // We only want to remove the property if the value is `null`; the value can also be zero
        if (value === null) {
          ele.style.removeProperty(styleProperty)
        } else {
          DomManp.removeDataAttribute(ele, styleProperty)
          ele.style.setProperty(styleProperty, value)
        }
      }
      this._applyManipulationCallback(selector, manipulationCallBack)
    }

    /**
     * 为给定元素执行(维护性质的)回调函数
     * @param selector 如果是 string, 则作为 css 选择器, 查找 this._element 
     *  下的符合该选择器的后代元素(可能是多个)作为目标; 如果是 HTMLElement, 则
     *  以此元素为目标
     * @param callback 以上述目标元素为参数, 执行的回调函数
     */
    _applyManipulationCallback(selector: string | HTMLElement, callback: (ele: HTMLElement) => void) {

      if (UIndex.isHTMLElement(selector)) {
        callback(selector as HTMLElement)
      } else {
        // for (const ele of SltEg.find(selector as string, this._element)) {
        //   callback(ele)
        // }   
        SltEg.find(selector as string, this._element).forEach(ele => callback(ele));
      }
    }
  }
}


//export default ScrollBarHelper
