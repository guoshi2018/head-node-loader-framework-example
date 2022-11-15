import HeadChildNodeLoader from "../../head-child-node-loader/head-child-node-loader.js";
HeadChildNodeLoader.start({
    release: true,
    localStuffs: [
        [
            { tag: "link", href: "/lib/css/common.css", as: "image", title: 'link title' },
            { href: "/lib/movie/cat.mp4", tag: "link", as: "document", sizes: "how old", timeout: 610, },
            { tag: "link", href: "/lib/css/common.css", as: "image", title: 'link title234', importance: "high" },
            { tag: "title", textContent: "动态指定的标题" },
        ],
        [
            "/lib/image/jpg/12-adv-dom-oper/0386OT_Cocoa and OBjective-C Cookbookcov.jpg",
            "/lib/script/js/indoor-lib/class/effect-selector.js",
            "/lib/script/js/indoor-lib/class/effect-selector.js",
            { tag: "link", href: "/lib/css/common.css", as: "audio", },
            { text: "console.log('this is text from script text attribute.(content script)');", timeout: 4000, },
            { async: true, text: "console.log('this is text from script text attribute.(url script)');", timeout: 4000, },
            { tag: "base", target: "_self" },
            { tag: "meta", name: "apple-itunes-app", content: "app-id=987739104" },
            { tag: "meta", name: "apple-itunes-app" },
            { tag: "meta", content: "app-id=987739104" },
            { tag: "title", textContent: "yes ok true is title" },
            {
                tag: "title",
                textContent: "<i style='color:blue;'>带有的标签,MDN说一律被忽略,其实是不被解析, 原样呈现</i>"
            },
            { tag: "meta", httpEquiv: "content-security-policy" },
        ]
    ],
    entry: () => {
        console.log('entry called');
        window.addEventListener('load', evt => {
            console.log("当你看到这句话时, 说明还可以监听 window 的 load 事件!");
        });
    }
});
//# sourceMappingURL=2-head-child-node-test.js.map