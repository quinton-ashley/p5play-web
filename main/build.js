const log = console.log;
const fs = require('fs/promises');
const path = require('path');
const prettier = require('prettier');
const { JSDOM } = require('jsdom');
const marked = require('../learn/marked/marked.min.js');

const langCode = process.argv[2];

async function main() {
	if (!langCode) {
		console.error('Please provide a two letter language code (ISO 639-1), for example: node main/build.js es');
		process.exit(1);
	}

	await translatePage('index');

	const pages = await getPagesInDirectory('learn');
	for (const page of pages) {
		await translatePage('learn', page);
	}
	log('Done!');
}

async function getPagesInDirectory(dir) {
	let files = await fs.readdir('./' + dir);
	const fileNames = [];
	for (const file of files) {
		if (file.endsWith('.html')) {
			// removes the '.html' extension
			fileNames.push(file.slice(0, -5));
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
			let id = tran.slice(0, splitIdx - 1);
			if (!isNaN(id[0])) id = 'md' + id;
			let md = document.getElementById(id);
			if (md) md.innerHTML = marked.parse(tran.slice(splitIdx + 1));
		}
	}

	async function loadTranslationJSON() {
		let file = `./lang/${langCode}/${langCode}.json`;
		let lang = JSON.parse(await fs.readFile(file, 'utf8'));
		lang = lang[pageGroup || page];

		if (!lang) return;

		for (let label in lang.DOM) {
			let el = document.getElementById(label);
			if (el) el.innerHTML = lang.DOM[label];
		}

		if (pageGroup == 'learn' && page != 'index') {
			const pageNav = document.getElementById('pageNav');
			lang = lang[page];
			for (let pageBtn of pageNav.children) {
				pageBtn.innerHTML = lang[pageBtn.dataset.page];
			}
		}
	}

	await Promise.all([loadTranslationMD(), loadTranslationJSON()]);

	if (langCode != 'en') {
		htmlFilePath = `./lang/${langCode}` + htmlFilePath.slice(1);
	}

	// Extract scripts
	let scripts = Array.from(document.querySelectorAll('script[type="mie/p5"]'));
	let scriptTexts = [];

	for (let i = 0; i < scripts.length; i++) {
		scriptTexts[i] = scripts[i].textContent;
		scripts[i].textContent = '';
	}

	if (langCode != 'en') {
		// change html langugage
		document.documentElement.lang = langCode;
		// fix all relative sources
		let stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
		let scripts = Array.from(document.querySelectorAll('script[src]'));
		let images = Array.from(document.querySelectorAll('img[src]'));
		// let links = Array.from(document.querySelectorAll('a[href]'));

		let prefix = '../../';
		if (pageGroup) prefix += '../' + pageGroup + '/';
		let els = [...stylesheets, ...scripts, ...images];
		for (let el of els) {
			if (el.href && !el.href.startsWith('http')) {
				el.href = prefix + el.href;
			}
			if (el.src && !el.src.startsWith('http')) {
				el.src = prefix + el.src;
			}
		}
		let langNav = document.getElementById('langNav');
		if (langNav) {
			// remove active class from english link
			langNav.children[0].classList.remove('active');
			langNav.children[0].href = prefix;
			// add active class to current language link
			langNav.querySelector(`[lang="${langCode}"]`).classList.add('active');
		}
	}

	// Format HTML without scripts
	html = prettier.format(dom.serialize(), {
		parser: 'html'
	});

	// Re-insert scripts
	dom = new JSDOM(html);
	document = dom.window.document;
	scripts = Array.from(document.querySelectorAll('script[type="mie/p5"]'));

	for (let i = 0; i < scripts.length; i++) {
		scripts[i].textContent = scriptTexts[i];
	}

	html = dom.serialize();

	await fs.writeFile(htmlFilePath, html);
	log(path.resolve(htmlFilePath));
}

main();
