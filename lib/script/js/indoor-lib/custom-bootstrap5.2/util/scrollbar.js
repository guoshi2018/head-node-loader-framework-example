"use strict";
var CustomBootstrap;
(function (CustomBootstrap) {
    var Util;
    (function (Util) {
        class ScrollBarHelper {
            constructor() {
                this._element = document.body;
            }
            getWidth() {
                const documentWidth = document.documentElement.clientWidth;
                return Math.abs(window.innerWidth - documentWidth);
            }
            hide() {
                const width = this.getWidth();
                this._hideOverFlow();
                this._setElementAttributes(this._element, ScrollBarHelper.PROPERTY_PADDING_RIGHT, (calculatedValue) => calculatedValue + width);
                this._setElementAttributes(ScrollBarHelper.SELECTOR_FIXED, ScrollBarHelper.PROPERTY_PADDING_RIGHT, (calculatedValue) => calculatedValue + width);
                this._setElementAttributes(ScrollBarHelper.SELECTOR_STICKY_TOP, ScrollBarHelper.PROPERTY_MARGIN_RIGHT, (calculatedValue) => calculatedValue - width);
            }
            reset() {
                this._resetElementAttributes(this._element, 'overflow');
                this._resetElementAttributes(this._element, ScrollBarHelper.PROPERTY_PADDING_RIGHT);
                this._resetElementAttributes(ScrollBarHelper.SELECTOR_FIXED, ScrollBarHelper.PROPERTY_PADDING_RIGHT);
                this._resetElementAttributes(ScrollBarHelper.SELECTOR_STICKY_TOP, ScrollBarHelper.PROPERTY_MARGIN_RIGHT);
            }
            isOverflowing() {
                return this.getWidth() > 0;
            }
            _hideOverFlow() {
                this._saveInitialAttribute(this._element, 'overflow');
                this._element.style.overflow = 'hidden';
            }
            _setElementAttributes(selector, styleProperty, callback) {
                const scrollbarWidth = this.getWidth();
                const manipulationCallBack = (ele) => {
                    if (ele !== this._element && window.innerWidth > ele.clientWidth + scrollbarWidth) {
                        return;
                    }
                    this._saveInitialAttribute(ele, styleProperty);
                    const calculatedValue = window.getComputedStyle(ele).getPropertyValue(styleProperty);
                    ele.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
                };
                this._applyManipulationCallback(selector, manipulationCallBack);
            }
            _saveInitialAttribute(element, styleProperty) {
                const actualValue = element.style.getPropertyValue(styleProperty);
                if (actualValue) {
                    CustomBootstrap.DomManp.setDataAttribute(element, styleProperty, actualValue);
                }
            }
            _resetElementAttributes(selector, styleProperty) {
                const manipulationCallBack = (ele) => {
                    const value = CustomBootstrap.DomManp.getDataAttribute(ele, styleProperty);
                    if (value === null) {
                        ele.style.removeProperty(styleProperty);
                    }
                    else {
                        CustomBootstrap.DomManp.removeDataAttribute(ele, styleProperty);
                        ele.style.setProperty(styleProperty, value);
                    }
                };
                this._applyManipulationCallback(selector, manipulationCallBack);
            }
            _applyManipulationCallback(selector, callback) {
                if (CustomBootstrap.UIndex.isHTMLElement(selector)) {
                    callback(selector);
                }
                else {
                    CustomBootstrap.SltEg.find(selector, this._element).forEach(ele => callback(ele));
                }
            }
        }
        ScrollBarHelper.SELECTOR_FIXED = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
        ScrollBarHelper.SELECTOR_STICKY_TOP = '.sticky-top';
        ScrollBarHelper.PROPERTY_PADDING_RIGHT = 'padding-right';
        ScrollBarHelper.PROPERTY_MARGIN_RIGHT = 'margin-right';
        Util.ScrollBarHelper = ScrollBarHelper;
    })(Util = CustomBootstrap.Util || (CustomBootstrap.Util = {}));
})(CustomBootstrap || (CustomBootstrap = {}));
//# sourceMappingURL=scrollbar.js.map