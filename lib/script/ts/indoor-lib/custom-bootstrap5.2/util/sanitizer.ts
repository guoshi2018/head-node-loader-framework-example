/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): util/sanitizer.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
namespace CustomBootstrap.Util {
  /**
   * uri 性质的 attribute 名称列表
   */
  const uriAttributeNames = new Set([
    'background',
    'cite',
    'href',
    'itemtype',
    'longdesc',
    'poster',
    'src',
    'xlink:href'
  ])

  /**
   * 代表为屏幕阅读器服务的 attrubute 的正则表达式 
   */
  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i

  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
   */
  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i

  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
   */
  const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i

  // const isAllowedAttribute = (attribute, allowedAttributeNameList) => {
  //   const attributeName = attribute.nodeName.toLowerCase()

  //   if (allowedAttributeNameList.includes(attributeName)) {
  //     if (uriAttributeNames.has(attributeName)) {
  //       return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue))
  //     }

  //     return true
  //   }

  //   // Check if a regular expression validates the attribute.
  //   return allowedAttributeNameList.filter(attributeRegex => attributeRegex instanceof RegExp)
  //     .some(regex => regex.test(attributeName))
  // }

  /**
   * 指定的 attribute, 是否被允许
   * @param attr 指定 attribute
   * @param allowedAttributeNameList 用来参照的 attribute 允许列表, item 可能是字串和正则表达式
   * @returns 被允许返回 true, 否则返回 false
   */
  const isAllowedAttribute = (attr: Attr, allowedAttributeNameList: Array<RegExp | string>) => {
    let ok: boolean;
    const attributeName = attr.name.toLowerCase() // Attr.nodeName 已废弃

    // 属性名被允许,
    if (allowedAttributeNameList.includes(attributeName)) {
      // 1. 如果是 uri 形式的属性, 是否被允许依赖于它的值
      if (uriAttributeNames.has(attributeName)) {
        const v = attr.value || "";   // Attr.nodeValue 已废弃
        ok = Boolean(SAFE_URL_PATTERN.test(v) || DATA_URL_PATTERN.test(v));
      } else {
        // 2. 是非 uri 形式的普通属性, 可以立判为真
        ok = true;
      }
    } else {
      // Check if a regular expression validates the attribute.
      // 属性名明面上不允许, 则检查是否符合正则表达式, 例如 aria-* 形式的属性
      const regs = allowedAttributeNameList.filter(
        attributeRegex => attributeRegex instanceof RegExp) as RegExp[];
      ok = regs.some(reg => reg.test(attributeName))
    }
    return ok;
  }

  /**
   * 默认的属性允许列表对象, 属性名为各个元素标签, 值为该元素对应的允许属性名构成的
   * 数组, item 可能是 string 和 RegRxp. 
   * 注意; '*' 对应的数组, 是所有元素的公共允许属性, 而以该元素为属性名所对应的数组,
   * 才是该元素对应的特有的允许属性名称
   */
  export const DefaultAllowlist: Record<string, Array<string | RegExp>> = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  }

  // export function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
  //   if (!unsafeHtml.length) {
  //     return unsafeHtml
  //   }

  //   if (sanitizeFunction && typeof sanitizeFunction === 'function') {
  //     return sanitizeFunction(unsafeHtml)
  //   }

  //   const domParser = new window.DOMParser()
  //   const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html')
  //   const elements = [].concat(...createdDocument.body.querySelectorAll('*'))

  //   for (const element of elements) {
  //     const elementName = element.nodeName.toLowerCase()

  //     if (!Object.keys(allowList).includes(elementName)) {
  //       element.remove()

  //       continue
  //     }

  //     const attributeList = [].concat(...element.attributes)
  //     const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || [])

  //     for (const attribute of attributeList) {
  //       if (!isAllowedAttribute(attribute, allowedAttributes)) {
  //         element.removeAttribute(attribute.nodeName)
  //       }
  //     }
  //   }
  //   return createdDocument.body.innerHTML
  // }

  /**
   * 将可能存在不安全的html字符串规范化, 凡是不规范的元素标签或属性, 一律移除
   * @param unsafeHtml 不安全的html字符串
   * @param allowList 允许列表对象, 属性名为各个元素标签, 值为该元素对应的允许属性名构成的
   * 数组, item 可能是 string 和 RegRxp. 
   * @param sanitizeFunction 规范化函数, 如指定, 则启用它来进行规范化, 而本函数逻辑退出
   * @returns 返回的 html 字符串为规范化的字符串, 即
   *  1. 元素标签必须被允许;
   *  2. 元素属性必须被允许, 包括:
   *    1) 属性名被允许;
   *    2) 对应属性值被允许;
   */
  export function sanitizeHtml(unsafeHtml: string,
    allowList: Record<string, Array<string | RegExp>>,
    sanitizeFunction?: (html: string) => string) {
    // if (!unsafeHtml.length) {
    //   return unsafeHtml
    // }
    let result = unsafeHtml;
    if (unsafeHtml.length != 0) {
      if (sanitizeFunction) {
        result = sanitizeFunction(unsafeHtml)
      } else {
        const domParser = new window.DOMParser()
        const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html')
        const elements = [...createdDocument.body.querySelectorAll('*')];

        for (const element of elements) {
          const elementName = element.tagName.toLowerCase()

          if (!Object.keys(allowList).includes(elementName)) {
            // 移除不被允许的元素
            element.remove();
          } else {
            // 元素被允许, 则看属性是否被允许
            const attributeList = [...element.attributes];
            const allowedAttributes = [...allowList['*'], ...allowList[elementName]]

            // 发现不允许的属性, 则移除
            for (const attribute of attributeList) {
              if (!isAllowedAttribute(attribute, allowedAttributes)) {
                element.removeAttribute(attribute.nodeName)
              }
            }
          }
        }
        result = createdDocument.body.innerHTML;
      }
    }
    return result;
  }
}

