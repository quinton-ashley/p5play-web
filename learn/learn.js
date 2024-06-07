/* main.js */

function toggleDarkMode() {
	if (document.body.className == 'dark') {
		document.body.className = 'light';
	} else {
		document.body.className = 'dark';
	}
	if (typeof setEditorThemes != 'undefined') setEditorThemes();

	// Save the preference
	localStorage.setItem('darkMode', document.body.className);
}

{
	let pref = localStorage.getItem('darkMode');
	pref ??= window.matchMedia('prefers-color-scheme: dark').matches ? 'dark' : 'light';

	document.body.className = pref;
}

if (typeof Q5 != 'undefined') Q5.canvasOptions.alpha = true;

/* learn.js */

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

let pages = document.getElementsByClassName('page');
let pageNav = document.getElementById('pageNav');
let currentPage = 0;

let article;

async function start() {
	article = document.body.children[0];

	function loadScript(src) {
		return new Promise(function (resolve) {
			let script = document.createElement('script');
			script.src = src;
			script.onload = resolve;
			document.body.appendChild(script);
		});
	}

	async function loadScripts(sources) {
		for (let src of sources) await loadScript(src);
	}

	if (navigator.onLine) {
		await loadScripts([
			'https://cdn.jsdelivr.net/npm/ace-builds@1.34.2/src-min-noconflict/ace.min.js',
			'https://cdn.jsdelivr.net/npm/ace-builds@1.34.2/src-min-noconflict/ext-language_tools.js',
			'https://cdn.jsdelivr.net/npm/ace-builds@1.34.2/src-min-noconflict/ext-beautify.js'
		]);
	} else {
		await loadScripts([
			'/learn/ace/ace.min.js',
			'/learn/ace/ext-language_tools.js',
			'/learn/ace/mode-javascript.js',
			'/learn/ace/theme-dracula.js',
			'/learn/ace/theme-xcode.js',
			'ace/ext-beautify.js'
		]);
	}

	if (pageNav) {
		let previousPage = document.getElementById('prevPage');
		previousPage.onclick = function () {
			if (currentPage - 1 > -1) {
				let i = currentPage - 1;
				let url = `?page=${i}`;
				history.pushState({}, 'p5play : Sprite : ' + i, url);
				loadPage(i);
			}
		};

		let nextPage = document.getElementById('nextPage');
		nextPage.onclick = function () {
			if (currentPage + 1 < pages.length) {
				let i = currentPage + 1;
				let url = `?page=${i}`;
				history.pushState({}, 'p5play : Sprite : ' + i, url);
				loadPage(i);
			}
		};

		if (typeof mie != 'undefined') {
			(async () => {
				let data = await fetch('/learn/ace/completions.json');
				let json = await data.json();
				mie.lang.p5.completions = json;

				mie.load();
			})();
		}
		loadPage();
	}
}
start();

function loadPage(pageNum) {
	article.style.display = 'none';

	pageNum = pageNum ?? args.page ?? 0;

	for (let i = 0; i < pages.length; i++) {
		let el = pageNav.children[i];
		if (el.dataset.page == pageNum) {
			el.classList.add('active');
		} else {
			el.classList.remove('active');
		}
	}
	for (let mini of mie) {
		mini.remove();
	}
	for (let page of pages) {
		page.style.display = 'none';
	}
	let page = document.getElementById('page-' + pageNum);
	page.style.display = 'flex';
	mie.loadMinis(page);
	setEditorThemes();
	document.body.scrollTop = 0; // for Safari
	document.documentElement.scrollTop = 0; // Chrome, Firefox, and Opera
	currentPage = parseInt(pageNum);

	document.getElementById('toc').style.display = 'flex';

	article.style.display = 'flex';
}

function setEditorThemes() {
	if (typeof mie == 'undefined') return;
	if (document.body.className == 'dark') {
		mie.theme = 'dark';
	} else {
		mie.theme = 'light';
	}
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

let trialPages =
	(!args.page || args.page <= 2) &&
	(location.pathname.endsWith('sprite.html') || location.pathname.endsWith('group.html'));

async function showUnauthContent() {
	if (trialPages) return;

	let unauth = await (await fetch('../account/unauth.html')).text();

	document.body.insertAdjacentHTML('beforeend', unauth);
}

async function showAuthContent() {
	if (trialPages) return;

	if (p5playAccount.type == 'Teacher') {
		if (localStorage.getItem('trialTime') > Date.now()) {
			return;
		}
		let auth = await (await fetch('../account/auth.html')).text();
		document.body.insertAdjacentHTML('beforeend', auth);

		function removePopup() {
			let pu = document.getElementById('auth-popup');
			pu.parentElement.remove();
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;

			// add 2 days to the trial
			localStorage.setItem('trialTime', Date.now() + 172800000);
		}

		setTimeout(() => {
			document.querySelectorAll('md.closed').forEach((md) => {
				md.onclick = () => md.classList.toggle('closed');
			});

			document.getElementById('remind-me-later').addEventListener('click', () => {
				alert("We'll remind you later ⏰");
				removePopup();
			});

			document.getElementById('no-support').addEventListener('click', (e) => {
				let res = confirm("Are you sure? 😥 You'll need to send us a request to delete your account.");
				if (res) removePopup();
				else e.preventDefault();
			});

			document.getElementById('will-support').addEventListener('click', (e) => {
				let res = confirm('To confirm your support please email us! ☺️');
				if (res) removePopup();
				else e.preventDefault();
			});

			document.getElementById('support-now').addEventListener('click', (e) => {
				removePopup();
			});
		}, 100);
	}
}
