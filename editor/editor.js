const log = console.log;
let desktop = typeof window.ipc !== 'undefined';

const qrDiv = document.getElementById('qr');
const openProjectLabel = document.getElementById('openProjectLabel');
const codeNav = document.getElementById('codeNav');
const codeEditors = document.getElementById('codeEditor');
const sceneEditor = document.getElementById('sceneEditor');
let webFolderSelector = document.getElementById('webFolderSelector');

let codeNavTabs = [];

let ipAddress, homeDir, lang, proj;
let serverRunning = false;

let activeZoneBtn = {};
let activeZone = null;

async function openProject() {
	if (!desktop) return webFolderSelector.click();

	let { dir, files } = await ipc.invoke('selectFolder', lang.openProject);
	if (!files) return alert(lang.error + ': ' + lang.err0);

	proj = dir;
	openProjectLabel.innerText = dir.replace(homeDir, '~');

	_openProject(files);
}

async function _openProject(files) {
	if (!files.length) {
		alert('ERROR: There are no files in that folder.');
		return;
	}
	log(files);

	document.getElementById('zones').style.display = 'flex';

	let hasJS = false;
	for (let i = 0; i < files.length; i++) {
		let file = files[i];
		if (!file.type.endsWith('javascript')) continue;

		let path;
		if (desktop) {
			path = file.path;
		} else {
			path = file.webkitRelativePath;
			if (!hasJS) openProjectLabel.innerText = path.slice(0, path.indexOf('/'));
			path = path.slice(path.indexOf('/') + 1);
		}
		if (path.startsWith('node_modules')) continue;

		hasJS = true;
		let tab = document.createElement('tab');
		tab.dataset.value = i;
		tab.innerText = path;
		tab.addEventListener('click', () => {
			let ed = codeEditors.querySelector('#editor' + i);
			if (ed) {
				if (!ed.classList.contains('active')) {
					ed.select();
				} else {
					ed.classList.remove('active');
					tab.classList.remove('active');
					resetMain();
				}
				return;
			}
			loadCodeEditor(files[i], i);
		});
		codeNav.appendChild(tab);
	}

	if (!hasJS) {
		alert('ERROR: There are no JavaScript files in that folder.');
		return;
	}

	codeNavTabs = document.querySelectorAll('#codeNav > tab');

	if (!desktop) loadCodeEditor(files[0], 0);
}

function resetMain() {
	ipc.invoke('resizeWindow', 500, 132);
}

function expandMain() {
	ipc.invoke('resizeWindow', 500, 600);
}

/* MOBILE */

async function startServer() {
	if (serverRunning) return;

	let res = await ipc.invoke('startServer', proj);
	if (!res) return alert(lang.error + ': ' + lang.err1);
	serverRunning = true;

	if (document.body.offsetHeight < 200) expandMain();

	qrDiv.innerHTML = '';
	let qr0 = document.createElement('qr-code');
	qr0.id = 'qr0';
	qr0.innerHTML = `<img src="../main/logo.svg" slot="icon">`;
	qr0.contents = 'p5play://' + ipAddress + ':7529';
	qr0.moduleColor = '#ed225d';
	qr0.positionRingColor = '#ed225d';
	qr0.positionCenterColor = '#c0eeff';
	qr0.maskXToYRatio = '1';
	qr0.addEventListener('codeRendered', () => {
		qr0.animateQRCode((targets, _x, _y, _count, entity) => ({
			targets,
			from: entity === 'module' ? Math.random() * 200 : 200,
			duration: 500,
			easing: 'cubic-bezier(1,1,0,.5)',
			web: {
				opacity: [0, 1],
				scale: [0.3, 1.13, 0.93, 1]
			}
		}));
	});
	qrDiv.append(qr0);
}

async function buildIOS() {}

/* CODE EDITOR */

async function loadCodeEditor(file, idx) {
	let code;
	if (desktop) {
		code = await ipc.invoke('readFile', proj + '/' + file.path);
	} else {
		code = await file.text();
	}

	if (!code) {
		alert('ERROR: There was an error reading the file.');
		return;
	}

	log(code);

	let ed = document.createElement('div');
	ed.id = 'editor' + idx;
	ed.innerHTML = code;
	codeEditors.append(ed);

	const editor = ace.edit('editor' + idx);
	editor.setOptions({
		mode: 'ace/mode/javascript',
		fontSize: '14px',
		showFoldWidgets: false,
		showGutter: false,
		tabSize: 2,
		wrap: true
	});
	editor.setTheme('ace/theme/dracula');

	ed.select = () => {
		for (let tab of codeNavTabs) tab.classList.remove('active');
		for (let ed of codeEditors.children) ed.classList.remove('active');
		ed.classList.add('active');
		codeNavTabs[idx].classList.add('active');
		if (desktop && document.body.offsetHeight < 200) expandMain();
	};
	ed.select();
}

/* SCENE EDITOR */

// function setup() {
// 	new Canvas(sceneEditor.offsetWidth, sceneEditor.offsetHeight);
// 	noStroke();

// 	// tray that will hold the user's sprites and group sprites
// 	fill('#303030');
// 	rect(0, height - 160, width, 5);

// 	fill('#131516');
// 	for (let i = 0; i < 12; i++) {
// 		let x = 10 + i * 156;
// 		let y = height - 148;

// 		rect(x, y, 140, 140, 5);
// 	}
// }

/* UTILS */

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

async function start() {
	if (!desktop && navigator.onLine) {
		await loadScripts([
			'https://cdn.jsdelivr.net/npm/ace-builds@1.18.0/src-min-noconflict/ace.min.js',
			'https://cdn.jsdelivr.net/npm/ace-builds@1.18.0/src-min-noconflict/ext-language_tools.js'
		]);
		loadScript('https://cdn.jsdelivr.net/npm/@bitjson/qr-code@1.0.2/dist/qr-code.js');
	} else {
		await loadScripts([
			'../learn/ace/ace.min.js',
			'../learn/ace/ext-language_tools.js',
			'../learn/ace/mode-javascript.js',
			'../learn/ace/theme-dracula.js',
			'../learn/ace/theme-xcode.js',
			'../node_modules/@bitjson/qr-code/dist/qr-code.js'
		]);
	}

	if (desktop) {
		ipAddress = await ipc.invoke('getIpAddress');
		homeDir = await ipc.invoke('getHomeDir');
		resetMain();

		const externalLinks = document.getElementsByClassName('externalLink');

		for (const link of externalLinks) {
			link.addEventListener('click', function (event) {
				event.preventDefault();
				const href = this.getAttribute('href');
				ipc.invoke('openInBrowser', href);
			});
		}
	} else {
		webFolderSelector.addEventListener('change', () => _openProject(webFolderSelector.files));
	}

	lang = await (await fetch('../lang/en/editor.json')).json();
	for (let key in lang.DOM) {
		let el = document.getElementById(key);
		if (el) el.innerHTML += lang.DOM[key];
	}
	lang = lang.msgs;
}
start();
