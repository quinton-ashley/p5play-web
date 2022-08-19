let args = {};

{
	let url = location.href.split('?');
	if (url.length > 1) {
		let params = new URLSearchParams(url[1]);
		for (let pair of params.entries()) {
			args[pair[0]] = pair[1];
		}
	}
}

window.p5m = {
	autoLoad: false
};

p5m.ready = function () {
	loadPage();

	let pages = document.getElementsByClassName('page');

	let pageNav = document.getElementById('pageNav');
	for (let i = 0; i < pages.length; i++) {
		let a = document.createElement('a');
		a.innerText = i;
		a.onclick = function () {
			let url = `?page=${i}`;
			history.pushState({}, 'p5.play : Sprite : ' + i, url);
			loadPage(i);
		};
		pageNav.appendChild(a);
	}
};

function loadPage(pageNum) {
	pageNum = pageNum ?? args.page ?? 0;
	for (let mini of p5m.minis) {
		mini.remove();
	}
	let pages = document.getElementsByClassName('page');
	for (let page of pages) {
		page.style.display = 'none';
	}
	let page = document.getElementById('page-' + pageNum);
	page.style.display = 'flex';
	p5m.loadMinis(page);
	document.body.scrollTop = 0; // for Safari
	document.documentElement.scrollTop = 0; // Chrome, Firefox, and Opera
}

// function setup() {
// 	noCanvas();
// 	pagesRead = getItem('pagesRead');
// 	if (pagesRead === null) {
// 		pagesRead = [];
// 	}
// 	let base = location.href.split('/');
// 	base = base[base.length - 1];
// 	if (pagesRead.indexOf(base) === -1) {
// 		pagesRead.push(base);
// 		storeItem('pagesRead', pagesRead);
// 	}
// }
