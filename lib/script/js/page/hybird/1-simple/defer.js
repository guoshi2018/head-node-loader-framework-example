"use strict";
const sec1 = document.querySelector('.p-5.border');
console.log(`sec1 is ${sec1}`);
document.addEventListener("DOMContentLoaded", evt => {
    const sec2 = document.querySelector('.p-5.border');
    console.log(`document DOMContentLoaded.sec2 is ${sec2}`);
});
window.addEventListener("load", evt => {
    const sec3 = document.querySelector('.p-5.border');
    console.log(`window load, sec3 is ${sec3}`);
});
//# sourceMappingURL=defer.js.map