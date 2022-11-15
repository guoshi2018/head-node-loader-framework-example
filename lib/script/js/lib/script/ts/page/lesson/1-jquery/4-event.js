"use strict";
JscssLoader.getInstance().startEntry({
    debug: true,
    privateRes: [
        []
    ],
    main: () => {
        trigger_arg_demo();
        function asso_data_demo() {
            $('.asso_data_demo a').on('click', {
                cust_name: "foo,bar is here",
            }, function (evt) {
                evt.preventDefault();
                console.log('click:', $(this).text(), evt.data.cust_name, $(this).data("cust-name"));
            });
        }
        function mulevent_same_handler_demo() {
            $('.mult input[type="text"]').on('click.tempNS change.tempNS', function (evt) {
                if (evt.type == 'click')
                    console.log($(this).val(), 'input clicked');
                else
                    console.log($(this).val(), 'text changed.');
            });
            $('.mult input[type="button"]').on('click', function (evt) {
                if ($(this).is('.remove-click'))
                    $('.mult input[type="text"]').off('click.tempNS');
                else if ($(this).is('.remove-change'))
                    $('.mult input[type="text"]').off('change.tempNS');
            });
        }
        function mulevent_mulhandler_in_one_statement_demo() {
            $('.mult input').on({
                'click': function () {
                    console.log($(this).val(), 'mouse click');
                },
                mouseover: function () {
                    console.log($(this).val(), 'mouse over');
                },
            });
        }
        function teardown_event_namedhandler_demo() {
            let foo = function () { console.log("foo"); };
            let bar = function () { console.log("bar"); };
            let jele = $('.mult input[value="two"]');
            jele.on("click", foo).on("click", bar);
            setTimeout(() => {
                jele.off("click", bar);
            }, 5000);
        }
        function one_demo() {
            $('.mult input.remove-click').one("focus mouseover keydown click", evt => {
                console.log(evt.type);
            });
        }
        function hover_helper_demo() {
            $('.mult input.remove-click').hover(function () {
                console.log('mouse enter');
            }, function () {
                console.log('mouse leave');
            });
        }
        function trigger_arg_demo() {
            let jbtn1 = $('.trigger_arg_demo input:first-child');
            let jbtn2 = jbtn1.next();
            jbtn1.click(function (evt, arg) {
                console.log(evt, arg);
            });
            jbtn2.click(function () {
                jbtn1.click();
            });
        }
    }
});
//# sourceMappingURL=4-event.js.map