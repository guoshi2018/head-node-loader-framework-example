/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.2.0): util/config.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */


/// <reference path="./index.ts" />
/// <reference path="../dom/manipulator.ts" />

namespace CustomBootstrap.Util {

  /**
   * 封装各种 bootstrap 组件的公共配置选项, 及必要的保护方法
   */
  export abstract class Config {
    /**
     * 标识配置选项的名称
     */
    //protected static readonly _name = "common-options";
    /**
     * 获取标识配置选项的名称
     */
    public static get NAME() {
      return "common-options";
    }

    /**
     * 该配置选项关联的 element, 不同的配置或组件, 会有不同的意义
     */
    // protected _element: HTMLElement;
    // /**
    //  * 获取该配置选项关联的 element
    //  */
    // public get element() {
    //   return this._element;
    // }

    /**
     * 默认配置选项
     */
    protected static readonly _defaultOptions: ConfigOptions = {};
    /**
     * 获取默认配置选项
     */
    public static get defaultOptions() {
      return this._defaultOptions;
    }
    /**
     * 经合并 HTML 客户端定义后的各配置选项
     */
    protected _options: ConfigOptions;

    /**
     * 获取经合并 HTML 客户端定义后的各配置选项
     */
    public get options() {
      return this._options;
    }

    /**
     * 构造器, 其实可以省略
     */
    protected constructor() {
      // 反正都要被后续的子类覆盖, 可以啥也不干
      this._options = Object.assign({}, Config._defaultOptions);
    }

    /**
     * 生成实际可用的配置选项. 主要是挖掘字段 _options.element 中包含的配置项
     * @param customConfig 自定义配置项
     * @returns 合并后的配置项. 由以下几部分组成, 注意后面的覆盖前面的:
     * 1. 组件(或配置)的默认配置
     * 2. 指定元素上, 通过 data-bs-config 定义的配置项(在 html 的 attribute 内,
     *   以 json 对象定义的形式)
     * 3. 指定元素上, 通过 data-bs-* 定义的配置项(散装定义, 非 2 的集中定义形式)
     * 4. 其他, 位于 _options 字段中, 自定义的配置项
     */
    protected _generateOptions<T extends ConfigOptions>(customConfig: T) {
      // data-bs-config 提供的数据 
      const jsonConfig = customConfig.element ?
        CustomBootstrap.Dom.Manipulator.getDataAttribute(customConfig.element, 'config') : {};

      return {
        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
        ...CustomBootstrap.Dom.Manipulator.getDataAttributes(customConfig.element),
        ...customConfig,
      } as T;
    }


  }
}


// export default Config
