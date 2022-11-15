import defaultDescriptors from "./default-descriptors.js";
export default {
    forceDebug: false,
    defaultFlag: "load-head",
    defaultTag: "script",
    defaultDescriptors,
    globalStuffs: [
        [
            { src: "/lib/external-core/jquery/jquery-3.4.1.min.js", },
            { tag: "link", href: "/page/lesson/4-custom-bootstrap/05-forms-coms/index.css" },
        ],
        [
            "/lib/external-core/custom-bootstrap-5.2.0/js/bootstrap.bundle.js",
        ],
        [
            { src: "/lib/external-core/jquery-plugin/jquery.cookie.js" },
            "/lib/external-core/jquery-ui-1.13.1.custom/jquery-ui.min.js",
            { tag: "link", href: "/lib/external-core/jquery-ui-1.13.1.custom/jquery-ui.structure.min.css" },
        ]
    ],
};
//# sourceMappingURL=global.js.map