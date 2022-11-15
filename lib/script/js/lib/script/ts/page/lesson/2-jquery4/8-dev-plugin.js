"use strict";
JscssLoader.getInstance().startEntry({
    debug: true,
    privateRes: [
        [
            '/lib/external-core/jquery-ui-1.13.1.custom/ui-themes/trontastic/jquery-ui.min.css',
            '/lib/script/ts/indoor-lib/widget/guoshi-simpleTooltip.css',
            '/lib/css/default.css',
            '/page/lesson/2-jquery4/8-dev-plugin/index.css',
        ], [
            '/lib/external-core/jquery-ui-1.13.1.custom/jquery-ui.min.js',
        ], [
            '/lib/script/js/indoor-lib/widget/guoshi-simpleTooltip.js',
            '/lib/script/js/indoor-lib/function/jq-static/math.js',
            '/lib/script/js/indoor-lib/function/jq-instance/example.js',
            '/lib/script/js/indoor-lib/function/guoshi/guoshi.js',
        ]
    ],
    main: () => {
        Guoshi.Html.clickBlankToRefreshDocment();
        configWidgetTestButton();
        function fillData(i) {
            const jtbody = $('table#inventory tbody');
            const quantity = $('td:nth-child(2)', jtbody)
                .map((idx, ele) => {
                return $(ele).text();
            }).get();
            $('tr#sum td:nth-child(2)').text(eval(`$.gx_sum${i}`)(quantity).toFixed(2));
            $('tr#average td:nth-child(2)').text(eval(`$.gx_avg${i}`)(quantity).toFixed(2));
        }
        function fillData3() {
            const jtbody = $('table#inventory tbody');
            const quantity = $('td:nth-child(2)', jtbody)
                .map((idx, ele) => {
                return $(ele).text();
            }).get();
            $('tr#sum td:nth-child(2)').text($.gx_math.sum(quantity).toFixed(2));
            $('tr#average td:nth-child(2)').text($.gx_math.avg(quantity).toFixed(2));
        }
        function fillData4() {
            const jtbody = $('table#inventory tbody');
            const quantity = $('td:nth-child(2)', jtbody)
                .map((idx, ele) => {
                return $(ele).text();
            }).get();
            $('tr#sum td:nth-child(2)').text(Guoshi.Math.sum(quantity).toFixed(2));
            $('tr#average td:nth-child(2)').text(Guoshi.Math.avg(quantity).toFixed(2));
        }
        function simpleInstanceMethod() {
            $('no-such-ele').exam1().exam2('hey');
        }
        function configPluginTestingButton() {
            const jplugin = $('table,h1', '#plugin');
            $('input[type="button"].err').click(() => {
                $('tr').swapClass1('one', 'two');
            });
            $('input[type="button"].suc').click(() => {
                $('tr').swapClass2('one', 'two');
            });
            $('input[type="button"].shadow1').click(() => {
                jplugin.shadow1();
            });
            $('input[type="button"].shadow2').click(() => {
                jplugin.shadow2({
                    copies: 8,
                    opacity: 0.24,
                });
            });
            $('input[type="button"].shadow3').click(() => {
                jplugin.shadow3({
                    copies: 15,
                });
            }).button();
        }
        function configWidgetTestButton() {
            const jlink = $('a', 'table tbody tr td');
            $('input[type="button"].create', 'div.container#widget').click(() => {
                jlink.simpleTooltip({
                    disabled: true,
                    location: {
                        left: 30,
                        top: 10,
                    },
                    content: function () {
                        return `${$(this).data('ttt')},${$(this).text()}`;
                    },
                });
            });
            $('input[type="button"].enable', 'div.container#widget').click(() => {
                jlink.simpleTooltip('enable');
            });
            $('input[type="button"].disable', 'div.container#widget').click(() => {
                jlink.simpleTooltip('disable');
            });
            $('input[type="button"].open', 'div.container#widget').click(() => {
                jlink.simpleTooltip('open');
            });
            $('input[type="button"].close-tip', 'div.container#widget').click(() => {
                jlink.simpleTooltip('close');
            });
            $('input[type="button"].cluster', 'div.container#widget').click(() => {
                jlink.simpleTooltip('test1').simpleTooltip('test2').simpleTooltip('test1');
            });
            $('input[type="button"].destroy', 'div.container#widget').click(() => {
                jlink.simpleTooltip('destroy');
            });
            $('h2.disabled').click(evt => {
                let result;
                try {
                    result = jlink.simpleTooltip('disabled');
                }
                catch (err) {
                    result = '未创建';
                }
                $('span', $(evt.target)).text(result);
            });
            jlink.on('simpleTooltipopen', () => {
                console.log('receive tooltipopen event');
            });
        }
        function test() {
            console.log('this two are all jquery version: ', $.fn.jquery, $('table').jquery);
        }
    }
});
//# sourceMappingURL=8-dev-plugin.js.map