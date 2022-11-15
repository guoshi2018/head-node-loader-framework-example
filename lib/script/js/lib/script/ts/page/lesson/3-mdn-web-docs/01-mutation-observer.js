"use strict";
JscssLoader.getInstance().startEntry({
    globalRes: null,
    debug: true,
    privateRes: [
        [
            '/page/lesson/3-mdn-web-docs/01-mutation-observer/index.css',
        ]
    ],
    main: () => {
        demo1();
        function demo1() {
            const MutationObserver = window.MutationObserver;
            const list = document.querySelector(`ol`);
            if (null != list) {
                const config = {
                    attributes: true,
                    childList: true,
                    characterData: true,
                    subtree: true,
                };
                const callback = (mutations, observer) => {
                    mutations.forEach(function (mutation) {
                        if (mutation.type === "characterData") {
                        }
                        if (mutation.type === "childList") {
                            if (mutation.target && mutation.addedNodes.length) {
                                console.log(`At least one child node ${mutation.target} has been added!`, mutation.target);
                            }
                            if (mutation.target && mutation.removedNodes.length) {
                                console.log(`At least one child node ${mutation.target} has been removed!`, mutation.target);
                            }
                            let list_values = new Array();
                            for (let i = 0; i < list.children.length; i++) {
                                const ele = list.children.item(i);
                                if (null != ele) {
                                    list_values.push(ele.innerHTML);
                                }
                            }
                            console.log(list_values);
                        }
                        if (mutation.type === "attributes") {
                            console.log("mutation =", mutation);
                            console.log(`The \`${mutation.attributeName}\` attribute was modified.`);
                            let { left, top, width, height, } = list.style;
                            let style = {
                                left,
                                top,
                                width,
                                height
                            };
                            console.log("style =\n", JSON.stringify(style, null, 4));
                        }
                    });
                };
                const observer = new MutationObserver(callback);
                observer.observe(list, config);
                setTimeout(() => {
                    const restMutations = observer.takeRecords();
                    if (restMutations.length > 0) {
                        console.log('some changes are not be handled.....');
                        callback(restMutations, observer);
                    }
                    else {
                        console.log('no change rest');
                    }
                    observer.disconnect();
                }, 5000);
            }
        }
    }
});
//# sourceMappingURL=01-mutation-observer.js.map