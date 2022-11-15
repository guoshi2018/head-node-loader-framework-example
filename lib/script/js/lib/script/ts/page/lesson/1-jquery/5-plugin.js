"use strict";
JscssLoader.getInstance().startEntry({
    debug: true,
    privateRes: [],
    main: () => {
        simple_plugin_demo();
        function simple_plugin_demo() {
            (function ($) {
                $.fn.redFrontColor = function () {
                    return this.css('color', 'red');
                };
            })(jQuery);
            $('.perform button:eq(0)').click(function () {
                $('.simple_plugin_demo *').redFrontColor().css('background-color', 'yellow');
            });
        }
    }
});
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
//# sourceMappingURL=5-plugin.js.map