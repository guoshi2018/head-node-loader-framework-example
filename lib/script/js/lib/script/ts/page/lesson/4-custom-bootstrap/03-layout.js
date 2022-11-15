"use strict";
JscssLoader.getInstance().startEntry({
    globalRes: null,
    debug: true,
    privateRes: [
        [
            '/lib/script/js/indoor-lib/class/size-watcher.js',
            '/page/lesson/4-custom-bootstrap/03-layout/index.css',
        ]
    ],
    main: () => {
        window.scrollTo(0, document.body.clientHeight);
        new SizeWatcher(".show-child-w", 'w');
    }
});
//# sourceMappingURL=03-layout.js.map