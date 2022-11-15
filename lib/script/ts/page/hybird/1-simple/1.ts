
window.addEventListener("load", (evt: Event) => {
	console.log('1.ts: ready !');
	document.querySelector('.test .one')?.addEventListener('click', (evt: Event) => {
		console.log('one button click');
		document.querySelectorAll('script').forEach(scrp => {
			scrp.remove();
		});
	})
});

