"use strict";
JscssLoader.getInstance().startEntry({
    globalRes: null,
    debug: true,
    privateRes: [
        [
            '/page/lesson/4-custom-bootstrap/02-lib-exer/01-functions/escape-svg.css',
            '/page/lesson/4-custom-bootstrap/02-lib-exer/02-root/index.css',
            '/page/lesson/4-custom-bootstrap/02-lib-exer/09-utilities-api/index.css',
            '/page/lesson/4-custom-bootstrap/02-lib-exer/10-reboot/index.css',
            '/page/lesson/4-custom-bootstrap/02-lib-exer/11-helpers/index.css',
            '/page/lesson/4-custom-bootstrap/02-lib-exer/12-grid/index.css',
            '/page/lesson/4-custom-bootstrap/02-lib-exer/50-components/index.css',
            '/lib/script/js/indoor-lib/function/guoshi/tool.js',
            '/lib/script/js/indoor-lib/class/size-watcher.js',
        ]
    ],
    main: () => {
        window.scrollTo(0, document.body.clientHeight);
        correctAllVerticalFlexOffset();
        new SizeWatcher(".show-child-w", 'w');
    }
});
//# sourceMappingURL=02-lib-exer.js.map