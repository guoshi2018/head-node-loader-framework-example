"use strict";
JscssLoader.getInstance().startEntry({
    globalRes: null,
    debug: true,
    privateRes: [
        [
            '/page/lesson/4-custom-bootstrap/04-content/index.css',
            '/lib/script/js/indoor-lib/function/guoshi/tool.js',
        ]
    ],
    main: () => {
        openLastDetails();
        window.scrollTo(0, document.body.clientHeight);
    }
});
//# sourceMappingURL=04-content.js.map