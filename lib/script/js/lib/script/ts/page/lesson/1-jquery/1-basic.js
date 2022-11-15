"use strict";
JscssLoader.getInstance().startEntry({
    debug: true,
    privateRes: [],
    main: () => {
        extend();
        function text() {
            console.log($('a').html());
            console.log($('a').text());
            $('a').text('new text affect all links.');
        }
        function css() {
            console.log($('body').css('font'));
        }
        function data() {
            var _a;
            let jtempLink = $('a.temp');
            jtempLink.attr('customAttr', 'hello,world');
            console.log(jtempLink.attr('custom-attr'), jtempLink.attr('customAttr'));
            jtempLink.data('yourKeyName', 23.9);
            console.log(jtempLink.data('your-key-name'));
            jtempLink.data("myKeyName", {
                name: 'guoshiwo',
                age: 48,
                family: {
                    foo: 'bar',
                    birth: new Date(),
                }
            });
            console.log(jtempLink.data('my-key-name'));
            console.log((_a = jtempLink.get(0)) === null || _a === void 0 ? void 0 : _a.outerHTML);
        }
        function inArray() {
            let myArr = [1, 2, 3, 5];
            console.log($.inArray(3, myArr), $.inArray(42, myArr));
        }
        function extend() {
            let obj1 = {
                a: 1,
                b: 2,
            };
            let obj2 = {
                b: -2,
                c: -3,
            };
            let obj = $.extend({}, obj1, obj2);
            console.log(obj, obj1, obj2, obj === obj1);
        }
        function proxy1() {
            let f = function () {
                console.log(this);
            };
            f();
            let obj = {
                flag: 'hello,world',
            };
            let f_new = $.proxy(f, obj);
            f_new();
        }
        function proxy2() {
            let obj = {
                f: function (evt) {
                    evt.preventDefault();
                    console.log(this);
                },
            };
        }
        function determineType() {
            [
                '类型判定测试,注意,全是小写开头',
                $.isArray([]),
                $.isFunction(function () { }),
                $.isNumeric(3.1417),
                $.type(true),
                $.type(3),
                $.type("test"),
                $.type(function () { }),
                $.type(new Boolean()),
                $.type(new Number(21)),
                $.type(new Function()),
                $.type([]),
                $.type(null),
                $.type(/test/),
                $.type(new Date()),
            ]
                .forEach((v, i) => {
                console.log(v);
            });
        }
        function map() {
            [
                'map()方法,返回值由调用方决定',
                (() => {
                    let rst1 = $('a').map(function (index, ele) {
                        return this.id;
                    });
                    let rst2 = ['a', 'b', 'c', 'd'].map(function (ele, idx) {
                        console.log(ele);
                        return ele + (idx * 2);
                    });
                    let rst4 = $.map(['a', 'b', 'c', 'd'], function (ele, idx) {
                        return ele + (idx * 3);
                    });
                    return [
                        rst1,
                        rst2,
                        rst1.get(),
                        rst4,
                    ];
                })(),
            ]
                .forEach((v, i) => {
                console.log(v);
            });
        }
        function scroll() {
            $('*').click(function (evt) {
                evt.stopPropagation();
                let jele = $(this);
                console.log(jele.position(), jele.scrollLeft(), jele.scrollTop());
            });
        }
        function index() {
            [
                '.index() with No arguments:gives the zero-based index ' +
                    'of the element within its parent',
                (() => {
                    let [jfoo, jlies, jdivs] = [
                        $('.index_demo #foo1'),
                        $('.index_demo li'),
                        $('.index_demo div')
                    ];
                    return [
                        jfoo.index(),
                        jlies.index(),
                        jlies.first().index(),
                        jdivs.index(),
                        jdivs.first().index(),
                    ];
                })(),
            ]
                .forEach((v, i) => {
                console.log(v);
            });
            [
                '.index() 带一个字符串参数:以该参数为选择器,定位范围,' +
                    '获取caller在其中的 zero - indexed序号',
                (() => {
                    let jbar = $('.index_demo #bar1');
                    return [
                        jbar.index('.index_demo li'),
                        $('*'),
                        jbar.index('*'),
                        jbar.index('div'),
                    ];
                })(),
            ]
                .forEach((v, i) => {
                console.log(v);
            });
            [
                '.index()带一个jQuery对象参数:在caller定位的范围内,查找argument的序号',
                (() => {
                    let jbar = $('.index_demo #bar1');
                    return [
                        $('.index_demo li').index(jbar),
                        $('div').index(jbar),
                    ];
                })(),
            ]
                .forEach((v, i) => {
                console.log(v);
            });
            [
                '.index()带一个DOMElement 参数:文档说与上一种情况类似,实测结果不然.以后再说.',
            ]
                .forEach((v, i) => {
                console.log(v);
            });
        }
        function Dom_jq() {
            [
                '联合使用Dom element和jquery对象:',
                (() => {
                    const dom = document.getElementById('temp_ul');
                    return [
                        $(dom).find('.c_foo1'),
                        $(dom).find('#bar1'),
                    ];
                })(),
            ]
                .forEach((v, i) => {
                console.log(v);
            });
        }
        function toggle_state() {
            function showState(jele) {
                const [isV, isH] = [
                    jele.is(':visible'),
                    jele.is(':hidden'),
                ];
                console.log({ isV, isH });
            }
            $('#ph').addClass('temp-border').click(function () {
                $(this).toggle(3000, () => {
                    showState($(this));
                });
                $(this).toggle(14000, () => {
                    showState($(this));
                });
            });
        }
        function escape_css_notation() {
            function jq(myid) {
                return "#" + myid.replace(/(:|\.|\[|\]|,|=|@|\s|'|")/g, "\\$1");
            }
            [
                'css字符转义:',
                (() => {
                    let id = "such id,you'will be mad.or.crazy";
                    let id_1 = "such\ id,you\'will\ be\ mad\.or\.crazy";
                    let escId = "such\\ id\\,you\\'will\\ be\\ mad\\.or\\.crazy";
                    let escId_1 = jq(id);
                    return [
                        $('#' + escId).val(),
                        $('#' + escId)[0].id,
                        $('#' + id.replace(/(:|\.|\[|\]|,|=|@|\s|'|")/g, "\\$1")).val(),
                        escId_1,
                        $(jq(id)).val(),
                    ];
                })(),
            ]
                .forEach((v, i) => {
                console.log(v);
            });
        }
        function disable_enable() {
            let t1 = document.getElementById('tt');
            let jt2 = $('#tt');
            jt2.prop('disabled', 1 | "hello" | true | {} | 'disabled' | 'donnot disable');
        }
        function simpleResult() {
            [
                '',
                (() => {
                    return [];
                })(),
            ]
                .forEach((v, i) => {
                console.log(v);
            });
        }
    }
});
//# sourceMappingURL=1-basic.js.map