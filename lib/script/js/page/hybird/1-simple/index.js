"use strict";
PageResourceLoader.getInstance().startEntry({
    debug: true,
    privateRes: [
        [
            { tag: "script", filepath: "/lib/script/js/indoor-lib/function/extensions/NumberExtensions.js", },
            { tag: "script", filepath: "/lib/script/js/indoor-lib/function/extensions/ObjectExtensions.js", }
        ],
        [{ tag: "script", filepath: "2.js", type: "module", defer: true, }],
        [{ tag: "script", filepath: "/lib/script/js/page/hybird/1-simple/another.js", }]
    ],
    main: () => {
        window.scrollTo(0, document.body.clientHeight);
        window.addEventListener('load', evt => {
            console.info('window loaded.........................');
        });
        temp();
        function temp() {
            console.log('temp called');
        }
    }
});
//# sourceMappingURL=index.js.map