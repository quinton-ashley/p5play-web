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
			'https://cdn.jsdelivr.net/npm/ace-builds@1.18.0/src-min-noconflict/ace.min.js',
			'https://cdn.jsdelivr.net/npm/ace-builds@1.18.0/src-min-noconflict/ext-language_tools.js',
			'https://cdn.jsdelivr.net/npm/ace-builds@1.18.0/src-min-noconflict/ext-beautify.js',
			'https://cdn.jsdelivr.net/npm/marked@4.3.0/marked.min.js'
		]);
	} else {
		await loadScripts([
			'/learn/ace/ace.min.js',
			'/learn/ace/ext-language_tools.js',
			'/learn/ace/mode-javascript.js',
			'/learn/ace/theme-dracula.js',
			'/learn/ace/theme-xcode.js',
			'ace/ext-beautify.js',
			'/learn/marked/marked.min.js'
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
				let data = await fetch('ace/completions.json');
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

async function showUnauthContent() {
	if (
		(!args.page || args.page <= 2) &&
		(location.pathname.endsWith('sprite.html') || location.pathname.endsWith('group.html'))
	)
		return;

	document.body.insertAdjacentHTML(
		'beforeend',
		`
<div class="unauth">
	<div class="popup-bg">
		<div id="unauth-popup">
			<div class="navLink active">
				<img alt="p5play logo" src="/assets/p5play_logo.svg" class="p5play_logo">
				<span>p5play</span>
			</div>
			<p id="unauthorized-text">Login to access this page.</p>
			<a class="accountBtns"
				href="https://p5play.auth.us-west-2.amazoncognito.com/login?redirect_uri=https%3A%2F%2Fp5play.org%2Fpro%2Findex.html&client_id=3oegfdhu2r7eo8nr371496718c&response_type=token&scope=email+openid+profile">Login</a>
			<a class="accountBtns" href="/pro/signup.html">Sign Up</a>
		</div>
	</div>
	<style>
body {
	height: 100vh;
  overflow: hidden;
}
	</style>
</div>`
	);
}
