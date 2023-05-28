/**
 * main.js for p5play.org
 *
 * handles dark mode toggling
 */
{
	let pref = localStorage.getItem('darkMode');
	pref ??= window.matchMedia('prefers-color-scheme: dark').matches ? 'dark' : 'light';

	document.body.className = pref;
}

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

async function translatePage(langCode, pageGroup, page) {
	if (!page) {
		page = pageGroup;
		pageGroup = null;
	}

	async function loadTranslationMD() {
		let file = '../' + langCode;
		if (pageGroup) file += '/' + pageGroup;
		file += '/' + page + '.md';

		let trans = await (await fetch(file)).text();
		trans = trans.split('\n# ');
		trans[0] = trans[0].slice(2);

		for (let tran of trans) {
			let splitIdx = tran.indexOf('\n');
			let md = document.getElementById('md' + tran.slice(0, splitIdx));
			if (md) md.innerHTML = marked.parse(tran.slice(splitIdx + 1));
		}
	}

	async function loadTranslationJSON() {
		let file = `../${langCode}/${langCode}.json`;
		let lang = await (await fetch(file)).json();
		lang = lang[pageGroup];

		for (let label in lang.DOM) {
			let el = document.getElementById(label);
			if (el) el.innerHTML = lang.DOM[label];
		}

		if (pageGroup == 'learn') {
			lang = lang[page];
			for (let pageBtn of pageNav.children) {
				pageBtn.innerHTML = lang[pageBtn.dataset.page];
			}
		}
	}

	await Promise.all([loadTranslationMD(), loadTranslationJSON()]);
}
