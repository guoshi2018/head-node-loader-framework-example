"use strict";
JscssLoader.getInstance().startEntry({
    debug: true,
    privateRes: [
        [
            '/lib/css/default.css',
            '/page/lesson/2-jquery4/3-event/index.css',
        ]
    ],
    main: () => {
        enfeoffJQuery();
        configButtons1();
        configPanelShowOrHidden();
        configPanelTitleBackgroundColor();
        $('div#switcher').trigger('click');
        preventGuitar();
        configKey();
        function enfeoffJQuery() {
            $('#enfeoff-jq').click(() => {
                console.log('让渡前,$和jQuery分别是:', $, jQuery);
                jQuery.noConflict();
                console.log('让渡后,$和jQuery分别是:', $, jQuery);
                console.log('也可以自定义类似于$的符号,变量, 现命名为jqc');
                const jqc = jQuery.noConflict();
                console.log($, jQuery, jqc);
            });
        }
        function configButtons1() {
            $('#switcher-default').addClass('selected');
            $('#switcher .button').click(function (event) {
                $('body').removeClass();
                if (this.id == 'switcher-narrow') {
                    $('body').addClass('narrow');
                }
                else if (this.id == 'switcher-large') {
                    $('body').addClass('large');
                }
                $('#switcher .button').removeClass('selected');
                $(this).addClass('selected');
                event.stopPropagation();
            });
        }
        function configButtons2() {
            $('#switcher-default').addClass('selected');
            $('#switcher .button').click(function (evt) {
                const bodyClass = this.id.split('-')[1];
                $('body').removeClass().addClass(bodyClass);
                $('#switcher .button').removeClass('selected');
                $(this).addClass('selected');
                evt.stopPropagation();
            });
        }
        function configButtons3() {
            $('#switcher').click(function (evt) {
                if ($(evt.target).is('.button')) {
                    const bodyClass = evt.target.id.split('-')[1];
                    $('body').removeClass().addClass(bodyClass);
                    $('#switcher .button').removeClass('selected');
                    $(evt.target).addClass('selected');
                }
            });
        }
        function configPanelShowOrHidden() {
            $('#switcher').click(function (evt) {
                if (!$(evt.target).is('.button')) {
                    $('.button', this).slideToggle().fadeToggle;
                }
            });
        }
        function configPanelTitleBackgroundColor() {
            $('#switcher h3').on('mouseenter mouseleave', function () {
                $(this).toggleClass('hover');
            });
        }
        function preventGuitar() {
            $('a#guitar').click(function (evt) {
                const anc = evt.target;
                const result = prompt(`go to ${anc.href}?`);
                if (result == null) {
                    evt.preventDefault();
                }
            });
        }
        const classes = {
            D: 'default',
            N: 'narrow',
            L: 'large',
        };
        function configKey() {
            $(document).keyup((evt) => {
                const key = String.fromCharCode(evt.keyCode);
                if (key in classes) {
                    $('body').removeClass().addClass(classes[key]);
                    $('#switcher .button').removeClass('selected');
                    $('#switcher-' + classes[key]).addClass('selected');
                    evt.stopPropagation();
                }
            });
        }
    }
});
//# sourceMappingURL=3-event.js.map