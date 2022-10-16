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
	let pages = document.getElementsByClassName('page');
	let pageNav = document.getElementById('pageNav');
	let currentPage = 0;

	let previousPage = document.createElement('a');
	previousPage.innerText = 'Prev';
	previousPage.onclick = function () {
		if (currentPage - 1 > -1) {
			let i = currentPage - 1;
			let url = `?page=${i}`;
			history.pushState({}, 'p5.play : Sprite : ' + i, url);
			loadPage(i);
		}
	};
	pageNav.appendChild(previousPage);

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

	let nextPage = document.createElement('a');
	nextPage.innerText = 'Next';
	nextPage.onclick = function () {
		if (currentPage + 1 < pages.length) {
			let i = currentPage + 1;
			let url = `?page=${i}`;
			history.pushState({}, 'p5.play : Sprite : ' + i, url);
			loadPage(i);
		}
	};
	pageNav.appendChild(nextPage);

	function loadPage(pageNum) {
		pageNum = pageNum ?? args.page ?? 0;

		for (let i = 0; i < pages.length; i++) {
			if (i == pageNum) {
				pageNav.children[i + 1].className = 'active';
			} else {
				pageNav.children[i + 1].className = '';
			}
		}
		for (let mini of p5m.minis) {
			mini.remove();
		}
		for (let page of pages) {
			page.style.display = 'none';
		}
		let page = document.getElementById('page-' + pageNum);
		page.style.display = 'flex';
		p5m.loadMinis(page);
		document.body.scrollTop = 0; // for Safari
		document.documentElement.scrollTop = 0; // Chrome, Firefox, and Opera
		currentPage = parseInt(pageNum);
	}

	loadPage();
};

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

window.addEventListener('keydown', function (e) {
	if (
		(e.key == ' ' ||
			e.key == '/' ||
			e.key == 'ArrowUp' ||
			e.key == 'ArrowDown' ||
			e.key == 'ArrowLeft' ||
			e.key == 'ArrowRight') &&
		e.target == document.body
	) {
		e.preventDefault();
	}
});
