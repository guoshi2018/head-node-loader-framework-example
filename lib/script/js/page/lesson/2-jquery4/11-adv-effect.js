"use strict";
JscssLoader.getInstance().startEntry({
    debug: true,
    privateRes: [
        [
            '/lib/css/default.css',
            '/page/lesson/2-jquery4/11-adv-effect/index.css',
            '/lib/external-core/jquery-ui-1.13.1.custom/jquery-ui.css',
        ],
        [
            '/lib/external-core/jquery-ui-1.13.1.custom/jquery-ui.js',
            '/lib/script/js/indoor-lib/function/guoshi/guoshi.js',
            '/lib/script/js/indoor-lib/function/jq-misc/ext-event.js'
        ]
    ],
    main: () => {
        Guoshi.Html.clickBlankToRefreshDocment();
        configHoverImage();
        configFxToggle();
        configAlertClosingPage(30, 5);
        configEffectSpeed();
        configClickPhotoToToShowDetailsThenBio();
        function configHoverImage() {
            function correctParams(eventType) {
                let size = 85;
                let padding = 0;
                if (eventType == 'mouseleave') {
                    size = 75;
                    padding = 5;
                }
                return [size, padding];
            }
            function switchByEvent(jele, evt) {
                const [size, padding] = correctParams(evt.type);
                jele.animate({
                    width: size,
                    height: size,
                    padding,
                }, 'turtle');
            }
            $('div.member').on('mouseenter mouseleave', function (evt) {
                const jimg = $('img', this);
                switchByEvent(jimg.stop(), evt);
            });
        }
        let close_times = 0;
        function configAlertClosingPage(idleBysecond, warnBysecond) {
            const delay = idleBysecond * 1000;
            $(window).on('mousemovehalt', {
                delay,
            }, async () => {
                console.log(`------------------------------------------`);
                console.log(`The mouse has stopped active for ${idleBysecond} second(s),` +
                    `and the page will close after ${warnBysecond} second(s)`);
                await Guoshi.Misc.sleep(warnBysecond * 1000);
                console.log(`now window is closed ${++close_times}`);
            });
        }
        function configFxToggle() {
            $('#fx-toggle').show().on('click', () => {
                $.fx.off = !$.fx.off;
            });
        }
        function configEffectSpeed() {
            $.fx.speeds.turtle = 1500;
            $.fx.speeds._default = 880;
            $.fx.speeds.zippy = 390;
        }
        function configClickPhotoToToShowDetailsThenBio() {
            const jmovable = $('<div id="movable"></div>').appendTo('body');
            const bioBaseStyle = {
                display: 'none',
                height: '5px',
                width: '25px',
            };
            const bioEffects = {
                duration: 800,
                easing: 'easeOutQuart',
                specialEasing: {
                    opacity: 'linear',
                },
            };
            function showBio() {
                const jbio = $(this).siblings('p.bio');
                const jparent = jbio.parent();
                const parent_loc = jparent.offset() || {
                    left: 0,
                    top: 0,
                };
                const par_border_top = parseFloat(jparent.css('border-top-width').replace(/s+|px/gi, ''));
                const par_margin_top = parseFloat(jparent.css('margin-top').replace(/s+|px/gi, ''));
                const startStyle = $.extend(bioBaseStyle, parent_loc);
                const endStyle = {
                    width: jbio.width(),
                    top: parent_loc.top + par_margin_top + par_border_top + 5,
                    left: (jparent.width() || 0) + parent_loc.left - 5,
                    opacity: 'show',
                };
                jmovable
                    .stop()
                    .delay(2000)
                    .queue(next => {
                    jmovable.html(jbio.html());
                    next();
                })
                    .queue(next => {
                    jmovable.css(startStyle);
                    next();
                })
                    .animate(endStyle, bioEffects)
                    .animate({
                    height: jbio.height(),
                }, {
                    easing: 'easeOutQuart',
                    duration: 'zippy',
                }).promise().done(() => {
                    jparent.find('div').addClass('highlight');
                });
            }
            $('div.member').on('click', function () {
                const jmember = $(this);
                if (!jmember.hasClass('active')) {
                    jmovable
                        .stop();
                    jmember.siblings('.active')
                        .removeClass('active')
                        .children('div')
                        .removeClass('highlight')
                        .slideUp();
                    jmember
                        .addClass('active')
                        .find('div').css({
                        display: 'block',
                        left: '-300px',
                        top: 0,
                    })
                        .each((idx, ele) => {
                        $(ele).animate({
                            left: 0,
                            top: 25 * idx,
                        }, {
                            duration: 'slow',
                            specialEasing: {
                                top: 'easeInQuart',
                                left: 'easeOutBounce',
                            }
                        });
                    })
                        .promise()
                        .done(showBio);
                }
            });
        }
    }
});
//# sourceMappingURL=11-adv-effect.js.map