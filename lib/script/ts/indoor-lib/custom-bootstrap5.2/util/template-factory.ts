// /**
//  * --------------------------------------------------------------------------
//  * Bootstrap (v5.2.0): util/template-factory.js
//  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
//  * --------------------------------------------------------------------------
//  */

// // import { DefaultAllowlist, sanitizeHtml } from './sanitizer'
// // import { getElement, isElement } from '../util/index'
// // import SelectorEngine from '../dom/selector-engine'
// // import Config from './config'

// /// <reference path="./config.ts"/>
// /// <reference path="../dom/selector-engine.ts"/>
// /// <reference path="./index.ts"/>
// /// <reference path="./sanitizer.ts"/>

// /// <reference path="../alias.ts"/>

// namespace CustomBootstrap.Util {
//   export class TemplateFactory extends Config {
//     /**
//      * 获取标识 template-factory 配置选项的名称
//      */
//     public static override get NAME() {
//       return "template-factory"; // TemplateFactory
//     }

//     /**
//      * 配置选项
//      */
//     protected override _options: TemplateFactoryConfigOptions;

//     protected static override readonly _defaultOptions: TemplateFactoryConfigOptions = {
//       allowList: DefAlwList, //DefaultAllowlist,
//       content: {}, // { selector : text ,  selector2 : text2 , }
//       extraClass: '',
//       html: false,
//       sanitize: true,
//       //sanitizeFn: null,
//       template: '<div></div>'
//     }

//     // const DefaultType = {
//     //   allowList: 'object',
//     //   content: 'object',
//     //   extraClass: '(string|function)',
//     //   html: 'boolean',
//     //   sanitize: 'boolean',
//     //   sanitizeFn: '(null|function)',
//     //   template: 'string'
//     // }

//     // const DefaultContentType = {
//     //   entry: '(string|element|function|null)',
//     //   selector: '(string|element)'
//     // }


//     /**
//      * 初始化 template-factory 配置项
//      * @param customConfig 用于初始化的配置项
//      */
//     public constructor(customConfig: TemplateFactoryConfigOptions) {
//       super();
//       const opt = Object.assign({}, TemplateFactory.defaultOptions, customConfig);
//       this._options = this._generateOptions(opt);
//     }


//     // Public
//     public getContent() {
//       return Object.values(this._options.content)
//         .map(v => this._resolvePossibleFunction(v))
//         .filter(Boolean) // 等价于 .filter( x=>Boolean(x)), 即只录取 "trueth" 型数据
//     }

//     hasContent() {
//       return this.getContent().length > 0
//     }

//     changeContent(content) {
//       this._checkContent(content)
//       this._config.content = { ...this._config.content, ...content }
//       return this
//     }

//     toHtml() {
//       const templateWrapper = document.createElement('div')
//       templateWrapper.innerHTML = this._maybeSanitize(this._config.template)

//       for (const [selector, text] of Object.entries(this._config.content)) {
//         this._setContent(templateWrapper, text, selector)
//       }

//       const template = templateWrapper.children[0]
//       const extraClass = this._resolvePossibleFunction(this._config.extraClass)

//       if (extraClass) {
//         template.classList.add(...extraClass.split(' '))
//       }

//       return template
//     }

//     // Private
//     _typeCheckConfig(config) {
//       super._typeCheckConfig(config)
//       this._checkContent(config.content)
//     }

//     _checkContent(arg) {
//       for (const [selector, content] of Object.entries(arg)) {
//         super._typeCheckConfig({ selector, entry: content }, DefaultContentType)
//       }
//     }

//     _setContent(template, content, selector) {
//       const templateElement = SelectorEngine.findOne(selector, template)

//       if (!templateElement) {
//         return
//       }

//       content = this._resolvePossibleFunction(content)

//       if (!content) {
//         templateElement.remove()
//         return
//       }

//       if (isElement(content)) {
//         this._putElementInTemplate(getElement(content), templateElement)
//         return
//       }

//       if (this._config.html) {
//         templateElement.innerHTML = this._maybeSanitize(content)
//         return
//       }

//       templateElement.textContent = content
//     }

//     _maybeSanitize(arg) {
//       return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg
//     }

//     /**
//      * 解析指定参数为字符串
//      * @param arg 指定参数
//      * @returns 参数为 string, 则原样返回; 为 TFParser 函数, 则以本 TemplateFactory 为参数, 
//      * 调用该函数, 以其返回的字符串为返回值.
//      */
//     _resolvePossibleFunction(arg: string | TFParser) {
//       //return typeof arg === 'function' ? arg(this) : arg
//       return typeof arg === 'string' ? arg : arg(this);
//     }

//     _putElementInTemplate(element, templateElement) {
//       if (this._config.html) {
//         templateElement.innerHTML = ''
//         templateElement.append(element)
//         return
//       }

//       templateElement.textContent = element.textContent
//     }
//   }
// }


// //export default TemplateFactory
