"use strict";
JscssLoader.getInstance().startEntry({
    debug: true,
    privateRes: [
        [
            '/lib/css/default.css',
            '/page/lesson/2-jquery4/10-adv-event/index.css',
            '/page/lesson/2-jquery4/10-adv-event/main.css',
            '/lib/script/js/indoor-lib/function/guoshi/guoshi.js'
        ], [
            '/lib/script/js/indoor-lib/function/guoshi/guoshi.js',
            '/lib/script/js/indoor-lib/function/jq-misc/ext-event.js',
        ]
    ],
    main: () => {
        const MAX_PAGE = 12;
        let nextPage = 0;
        Guoshi.Html.clickBlankToRefreshDocment();
        configHoverImage2();
        chapterExercise();
        function configHoverImage1() {
            $('div.photo').on('mouseenter mouseleave', function (evt) {
                const jdetails = $('.details', this);
                evt.type.toLowerCase() == 'mouseenter' ?
                    jdetails.fadeTo('fast', 0.5) :
                    jdetails.fadeOut('fast');
            });
        }
        function configHoverImage2() {
            $('div#gallery').on('mouseenter mouseleave', '.photo', function (evt) {
                const jdetails = $('.details', this);
                evt.type.toLowerCase() == 'mouseenter' ?
                    jdetails.fadeTo('fast', 0.5) :
                    jdetails.fadeOut('fast');
            });
        }
        function configLoadmoreByHyperlink() {
            $('a#more-photos').click(function (evt, scrollToVisible) {
                evt.preventDefault();
                nextPage++;
                console.log('current page:', nextPage);
                if (nextPage <= MAX_PAGE) {
                    $.get(`/lib/html-clip/${nextPage}.html`, data => {
                        const jdata = $(data).appendTo('#gallery');
                        if (scrollToVisible) {
                            $(window).scrollTop(jdata.offset()?.top || 0);
                        }
                    });
                    if (nextPage == MAX_PAGE) {
                        $(this).off('click').fadeOut();
                    }
                }
            });
        }
        function configLoadmoreByCaption() {
            $('h1.caption').click(function () {
                for (let i = 0; i < MAX_PAGE + 5; i++) {
                    $('a#more-photos').trigger('click', true);
                }
            });
        }
        function configDocumentCustomEvent() {
            let loadmore = 0;
            $(document).on('loadmore', function (_, scrollToVisible) {
                console.log('document received loadmore event:', ++loadmore);
                $('a#more-photos').trigger('click', scrollToVisible);
            });
        }
        function configLoadmoreByScrollbar() {
            let scroll = 0;
            let bott = 0;
            $(document).on('scroll.for-loadmore', function (evt) {
                console.log('scroll bar:', ++scroll);
                if (nextPage < MAX_PAGE) {
                    const distance = ($(window).scrollTop() || 0) + ($(window).height() || 0);
                    const h = $('#container').height() || 0;
                    console.log(`doctop-winbot:${distance.toFixed(0)}, h:${h.toFixed(0)}`);
                    if (distance >= h) {
                        console.log(`to bottom ${++bott}`);
                        $('div#loadingMsg').trigger('loadmore');
                    }
                }
                else {
                    $(document).off('scroll.for-loadmore');
                }
            });
        }
        function configLoadmoreByMousewheel() {
            let wheel = 0;
            $(document).on('mousewheel.for-loadmore', function (evt) {
                console.log('mousewheel:', evt.originalEvent.wheelDelta);
                if (!Guoshi.Html.isScrollBarActive() && nextPage < MAX_PAGE) {
                    if (evt.originalEvent.wheelDelta < 0) {
                        console.log('mousewheel down:', ++wheel);
                        $(document).trigger('loadmore', true);
                    }
                }
                else {
                    console.log('scrollbar usable or content complete. then unload event');
                    $(this).off('mousewheel.for-loadmore');
                }
            });
        }
        function extensionEvenAccordingToBook() {
            $(document).on('nextPage', function () {
                nextPage++;
                console.log('current page:', nextPage);
                if (nextPage >= MAX_PAGE) {
                    console.log('remove nextPage event');
                    $(this).off('nextPage');
                    $(window).off('throttledScroll');
                    $('#more-photos').off('click').css('visibility', 'hidden');
                    $('div#loadingMsg').hide();
                }
            });
            $(document).on('nextPage', function (_, scrollToVisible) {
                $.get(`/lib/html-clip/${nextPage}.html`, async (data) => {
                    const jdata = $(data).appendTo('#gallery');
                    if (scrollToVisible) {
                        $(window).scrollTop(jdata.offset()?.top || 0);
                    }
                    if (!Guoshi.Html.isScrollBarActive()) {
                        checkScrollPosition();
                    }
                    jdata.trigger('pageLoaded', nextPage);
                });
            });
            $('#more-photos').click(function (evt) {
                $(this).trigger('nextPage', true);
                return false;
            });
            let infscroll = 0;
            function checkScrollPosition() {
                const distance = ($(window).scrollTop() || 0) + ($(window).height() || 0);
                const h = $('#container').height() || 0;
                console.log(`doctop-winbot:${distance.toFixed(0)}, h:${h.toFixed(0)}`);
                if (distance >= h) {
                    console.log('infinite scroll :', ++infscroll);
                    $(document).trigger('nextPage', false);
                }
            }
            $(window).on('throttledScroll', checkScrollPosition).trigger('throttledScroll');
            function scrollThrottle1() {
                let timer = 0;
                $(window).on('scroll', function () {
                    if (!timer) {
                        timer = setTimeout(function () {
                            checkScrollPosition();
                            timer = 0;
                        }, 510);
                    }
                }).trigger('scroll');
            }
            function scrollThrottle2() {
                let canScroll = false;
                setInterval(function () {
                    if (canScroll) {
                        checkScrollPosition();
                        canScroll = false;
                    }
                }, 510);
                $(window).on('scroll', function () {
                    canScroll = true;
                });
                checkScrollPosition();
            }
        }
        async function testAjax() {
            const data = await $.get('/lib/html-clip/1.html');
            console.log(data);
        }
        function testScrollBarMethod() {
            $('div.footer').click(function () {
                console.clear();
                console.log('滚动条实验开始:');
                let sab = 0;
                let sbd = 0;
                $(window).on('scroll', function () {
                    const win_h = $(window).height() || 0;
                    const src_loc = $(window).scrollTop() || 0;
                    const doc_h = $(document).height() || 0;
                    if (Guoshi.Html.scrollBarAtBottom()) {
                        console.log('scrollBar At Bottom:fire', ++sab);
                    }
                    if (Guoshi.Html.scrollBarBottomed()) {
                        console.log('scrollBar Bottomed:fire', ++sbd);
                    }
                });
            });
            async function examScroll(evt) {
                const jele = $(evt.target);
                jele.off('click');
                console.clear();
                console.log('开始测试滚动条出现时机的判断:');
                const origH = jele.height() || 0;
                while (!Guoshi.Html.scrollBarActived()) {
                    const h = jele.height() || 0;
                    jele.height(h + 0.1);
                }
                console.log('scrollbar visible. placeholder height:', jele.height());
                const resp = await Guoshi.Misc.sleep(3258);
                console.log(resp, '现在恢复初始高度,并还原事件响应');
                jele.height(origH);
                jele.on('click', examScroll);
            }
            $('div.header').on('click', examScroll);
        }
        function testTrigger() {
            console.clear();
            let divClicked = 0;
            let divHello = 0;
            $('div.trigger-test')
                .on('click', evt => {
                console.log('div clicked:', ++divClicked);
            })
                .on('hello', evt => {
                console.log('div hello:', ++divHello);
            });
            $('a.baidu,a.sina').on('click', evt => {
                console.log(`${evt.target.innerHTML} clicked.`);
            });
            $('a.baidu,a.sina').on('hello', evt => {
                console.log(`${evt.target.innerHTML} hello.`);
            });
            $('input.trigger-click').on('click', evt => {
                console.log('mock click use trigger:---------------------');
                $('a.baidu,a.sina').trigger('click');
            });
            $('input.triggerHandler-click').on('click', evt => {
                console.log('mock click use triggerHandler:-----------------');
                $('a.baidu,a.sina').triggerHandler('click');
            });
            $('input.trigger-hello').on('click', evt => {
                console.log('mock hello use trigger:---------------------');
                $('a.baidu,a.sina').trigger('hello');
            });
            $('input.triggerHandler-hello').on('click', evt => {
                console.log('mock click use triggerHandler:-----------------');
                $('a.baidu,a.sina').triggerHandler('hello');
            });
        }
        function testExtEvent1() {
            const jouter = $('div.ext-event');
            const jmiddle = $('div.middle');
            jmiddle.on('payoff', function (evt) {
                console.log('[on payoff] middle receive: ', evt.type);
            });
            jmiddle.on('bind-payoff', function (evt) {
                console.log('[on bind-payoff] middle receive: ', evt.type);
            });
            jmiddle.on('delegate-payoff', function (evt) {
                console.log('[on delegate-payoff] middle receive: ', evt.type);
            });
            jouter.on('payoff', 'div.middle', evt => {
                console.log('[outer delegate payoff] middle receive: ', evt.type);
            });
            jouter.on('bind-payoff', 'div.middle', evt => {
                console.log('[outer delegate bind-payoff] middle receive: ', evt.type);
            });
            jouter.on('delegate-payoff', 'div.middle', evt => {
                console.log('[outer delegate delegate-payoff] middle receive: ', evt.type);
            });
            $('input.inner-payoff').on('click', function () {
                console.log('inner trigger payoff---------------------------');
                $(this).trigger('payoff');
            });
            $('input.inner-bind').on('click', function () {
                console.log('inner trigger bind-payoff---------------------------');
                $(this).trigger('bind-payoff');
            });
            $('input.inner-delegate').on('click', function () {
                console.log('inner trigger delegate-payoff---------------------------');
                $(this).trigger('delegate-payoff');
            });
            $('input.middle-payoff').on('click', function () {
                console.log('middle trigger payoff---------------------------');
                jmiddle.trigger('payoff');
            });
            $('input.middle-bind').on('click', function () {
                console.log('middle trigger bind-payoff---------------------------');
                jmiddle.trigger('bind-payoff');
            });
            $('input.middle-delegate').on('click', function () {
                console.log('middle trigger delegate-payoff---------------------------');
                jmiddle.trigger('delegate-payoff');
            });
        }
        function testExtEvent2() {
            const jouter = $('div.ext-event');
            const jmiddle = $('div.middle');
            $('input.start').on('click', function () {
                function hualongHandler(evt, data) {
                    console.log('[jouter on payoff.hualong.wenshan.yunnan self ] middle receive: ', evt, data);
                }
                jouter.on('payoff.hualong.wenshan.yunnan', {
                    amount: 8008,
                    desc: 'salary',
                }, hualongHandler);
                jouter.on('payoff.ppt', {
                    x: 1010,
                    y: 'here',
                }, (evt, data) => {
                    console.log('[jouter on payoff.ppt self ] middle receive: ', evt, data);
                });
                jouter.on('payoff.yunxi', 'div.middle', {
                    amount: 3000,
                    desc: 'apply'
                }, (evt, data) => {
                    console.log('[outer delegate for middle on payoff] middle receive: ', evt, data);
                });
                jmiddle.on('payoff.my-ns', {
                    a: 1,
                    b: 2,
                }, function (evt, data) {
                    console.log('[jmiddle on payoff self] middle receive: ', evt, data);
                });
            });
            $('input.trigger').on('click', function () {
                console.clear();
                jmiddle.triggerHandler('payoff');
            });
            $('input.stop').on('click', () => {
                console.clear();
                jouter.off('payoff');
            });
        }
        function chapterExercise() {
            $('div#gallery').on('mousedown mouseup', 'div.photo', function (evt) {
                if (evt.type == 'mousedown') {
                    $(this).addClass('selected');
                }
                else {
                    $(this).removeClass('selected');
                }
            });
            $(window).on('pageNext', (evt, pageIndex) => {
                console.log(`page ${pageIndex} loaded successfully!`);
            });
            $('div#loadingMsg')
                .ajaxStart(function () {
                $(this).show();
            }).ajaxStop(function () {
                $(this).hide();
            });
            (() => {
                function printMouseLocation(ele, evt) {
                    const loc = Guoshi.Html.relLocFrom(ele, evt);
                    console.log(`mouse x:${loc.left},y:${loc.top}`);
                }
            })();
            $('div.header').on('tripleclick1', function () {
                $('div#gallery').toggle();
            });
            $('div.header').on('tripleclick2', function () {
                $('div#gallery').toggle();
            });
            $('h1.caption').on('click', () => {
                $('div.header').off("tripleclick2 tripleclick1");
            });
            let halt_times = 0;
            $('div.footer').one('click', () => {
                $('div#gallery').one('mousemovehalt', evt => {
                    console.log('mousemove halt:', ++halt_times);
                });
            });
        }
    }
});
//# sourceMappingURL=10-adv-event.js.map