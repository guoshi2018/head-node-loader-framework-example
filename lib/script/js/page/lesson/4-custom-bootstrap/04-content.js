"use strict";
/*********************************************************************************************************
 * 页面的入口文件，是前端页面文件（例如cshtml或html）中唯一包含的<script >标签中，entry属性指定的js脚本文件
 *
 * 使用方法：
 *      1、在前端页面文件末尾，加入以下标签（普通html页面，则不需要@section，其他类型的页面文件，请参考相关文档）：
                @section custom_javascript{
                             <script src="<jscss-loader.js文件的全路径>" entry="<本js文件的全路径>"></script>
                }
 *      2、找到main方法中，按照提示写入代码。
 *
* 调试完毕，可考虑将 true改为false, 以关闭加载的调试信息
* *******************************************************************************************************/
JscssLoader.getInstance().startEntry({
    //globalRes: 默认包含必要脚本的文件 '/lib/script/json/global.json',一般不用修改
    //null 或 空字符串 '' 或 输入路劲不存在, 则放弃公共先决资源文件的加载
    globalRes: null,
    //是否启用调试
    debug: true,
    //在此添加本入口文件需要包含的js css文件全路径,默认[]
    //页面用到的js文件列表的数组,排列顺序必须保证:组内无依赖关系,后面的组可依赖于前面的组,反之则不然
    //必要时,查看global.json(或在此指定的其替代文件), 以免重复加载(虽然自动忽略)
    privateRes: [
        [
            '/page/lesson/4-custom-bootstrap/04-content/index.css',
            // '/lib/script/js/indoor-lib/class/size-watcher.js',
            '/lib/script/js/indoor-lib/function/guoshi/tool.js',
        ]
    ],
    //业务主逻辑函数,默认hello,world,并打印当前的入口文件路径
    main: () => {
        //to do
        //window.scrollTo(0, document.body.clientHeight);
        //new SizeWatcher(".show-child-w", 'w');
        openLastDetails();
        window.scrollTo(0, document.body.clientHeight);
    }
});
//# sourceMappingURL=04-content.js.map