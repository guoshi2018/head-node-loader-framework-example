"use strict";
JscssLoader.getInstance().startEntry({
    debug: false,
    privateRes: [],
    main: () => {
        enable_disable_anim_demo();
        fade_demo();
        color_anim_demo();
        queue_demo();
        custom_queue_demo();
        clear_queue_demo();
        replace_queue_demo();
        get_queue_demo();
        function enable_disable_anim_demo() {
            $('div.enable_disable_anim_demo input[type="button"]').click(function () {
                $.fx.off = !$.fx.off;
                console.log(`current animation:${!$.fx.off}`);
            });
        }
        function fade_demo() {
            let jcontent = $('pre.content-demo');
            let jbtn1 = $('.fade_demo input[type="button"]:first-child');
            let jbtn2 = jbtn1.next();
            let jbtn3 = jbtn2.next();
            let jbtn4 = jbtn3.next();
            function showProps() {
                let jele = $(this);
                console.log(jele.width(), jele.height(), jele.css('opacity'), jele.css('display'));
            }
            jbtn1.click(function () {
                jcontent.fadeIn(3000, showProps);
            });
            jbtn2.click(evt => {
                jcontent.fadeOut(3000, showProps);
            });
            jbtn3.click(evt => {
                jcontent.fadeToggle(3000).promise().done(showProps);
            });
            jbtn4.click(evt => {
                jcontent.stop(false, true).slideToggle(3000).promise()
                    .done(showProps);
            });
        }
        function color_anim_demo() {
            $('.color_anim_demo').click(function () {
                $(this).animate({
                    left: ["+=300", 'swing'],
                    opacity: ["-=0.25", 'linear'],
                    'background-color': 'green',
                    color: 'yellow',
                }, 3000).promise().done(function () {
                    console.log('animate done.');
                });
            });
        }
        function queue_demo() {
            $('.queue_demo').click(function () {
                $(this).animate({
                    height: "+=50",
                }, 3000)
                    .queue(function () {
                    $(this).text('高度动画结束!');
                    $(this).dequeue();
                })
                    .css('color', 'white')
                    .animate({
                    width: "+=100",
                }, 2000)
                    .queue((nextFunction) => {
                    $(this).text('宽度变换完毕');
                    nextFunction('hello,world');
                })
                    .queue(function (arg) {
                    console.log('this is the end.', arg);
                });
            });
        }
        function custom_queue_demo() {
            $('.queue_demo').click(function () {
                let qn = "fx";
                $(this)
                    .queue(qn, function (next) {
                    setTimeout(() => {
                        console.log('step 1');
                        next();
                    }, 5000);
                })
                    .queue(qn, (next) => {
                    setTimeout(() => {
                        console.log('step 2');
                        next();
                    }, 3000);
                })
                    .queue(qn, function (next) {
                    setTimeout(() => {
                        console.log('step 3');
                        next();
                    }, 1000);
                })
                    .animate({
                    height: "+=50",
                }, 2000)
                    .dequeue(qn);
            });
        }
        function clear_queue_demo() {
            $(".box:eq(0)")
                .queue("steps-one", function (next) {
                console.log("Will never log because we clear the queue");
                next();
            })
                .dequeue("steps-one")
                .stop(true);
        }
        function replace_queue_demo() {
            $(".box:eq(0)")
                .queue("steps-two", function (next) {
                console.log("I will never fire as we totally replace the queue");
                next();
            })
                .queue("steps-two", [
                function (next) {
                    console.log("the first new.");
                    next();
                },
                function (next) {
                    console.log("the second new.");
                    next();
                }
            ])
                .dequeue("steps-two");
        }
        function get_queue_demo() {
            let jbox1 = $(".box:eq(0)");
            jbox1.queue("steps", [function (next) {
                    console.log("I fired!");
                    next();
                }, next => {
                    console.log("you are fired");
                    next();
                }]);
            console.log(jbox1.queue("steps"));
            jbox1.dequeue("steps");
        }
        function call_by_outer_demo() {
            console.log('this is in effect.js');
        }
    }
});
//# sourceMappingURL=3-effect.js.map