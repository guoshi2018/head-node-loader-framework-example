/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): dom/manipulator.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

namespace CustomBootstrap.Dom {
  /**
  * 暴露操作 data-bs-* 形式的 data attribute 的一些方法
  */
  export class Manipulator {
    /**
     * 将指定字符串标准化为最恰当类型的值
     * @param value 指定值, 一般来自于 html 元素的某一 attribute
     * @returns 标准值
     */
    private static _normalizeData(value: string | undefined | null): any {
      if (value === 'true') {
        return true
      }

      if (value === 'false') {
        return false
      }

      if (value === Number(value).toString()) {
        return Number(value)
      }

      if (value === '' || value === 'null') {
        return null
      }

      if (typeof value !== 'string') {
        return value
      }

      try {
        return JSON.parse(decodeURIComponent(value))
      } catch {
        return value
      }
    }

    /**
     * 将给定字符串, 标准化为短横线分隔的形式. 主要针对的是驼峰字符串, 例如 abcDevGrog 转换为 abc-dev-grog
     * 其他则保持原状
     * @param key 指定字符串, 
     * @returns 短横线分隔的形式的等价字符串, 一般用来将 js 属性名称转换为 html 属性名称
     */
    private static _normalizeDataKey(key: string): string {
      return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`)
    }

    /**
     * 设置 data-bs-* 风格的 html data 属性
     * @param element 要设置属性的元素
     * @param key data-bs-* 形式的属性名称, 注意不包含前缀 data-bs-, 
     * 如果是驼峰字符串, 则自动转换为标准的短横线分隔的形式
     * @param value 给定的属性值
     */
    public static setDataAttribute(element: HTMLElement, key: string, value: string) {
      element.setAttribute(`data-bs-${this._normalizeDataKey(key)}`, value)
    }

    /**
     * 移除元素的 data-bs-* 风格的 html data 属性
     * @param element 要移除属性的元素
     * @param key data-bs-* 形式的属性名称, 注意不包含前缀 data-bs-, 
     * 如果是驼峰字符串, 则自动转换为标准的短横线分隔的形式
     */
    public static removeDataAttribute(element: HTMLElement, key: string) {
      element.removeAttribute(`data-bs-${this._normalizeDataKey(key)}`)
    }

    /**
     * 获取元素的所有 data-bs-* 风格的 html data 属性, 但不包含 data-bs-config 及 
     * data-bs-config-* 形式的 data 属性.
     * @param element 指定元素
     * @returns 返回以 data-bs-* 属性名称(不包含 data-bs-前缀)为 property, 以该属性值(标准化后)
     * 为 value 的 Record 对象. 注意: 当 element 为 null 或 undefined, 或 element 不包含
     * 任何 data-bs-* 属性(即使包含 data-bs-config-* 形式), 返回 property 数量为 0 的 Record.
     */
    public static getDataAttributes(element: HTMLElement | null | undefined) {
      const attributes: Record<string, any> = {};
      if (element) {
        const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'))

        for (const key of bsKeys) {
          let pureKey = key.replace(/^bs/, '')
          pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length)
          attributes[pureKey] = this._normalizeData(element.dataset[key])
        }
      }
      return attributes
    }

    /**
     * 获取某一 data-bs-* 风格的 data attribute 值
     * @param element 指定元素
     * @param key 指定 data-bs-* 风格的属性名, 不包含前缀 data-bs-. 例如,
     * key 为 bliss, 则获取的数据是 data-bs-bliss= 
     * @returns 经过标准化的数据, 可能是 boolean string object 等等
     */
    public static getDataAttribute(element: HTMLElement, key: string) {
      return this._normalizeData(element.getAttribute(`data-bs-${this._normalizeDataKey(key)}`))
    }
  }
}



