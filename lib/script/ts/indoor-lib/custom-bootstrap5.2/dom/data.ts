/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): dom/data.js to dom/data.ts
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
namespace CustomBootstrap.Dom {
  /**
   * 提供用于操作元素与对应 bootstrap 实例映射的操作方法
   */
  export class Data {

    /**
     * 元素映射 map 对象, key 是 element, value 是该 element 相关的另一个 map.
     * 使用 map 作为 value 的原因是, 为了限制各个 element 对应的 map, 只有一个 item, 
     * 该 item 即 element 与其唯一的 组件 实例的映射. 当为一个已经具有对应 instance 的
     * element 调用配置新的映射, 将异常.
     */

    private static _elementMap: Map<HTMLElement, Map<string, any>> = new Map()
    /**
     * 在 _elementMap 中, 为指定元素与 bootstrap 组件实例建立映射关系
     * @param element 指定元素
     * @param key  bootstrap 组件实例的关键字, 例如 Popover 实例的关键字是 popover, Tooltip 实例的关键字是 tooltip
     * @param instance  bootstrap 组件实例. 同一时刻, 一个元素只能对应一个确定 key 的 bootstrap 组件实例
     * @returns undifined / void
     */
    public static set(element: HTMLElement, key: string, instance: any) {
      if (!this._elementMap.has(element)) {
        this._elementMap.set(element, new Map())
      }

      const instanceMap = this._elementMap.get(element) as Map<string, any>

      // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used
      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`)
        return
      }
      instanceMap.set(key, instance)
    }

    /**
     * 获取元素对应的 bootstrap 组件实例
     * @param element 指定元素
     * @param key 要查询的实例的 key, 该 key 与对应的组件类型一一对应
     * @returns 要获取的 bootstrap 组件实例, 不存在则返回 undefined
     */
    public static get(element: HTMLElement, key: string): any | undefined {
      // if (this._elementMap.has(element)) {
      //   return this._elementMap.get(element).get(key) || null
      // }

      // return null
      return this._elementMap.get(element)?.get(key);
    }

    /**
     * 移除(撤销/删除)元素对应的 bootstrap 组件实例
     * @param element 指定元素
     * @param key 要移除的 bootstrap 组件实例对应的 key
     * @returns 移除成功返回 true, 失败(例如元素未注册, 或注册的 bootstrap 组件实例不是 key 所指定)返回 false. 
     */
    public static remove(element: HTMLElement, key: string) {
      // if (!this._elementMap.has(element)) {
      //   return
      // }

      // const instanceMap = this._elementMap.get(element)

      // instanceMap.delete(key)

      // // free up element references if there are no instances left for an element
      // if (instanceMap.size === 0) {
      //   this._elementMap.delete(element)
      // }
      let ok = false;
      const eleM = this._elementMap.get(element);
      if (eleM) {
        ok = eleM.delete(key); // 如果 key 不对, 仍然返回 false
      }
      return ok;
    }
  }
}


