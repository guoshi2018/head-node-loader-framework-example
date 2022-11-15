"use strict";
($ => {
    $.event.special.payoff = {
        noBubble: false,
        setup: function (data, namespace, eventHandle) {
            console.log('setup hook:--------------------------------');
            console.log('this ref: ', this);
            console.log('data:', data);
            console.log('namespace:', namespace);
            console.log('eventHandle:', eventHandle);
        },
        add: function (handleObj) {
            console.log('add hook: ---------------------');
            console.log('this ref: ', this);
            console.log('handleObj: ', handleObj);
        },
        trigger: function (event, data) {
            console.log('trigger hook:-------------------------');
            console.log('this ref: ', this);
            console.log('event: ', event);
            console.log('data: ', data);
        },
        preDispatch: function (event) {
            console.log('preDispatch hook:------------------');
            console.log('this ref: ', this);
            console.log('event: ', event);
        },
        handle: function (event, data) {
            console.log('handle hook:------------------');
            console.log('this ref: ', this);
            console.log('event: ', event);
            console.log('data: ', data);
            event.handleObj.handler.call(this, event, data);
        },
        postDispatch: function (event) {
            console.log('postDispatch hook:------------------');
            console.log('this ref: ', this);
            console.log('event: ', event);
        },
        _default: function (event, data) {
            console.log('_default hook:------------------');
            console.log('this ref: ', this);
            console.log('event: ', event);
            console.log('data: ', data);
        },
        remove: function (handleObj) {
            console.log('remove hook:--------------------');
            console.log('this ref: ', this);
            console.log('handleObj: ', handleObj);
        },
        teardown: function () {
            console.log('teardown hook:------------------------');
            console.log('this ref: ', this);
        },
        description: 'this is my first extended event as an example',
    };
    $.event.special.throttledScroll = {
        setup: function (data, namespace, eventHandle) {
            let timer = 0;
            $(this).on('scroll.throttledScroll', function (evt) {
                if (!timer) {
                    timer = setTimeout(() => {
                        $(this).triggerHandler('throttledScroll');
                        timer = 0;
                    }, 280);
                }
            });
        },
        add: function (handleObj) {
        },
        trigger: function (event, data) {
        },
        preDispatch: function (event) {
        },
        handle: function (event, data) {
            event.handleObj.handler.apply(this, [event, data]);
        },
        postDispatch: function (event) {
        },
        _default: function (event, data) {
        },
        remove: function (handleObj) {
        },
        teardown: function () {
            $(this).off('scroll.throttledScroll');
        },
        description: 'this is my extension event pattern.',
    };
    $.event.special.tripleclick1 = {
        setup: function () {
            let timer = 0;
            let click_count = 0;
            $(this).on('click.tripling1', function () {
                if (!timer) {
                    click_count++;
                    console.log('click_count:', click_count);
                    timer = setTimeout(() => {
                        if (click_count >= 3) {
                            console.log('now condition ready!');
                            $(this).triggerHandler('tripleclick1', click_count);
                            click_count = 0;
                        }
                        timer = 0;
                        console.log('coming please...');
                    }, 500);
                }
            });
        },
        teardown: function () {
            console.log('free resource for tripleclick1');
            $(this).off('click.tripling1');
        }
    };
    $.event.special.tripleclick2 = {
        setup: function () {
            let jlistener = $(this);
            let click_count = 0;
            jlistener.on('click.tripling2', function () {
                click_count++;
            });
            jlistener.data('timer', setInterval(() => {
                console.log('click count:', click_count);
                if (click_count >= 3) {
                    console.log('capture a tripleclick...');
                    jlistener.triggerHandler('tripleclick2', click_count);
                    click_count = 0;
                }
            }, 500));
        },
        teardown: function () {
            console.log('free resource for tripleclick2');
            clearInterval($(this).off('click.tripling2').data('timer'));
        }
    };
    $.event.special.mousemovehalt = {
        setup: function (options, namespace) {
            const opt = $.extend(true, {}, {
                delay: 300,
            }, options);
            let timer = 0;
            $(this).on('mousemove.mousemovehalt', function (evt) {
                if (timer) {
                    clearTimeout(timer);
                    timer = 0;
                }
                timer = setTimeout(() => {
                    $(this).triggerHandler('mousemovehalt');
                    timer = 0;
                }, opt.delay);
            });
        },
        teardown: function () {
            $(this).off('mousemove.mousemovehalt');
        }
    };
})(jQuery);
//# sourceMappingURL=ext-event.js.map