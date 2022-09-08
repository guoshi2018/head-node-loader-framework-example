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
    globalRes: null,
    //是否启用调试
    debug: true,
    //在此添加本入口文件需要包含的js css文件全路径,默认[]
    //页面用到的js文件列表的数组,排列顺序必须保证:组内无依赖关系,后面的组可依赖于前面的组,反之则不然
    //必要时,查看global.json(或在此指定的其替代文件), 以免重复加载(虽然自动忽略)
    privateRes: [
        [
            //'/lib/external-core/jquery/jquery-3.6.0.js',
            '/lib/external-core/custom-bootstrap-5.2.0/js/bootstrap.bundle.js',
            '/lib/script/js/indoor-lib/class/live-set.js',
        ],
        [
            // '/lib/script/js/indoor-lib/class/size-watcher.js',
            '/lib/script/js/indoor-lib/function/guoshi/tool.js',
            '/page/lesson/4-custom-bootstrap/05-forms-coms/index.css',
            '/lib/script/js/indoor-lib/class/flexgrid-item-offset-mender/observer-wrapper.js',
        ], [
            //'/lib/script/js/indoor-lib/class/way-processor.js', // 已废弃			
            '/lib/script/js/indoor-lib/class/effect-selector-persist.js',
            //'/lib/script/js/indoor-lib/class/flexgrid-item-offset-mender.js',
            '/lib/script/js/indoor-lib/class/flexgrid-item-offset-mender/flexgrid-item-offset-mender.js',
        ]
    ],
    //业务主逻辑函数,默认hello,world,并打印当前的入口文件路径
    main: () => {
        //to do
        //window.scrollTo(0, document.body.clientHeight);
        //new SizeWatcher(".show-child-w", 'w');
        const obs = new FlexgridItemOffsetMender();
        obs.start();
        cloneWithId(document.body);
        fixDuplicateIDs();
        configLabelFor();
        EffectSelectorPersist.getInstance();
        openLastDetails();
        startValidating();
        window.scrollTo(0, document.body.clientHeight);
        temp();
    }
});
/**
 * style 所有不确定状态的checkbox
 * 有了 EffectSelector , 这个可以退休了
 */
function indeterminateChecks() {
    ////@ts-ignore
    const indChks = document.querySelectorAll("input[type=checkbox][id*=Indeterminate");
    indChks.forEach(chk => {
        //chk.setAttribute("indeterminate", "true"); //失败
        //@ts-ignore
        chk.indeterminate = true; //ok 但是有红波浪线				
    });
}
function configLabelFor() {
    const labels = document.querySelectorAll("label");
    labels.forEach(label => {
        if (!label.getAttribute("for")) {
            const tgt = label.previousElementSibling || label.nextElementSibling;
            if (tgt) {
                const id = guidString();
                tgt.setAttribute("id", id);
                label.setAttribute("for", id);
            }
        }
    });
}
/**
 * 启动双击element, 修正 .vrow/.vrowr 的 col 子级的 offset-n(如果有)
 * 已废弃, 使用 FlexgridItemOffsetMender 类, 可及时动态修补此margin为正确设置
 */
function dblclick2FixVrowOffset() {
    document.body.addEventListener('dblclick', evt => {
        const ele = evt.target;
        fixFlexGridColMargin(ele);
        return false; // 不冒泡了
    });
}
/**
 * Example starter JavaScript for disabling form submissions if there are invalid fields
 */
function startValidating() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.use-bs-validation');
    // Loop over them and prevent submission
    Array.from(forms).forEach(fm => {
        const form = fm;
        form.addEventListener('submit', event => {
            console.log('begin validate...');
            if (!form.checkValidity()) {
                console.log('fail to validate, now prevent and stop');
            }
            else {
                console.log('validation is completed.');
            }
            form.classList.add('was-validated');
            event.preventDefault();
            event.stopPropagation();
        }, false);
    });
}
function temp() {
    document.body.addEventListener('click', evt => {
        // const dhp = document.getElementById('chr-data-test') as HTMLElement;
        // dhp.innerHTML = "添加的先导文字:" + dhp.innerHTML
    });
}
//# sourceMappingURL=05-forms-coms.js.map