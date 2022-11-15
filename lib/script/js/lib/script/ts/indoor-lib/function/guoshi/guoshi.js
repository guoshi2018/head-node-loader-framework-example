"use strict";
(($, global) => {
    Object.defineProperty(global, 'Guoshi', {
        value: {
            Html: {
                clickBlankToRefreshDocment: () => {
                    $('body').on('click', function (evt) {
                        if (evt.target == this) {
                            global.history.go(0);
                        }
                    });
                },
                scrollBarAtBottom: () => {
                    const doc = document.documentElement || document.body;
                    return Math.abs(doc.scrollHeight - (doc.scrollTop + doc.clientHeight)) <= 0.8;
                },
                scrollBarBottomed: () => {
                    const doc_h = $(document).height() || 0;
                    const sum = ($(global).height() || 0) + ($(global).scrollTop() || 0);
                    return Math.abs(doc_h - sum) <= 0.8;
                },
                isScrollBarActive: () => {
                    const doc = document.documentElement || document.body;
                    return doc.scrollHeight > doc.clientHeight || doc.scrollHeight > global.innerHeight;
                },
                scrollBarActived: function () {
                    return this.isScrollBarActive();
                },
                relLocFrom: function (ele, evt) {
                    const loc = $(ele).offset();
                    const left = (loc === null || loc === void 0 ? void 0 : loc.left) || 0;
                    const top = (loc === null || loc === void 0 ? void 0 : loc.top) || 0;
                    const x = Math.floor(evt.pageX - left);
                    const y = Math.floor(evt.pageY - top);
                    return {
                        left: x,
                        top: y,
                    };
                }
            },
            Math: {
                sum: (arr) => {
                    let total = 0;
                    arr.forEach(v => {
                        total += typeof v == 'string' ? parseFloat(v.trim()) : v;
                    });
                    return total;
                },
                avg: function (arr) {
                    return arr.length > 0 ? this.sum(arr) / arr.length : 0;
                },
            },
            Misc: {
                sleep: (delay) => {
                    return new Promise((res => {
                        setTimeout(() => {
                            const s = (delay / 1000).toFixed(2);
                            res(`delay ${s} seconds successfully`);
                        }, delay);
                    }));
                },
            }
        },
        writable: false,
        configurable: false,
        enumerable: true,
    });
})(jQuery, this);
//# sourceMappingURL=guoshi.js.map