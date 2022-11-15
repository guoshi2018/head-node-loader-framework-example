"use strict";
window.addEventListener("load", (evt) => {
    var _a;
    console.log('1.ts: ready !');
    (_a = document.querySelector('.test .one')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (evt) => {
        console.log('one button click');
        document.querySelectorAll('script').forEach(scrp => {
            scrp.remove();
        });
    });
});
//# sourceMappingURL=1.js.map