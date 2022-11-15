"use strict";
var CustomBootstrap;
(function (CustomBootstrap) {
    var Util;
    (function (Util) {
        const uriAttributeNames = new Set([
            'background',
            'cite',
            'href',
            'itemtype',
            'longdesc',
            'poster',
            'src',
            'xlink:href'
        ]);
        const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
        const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
        const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
        const isAllowedAttribute = (attr, allowedAttributeNameList) => {
            let ok;
            const attributeName = attr.name.toLowerCase();
            if (allowedAttributeNameList.includes(attributeName)) {
                if (uriAttributeNames.has(attributeName)) {
                    const v = attr.value || "";
                    ok = Boolean(SAFE_URL_PATTERN.test(v) || DATA_URL_PATTERN.test(v));
                }
                else {
                    ok = true;
                }
            }
            else {
                const regs = allowedAttributeNameList.filter(attributeRegex => attributeRegex instanceof RegExp);
                ok = regs.some(reg => reg.test(attributeName));
            }
            return ok;
        };
        Util.DefaultAllowlist = {
            '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
            a: ['target', 'href', 'title', 'rel'],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        };
        function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
            let result = unsafeHtml;
            if (unsafeHtml.length != 0) {
                if (sanitizeFunction) {
                    result = sanitizeFunction(unsafeHtml);
                }
                else {
                    const domParser = new window.DOMParser();
                    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
                    const elements = [...createdDocument.body.querySelectorAll('*')];
                    for (const element of elements) {
                        const elementName = element.tagName.toLowerCase();
                        if (!Object.keys(allowList).includes(elementName)) {
                            element.remove();
                        }
                        else {
                            const attributeList = [...element.attributes];
                            const allowedAttributes = [...allowList['*'], ...allowList[elementName]];
                            for (const attribute of attributeList) {
                                if (!isAllowedAttribute(attribute, allowedAttributes)) {
                                    element.removeAttribute(attribute.nodeName);
                                }
                            }
                        }
                    }
                    result = createdDocument.body.innerHTML;
                }
            }
            return result;
        }
        Util.sanitizeHtml = sanitizeHtml;
    })(Util = CustomBootstrap.Util || (CustomBootstrap.Util = {}));
})(CustomBootstrap || (CustomBootstrap = {}));
//# sourceMappingURL=sanitizer.js.map