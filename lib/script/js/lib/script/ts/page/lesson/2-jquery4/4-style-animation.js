"use strict";
JscssLoader.getInstance().startEntry({
    debug: true,
    privateRes: [
        [
            '/lib/css/default.css',
            '/page/lesson/2-jquery4/4-style-animation/index.css',
        ]
    ],
    main: () => {
        configSwitcherButtons();
        configReadmore();
        configMockButtons();
        function configSwitcherButtons() {
            const jspeech = $('div.speech');
            const jspanCurSize = $('span#curSize');
            const defaultFontSize = parseFloat(jspeech.css('font-size'));
            jspanCurSize.text(defaultFontSize.toFixed(2) + 'px');
            $('#switcher button').click(function () {
                let num = parseFloat(jspeech.css('font-size'));
                const flag = this.id.split('-')[1];
                switch (flag) {
                    case 'large':
                        num += 0.1;
                        break;
                    case 'small':
                        num -= 0.1;
                        break;
                    case 'default':
                        num = defaultFontSize;
                        break;
                    default:
                        break;
                }
                jspeech.css('fontSize', num + 'px');
                jspanCurSize.text(num.toFixed(2) + 'px');
            });
        }
        function configReadmore() {
            const jp1 = $('p').eq(1).hide();
            $('a.more').click((evt) => {
                evt.preventDefault();
                jp1.slideToggle(1000);
            });
        }
        function configMockButtons() {
            $('#mock-slideToggle').click((evt) => {
                const jp1 = $('p').eq(1);
                jp1.animate({
                    height: 'toggle',
                    margin: 'toggle',
                    padding: 'toggle',
                    opacity: 'toggle',
                }, 3000);
            });
            $('#anim-switcher-box').click((evt) => {
                const pw = $('div.speech p').outerWidth();
                const jsw = $('div#switcher');
                const sww = jsw.outerWidth();
                jsw.css('position', 'relative');
                jsw.animate({
                    borderWidth: '5px',
                    left: pw - sww,
                    height: '+=20px',
                }, 'slow');
            });
            $('#anim-queue-switcher-box').click((evt) => {
                const pw = $('div.speech p').outerWidth();
                const jsw = $('div#switcher');
                const sww = jsw.outerWidth();
                jsw.css('position', 'relative')
                    .fadeTo('fast', 0.5)
                    .animate({
                    left: pw - sww,
                }, 2000)
                    .fadeTo('fast', 1.0)
                    .animate({
                    height: '+=20px',
                }, 'slow')
                    .slideUp('slow')
                    .slideDown('slow')
                    .animate({
                    borderWidth: '5px'
                }, 'slow');
            });
            $('#anim-opacity-move-at-the-same-time').click((evt) => {
                const pw = $('div.speech p').outerWidth();
                const jsw = $('div#switcher');
                const sww = jsw.outerWidth();
                jsw.css('position', 'relative')
                    .fadeTo(6500, 0.5)
                    .animate({
                    left: pw - sww,
                }, {
                    duration: 4000,
                    queue: false,
                })
                    .fadeTo(3000, 1.0)
                    .animate({
                    height: '+=20px',
                }, {
                    duration: 5000,
                    queue: false,
                })
                    .slideUp('slow')
                    .queue((next) => {
                    jsw.css('background-color', 'blue');
                    next();
                })
                    .slideDown('slow')
                    .animate({
                    borderWidth: '10px'
                }, {
                    duration: 5000,
                    complete: () => {
                        jsw.css('background-color', 'red');
                    },
                });
            });
            $('#mult-ele-anim').click((evt) => {
                $('p').eq(2).css('border', '1px solid #333')
                    .one('click', (evt) => {
                    $(evt.target).slideUp(5000)
                        .next().slideDown(3000);
                });
                $('p').eq(3).css('background-color', '#ccc').hide();
            });
            $('#mult-ele-anim-step').click((evt) => {
                const jclickedItem = $('p').eq(2).css('border', '1px solid #333')
                    .one('click', function (evt) {
                    $(evt.target).next().slideDown(3000, function () {
                        jclickedItem.slideUp(4000);
                    });
                });
                $('p').eq(3).css('background-color', '#ccc').hide();
            });
            $('#mult-ele-by-queue').click((evt) => {
                $('p').eq(2).css('border', '1px solid #333')
                    .one('click', function (evt) {
                    $(evt.target).next().slideDown(3000)
                        .queue(() => {
                        $(evt.target).slideUp(4000);
                    });
                });
                $('p').eq(3).css('background-color', '#ccc').hide();
            });
        }
    }
});
//# sourceMappingURL=4-style-animation.js.map