"use strict";
JscssLoader.getInstance().startEntry({
    debug: true,
    privateRes: [
        [
            '/lib/script/js/indoor-lib/function/guoshi/tool.js',
            '/page/lesson/4-custom-bootstrap/.../index.css',
        ]
    ],
    main: () => {
        openLastDetails();
        window.scrollTo(0, document.body.clientHeight);
    }
});
//# sourceMappingURL=model.js.map