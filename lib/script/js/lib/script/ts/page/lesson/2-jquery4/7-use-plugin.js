"use strict";
JscssLoader.getInstance().startEntry({
    debug: true,
    privateRes: [
        [
            '/lib/external-core/jquery-ui-1.13.1.custom/jquery-ui.css',
            '/page/lesson/2-jquery4/7-use-plugin/main.css',
        ], [
            '/lib/external-core/jquery-plugin/jquery.cycle.all.js',
            '/lib/external-core/jquery-plugin/jquery.cookie.js',
            '/lib/external-core/js-cookie/js.cookie.js',
            '/lib/external-core/jquery-ui-1.13.1.custom/jquery-ui.js',
        ]
    ],
    main: () => {
        runBook();
        function runJqueryCookie() {
            $.cookie.raw = false;
            const rst1 = $.cookie('ck 1', 'hello+_yes');
            const rst2 = $.cookie('ck-2', 'world');
            const rst3 = $.cookie('ck 3', 'sit down', {
                expires: 8,
                path: '/',
                secure: false,
            });
            console.log('其实赋值有返回值,为各个cookie的对应字串:', rst1, rst2, rst3);
            console.log($.cookie('ck-2'));
            console.log(document.cookie);
            $.cookie('ck-88', {});
            $.cookie('ck-1', null);
            $.removeCookie('ck-2');
            console.log($.cookie('ck-1'), $.cookie('ck-2'), $.cookie('ck-3'), $.cookie('no-such-cookie'), $.cookie());
        }
        function runJsCookie1() {
            Cookies.set('guoshi-1', 'v-1');
            Cookies.set('guoshi-2', 'v-2', {
                expires: 7,
            });
            Cookies.set('guoshi-3', 'v-3', {
                expires: 17,
                path: "",
            });
            console.log(Cookies.get('guoshi-1'), Cookies.get('no-such'), Cookies.get(), Cookies.get('guoshi-3', {
                domain: 'www.guoshi.com',
            }));
            console.log('用document.cookie表达的所有cookie值,是不包含选项的:', document.cookie);
            Cookies.remove('guoshi-2');
            Cookies.remove('guoshi-3');
            Cookies.remove('guoshi-3', {
                path: '/',
            });
            Cookies.remove('guoshi-3', {
                expires: 18,
                path: "",
            });
            console.log(Cookies.get());
            const CookieManager = Cookies.noConflict();
            CookieManager.set('gx-123', 'hello,world');
            console.log('让渡Cookies命名空间后:', CookieManager.get());
            console.log('现在查看Cookies命名空间应该是未定义:', Cookies);
            CookieManager.set('dm-1', '104', {
                domain: 'www.guoshi-hello.com',
            });
            console.log('获取未指定域名的cookie,得到undefined:', CookieManager.get('dm-1'));
        }
        function runJsCookie2() {
            Cookies.remove('amany');
            console.log('实际通过document.cookie得到的是:', document.cookie);
            console.log('说明:document.cookie在执行追加操作时,检查到非法cookie,则忽略');
        }
        function runBook() {
            configBooks();
            const jbooks = $('ul#books');
            function configBooks() {
                const imgBaseUrl = '/lib/image/jpg/7-use-plugin';
                const books = [{
                        filename: '(01).jpg',
                        title: 'asp+sql server之动态网站',
                        author: '龙马工作室',
                    }, {
                        filename: '(02).jpg',
                        title: '软件设计师考试疑难问题解答',
                        author: '王勇,张友生',
                    }, {
                        filename: '(03).jpg',
                        title: '21天学通C++',
                        author: 'Jesse Liberty',
                    }, {
                        filename: '(04).jpg',
                        title: '编程高手箴言',
                        author: '梁肇新',
                    }, {
                        filename: '(05).jpg',
                        title: '计算机系统结构',
                        author: '郑伟民 汤志忠',
                    }, {
                        filename: '(06).jpg',
                        title: 'ASP.NET MVC 5 高级编程(第五版)',
                        author: 'Jon Galloway,Brad Wilson',
                    }, {
                        filename: '(07).jpg',
                        title: '从零开始 SQL Server中文版基础培训教程',
                        author: '老虎工作室',
                    }, {
                        filename: '(08).jpg',
                        title: 'Red Hat Linux9 全面掌握',
                        author: '易丽贵',
                    }, {
                        filename: '(09).jpg',
                        title: 'ASP.NET 2.0 高级编程',
                        author: 'Bill Evjen,Scott Hanselman Devin Rader',
                    }, {
                        filename: '(10).jpg',
                        title: '.NET 框架程序设计(修订版)',
                        author: 'Jeffrey Richter',
                    }, {
                        filename: '(11).jpg',
                        title: '软件设计师考试历年试题分析与解答',
                        author: '考试研究组',
                    }, {
                        filename: '(12).jpg',
                        title: 'DotNetNuke4 高级编程',
                        author: 'Shaun Walker,Joe Brinkman,Bruce Hopkins',
                    }, {
                        filename: '(13).jpg',
                        title: 'Java编程一步到位',
                        author: '王铁敬',
                    }, {
                        filename: '(14).jpg',
                        title: 'Windows核心编程',
                        author: 'Jeffrey Richter',
                    }];
                const jsecBook = $('<section class="books"/>')
                    .appendTo('body');
                const jul = $('<ul id="books"/>').appendTo(jsecBook);
                books.forEach(book => {
                    $(`
					<li>
						<div class="item">
							<img src="${imgBaseUrl}/${book.filename}" alt="${book.title}" title="${book.title}" />
							<div class="info">
								<div class="title">${book.title}</div>
								<div class="author">${book.author}</div>						
							</div>						
						</div>
					</li>
					`).appendTo(jul);
                });
                $('<button class="test">test cycle event</button>')
                    .click(function () {
                    var _a;
                    jbooks.cycle('toggle', true);
                    $.cookie('cyclePaused', (_a = jbooks.get(0)) === null || _a === void 0 ? void 0 : _a.cyclePause);
                    $(this).effect('shake', {
                        distance: 10,
                    });
                })
                    .button({
                    icons: {
                        primary: '.ui-icon-video',
                    }
                })
                    .appendTo(jsecBook);
                jul.hover(function () {
                    console.log('enter');
                    $(this).find('.title').animate({
                        backgroundColor: "blue",
                        color: "yellow",
                    }, 1000);
                }, function () {
                    console.log('leave');
                    $(this).find('.title').animate({
                        backgroundColor: 'green',
                        color: 'red',
                    }, 1000);
                })
                    .click(function () {
                    $('img', $(this)).toggleClass('low-vis', 8000);
                    $('.title', $(this)).slideToggle(5000, 'easeInExpo');
                });
                $('img', jul).resizable().draggable();
                jul.draggable();
                $('<div id="my-slider"></div>').slider({
                    min: 0,
                    max: $('img', jul).length - 1,
                    slide: function (evt, ui) {
                        var _a;
                        jbooks.cycle((_a = ui.value) === null || _a === void 0 ? void 0 : _a.toString());
                    }
                }).appendTo(jsecBook);
            }
            demo4();
            function demo1() {
                jbooks.cycle();
            }
            function demo2() {
                jbooks.cycle({
                    timeout: 1500,
                    speed: 3000,
                    pause: true,
                });
            }
            function demo3() {
                Object.assign($.fn.cycle.defaults, {
                    timeout: 3000,
                    random: true,
                    pause: true,
                    fx: 'turnRight',
                    after: (...rest) => {
                    }
                });
                jbooks.cycle();
            }
            function demo4() {
                Object.assign($.fn.cycle.defaults, {
                    timeout: 1000,
                    pause: false,
                    fx: 'zoom',
                });
                jbooks.cycle({
                    before: function () {
                        $('#my-slider').slider('value', $('li', jbooks).index(this));
                    }
                });
                if ($.cookie('cyclePaused') == '1') {
                    jbooks.cycle('pause');
                }
            }
        }
    }
});
//# sourceMappingURL=7-use-plugin.js.map