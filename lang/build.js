const log = console.log;
const fs = require('fs/promises');
const path = require('path');
const beautify = require('js-beautify').html;
const { JSDOM } = require('jsdom');
const marked = require('../learn/marked/marked.min.js');

let langCode = process.argv[2];
const specificPage = process.argv[3];

let langCodes = ['en', 'es', 'ja'];

let langJSON;

// add the "account" page group to build those pages
// they're not included by default because their format is different
let pageGroups = ['learn', 'pro', 'play', 'jam', 'teach', 'account'];

async function main() {
	if (langCode) langCodes = [langCode];

	let file = `./lang/${langCode}/${langCode}.json`;
	langJSON = JSON.parse(await fs.readFile(file, 'utf8'));

	for (let i = 0; i < langCodes.length; i++) {
		langCode = langCodes[i];
		if (langCodes.length > 1) log(langCode);

		if (!specificPage || specificPage == 'index') {
			await translatePage('index');
		}

		for (let pageGroup of pageGroups) {
			const pages = await getPagesInDirectory(pageGroup);
			for (const page of pages) {
				if (page == 'signup' || page == 'tos') continue;
				let pagePath = pageGroup + '/' + page;
				if (specificPage && pageGroup != specificPage && pagePath != specificPage) {
					continue;
				}
				await translatePage(pageGroup, page);
			}
		}
	}

	log('Done!');
}

async function getPagesInDirectory(dir) {
	let files = await fs.readdir(`./lang/${langCode}/${dir}`);
	const fileNames = [];
	for (const file of files) {
		if (file.endsWith('.md')) {
			// removes the '.html' extension
			fileNames.push(file.slice(0, -3));
		}
	}
	return fileNames;
}

async function translatePage(pageGroup, page) {
	if (!page) {
		page = pageGroup;
		pageGroup = null;
	}

	let htmlFilePath;
	if (pageGroup) {
		htmlFilePath = `./${pageGroup}/${page}.html`;
	} else {
		htmlFilePath = `./${page}.html`;
	}

	let html = await fs.readFile(htmlFilePath, 'utf8');

	let dom = new JSDOM(html);
	let document = dom.window.document;

	async function loadTranslationMD() {
		let file = `./lang/${langCode}`;
		if (pageGroup) file += `/${pageGroup}`;
		file += `/${page}.md`;

		let trans = await fs.readFile(file, 'utf8');
		trans = trans.split('\n# ');
		trans[0] = trans[0].slice(2);

		for (let tran of trans) {
			let splitIdx = tran.indexOf('\n');
			let id = tran.slice(0, splitIdx);
			if (!isNaN(id[0])) id = 'md' + id;
			let md = document.getElementById(id);
			if (!md) continue;
			md.innerHTML = '\n' + marked.parse(tran.slice(splitIdx + 1));
			let links = md.getElementsByTagName('a');
			for (let link of links) {
				link.setAttribute('target', '_blank');
			}
		}
	}

	function loadTranslationJSON(key) {
		let lang = langJSON[key];
		if (!lang) return;

		for (let label in lang.DOM) {
			let el = document.getElementById(label);
			if (el) el.innerHTML = lang.DOM[label];
		}

		if (key == 'main') return;

		if (pageGroup == 'learn' && page != 'index' && page != 'activism') {
			const pageNav = document.getElementById('pageNav');
			lang = lang[page];
			for (let pageBtn of pageNav.children) {
				pageBtn.innerHTML = lang[pageBtn.dataset.page];
			}
		}
	}

	loadTranslationJSON('main');
	loadTranslationJSON(pageGroup || page);

	await loadTranslationMD();

	if (langCode != 'en') {
		htmlFilePath = `./lang/${langCode}` + htmlFilePath.slice(1);
	}

	// edit scripts if necessary
	let scripts = Array.from(document.querySelectorAll('script[type="mie/p5"]'));

	for (let i = 0; i < scripts.length; i++) {
		let t = scripts[i].textContent;
		if (langCode != 'en') {
			t = t.replaceAll("'assets", "'/learn/assets");
		}
		scripts[i].textContent = t;
	}

	if (langCode != 'en') {
		// change website language
		document.documentElement.lang = langCode;
		document.documentElement.className = langCode;

		let langNav = document.getElementById('langNav');
		if (!langNav) langNav = document.getElementById('littleLangs');
		if (langNav) {
			// remove active class from english link
			langNav.children[0].classList.remove('active');
			// add active class to current language link
			langNav.querySelector(`[lang="${langCode}"]`).classList.add('active');
		}
	}

	if (langCode == 'ja') {
		const googleAPI = document.createElement('link');
		googleAPI.rel = 'preconnect';
		googleAPI.href = 'https://fonts.googleapis.com';
		const gstatic = document.createElement('link');
		gstatic.rel = 'preconnect';
		gstatic.href = 'https://fonts.gstatic.com';
		gstatic.crossOrigin = '';
		const fonts = document.createElement('link');
		fonts.rel = 'stylesheet';
		fonts.href = `https://fonts.googleapis.com/css2?family=Roboto&family=Noto+Sans+JP&family=Noto+Color+Emoji&display=swap`;

		document.head.appendChild(googleAPI);
		document.head.appendChild(gstatic);
		document.head.appendChild(fonts);
	}

	html = dom.serialize();

	html = await beautify(html, {
		indent_size: 1,
		indent_char: '\t',
		max_preserve_newlines: 1,
		preserve_newlines: true,
		keep_array_indentation: false,
		break_chained_methods: false,
		indent_scripts: 'separate',
		brace_style: 'none,preserve-inline',
		space_before_conditional: true,
		unescape_strings: false,
		jslint_happy: false,
		end_with_newline: true,
		wrap_line_length: 120,
		indent_inner_html: false,
		comma_first: false,
		e4x: false,
		indent_empty_lines: false
	});

	html = html.replace(/(<script .+>)\s*/g, '$1\n');

	await fs.writeFile(htmlFilePath, html);
	log(path.resolve(htmlFilePath));
}

main();
