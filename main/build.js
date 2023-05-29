const fs = require('fs/promises');
const path = require('path');

const langCode = process.argv[2];

const getPagesInDirectory = (dir) => {
	return fs.readdirSync(dir).filter((file) => path.extname(file) === '.html');
};

async function main() {
	if (!langCode) {
		console.error('Please provide a language code (ISO 639-1) as an argument.');
		process.exit(1);
	}

	// Translate the index.html page
	await translatePage('index');

	// Get the list of pages in the "learn" directory
	const learnPages = getPagesInDirectory('../learn');

	// Translate each page in the "learn" directory
	for (const page of learnPages) {
		await translatePage('learn', page);
	}
}

main();

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

	async function loadTranslationMD() {
		let file = `../${langCode}`;
		if (pageGroup) file += `/${pageGroup}`;
		file += `/${page}.md`;

		let trans = await fs.readFile(file, 'utf8');
		trans = trans.split('\n# ');
		trans[0] = trans[0].slice(2);

		for (let tran of trans) {
			let splitIdx = tran.indexOf('\n');
			let mdID = 'md' + tran.slice(0, splitIdx);
			let regex = new RegExp(`(<[^>]* id="${mdID}">).*?(<\\/[^>]*>)`, 's');
			html = html.replace(regex, `$1${marked(tran.slice(splitIdx + 1))}$2`);
		}
	}

	async function loadTranslationJSON() {
		let file = `../${langCode}/${langCode}.json`;
		let lang = JSON.parse(await fs.readFile(file, 'utf8'));
		lang = lang[pageGroup];

		for (let label in lang.DOM) {
			let regex = new RegExp(`(<[^>]* id="${label}">).*?(<\\/[^>]*>)`, 's');
			html = html.replace(regex, `$1${lang.DOM[label]}$2`);
		}

		if (pageGroup == 'learn') {
			lang = lang[page];
			for (let pageBtn in lang) {
				let regex = new RegExp(`(<[^>]* data-page="${pageBtn}">).*?(<\\/[^>]*>)`, 's');
				html = html.replace(regex, `$1${lang[pageBtn]}$2`);
			}
		}
	}

	await Promise.all([loadTranslationMD(), loadTranslationJSON()]);

	// After changes, we can write the new HTML content back to the file
	await fs.writeFile(htmlFilePath, html);
}
