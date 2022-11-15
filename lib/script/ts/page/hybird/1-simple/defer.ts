
// script 标签引入, async 可能会忽略 DomContentLoaded 事件, 因为监听时,
// 该事件可能已经发生过. 而 window.load 则不会错过
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

