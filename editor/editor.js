const log = console.log;

const qrDiv = document.getElementById('qr');

let ipAddress;
let homeDir;

let lang;
let proj;
let serverRunning = false;

let activeTabBtn = {};
let activeTab = document.getElementById('editor');
let openProjectLabel = document.getElementById('openProjectLabel');
let codeNav = document.getElementById('codeNav');
let codeEditor = document.getElementById('codeEditor');

let desktop = typeof window.ipc !== 'undefined';

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
	}

	lang = await (await fetch('../lang/en/editor.json')).json();
	for (let key in lang.DOM) {
		let el = document.getElementById(key);
		if (el) el.innerHTML += lang.DOM[key];
	}
	lang = lang.msgs;
}
start();

async function openProject() {
	if (!desktop) {
		webFolderSelector.click();
		return;
	}

	let dir = await ipc.invoke('selectFolder', lang.openProject);
	if (!dir) return alert(lang.error + ': ' + lang.err0);
	proj = dir;

	let selector = document.getElementById('openProject');
	selector.innerText = proj.replace(homeDir, '~');

	document.getElementById('#options').style.display = 'flex';
}

async function startServer() {
	if (!desktop) return;

	if (serverRunning) {
		ipc.invoke('openBrowser', 'http://127.0.0.1:7529');
		return;
	}

	let res = await ipc.invoke('startServer', proj);
	if (!res) return alert(lang.error + ': ' + lang.err1);
	serverRunning = true;

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

/* WEB */

let webFolderSelector = document.getElementById('webFolderSelector');
webFolderSelector.addEventListener('change', webOpenProject);

async function loadSketch(file) {
	let code = await file.text();
	log(code);

	let idNum = codeEditor.children.length;

	let ed = document.createElement('div');
	ed.id = 'editor' + idNum;
	ed.innerHTML = code;
	codeEditor.append(ed);

	let editor = ace.edit('editor' + idNum);
	editor.setOptions({
		mode: 'ace/mode/javascript',
		fontSize: '14px',
		showFoldWidgets: false,
		showGutter: false,
		tabSize: 2
	});
	editor.setTheme('ace/theme/dracula');
}

async function webOpenProject() {
	if (!this.files.length) {
		alert('ERROR: There are no files in that folder.');
		return;
	}

	// put folder name in openProject button
	openProjectLabel.innerHTML = this.files[0].webkitRelativePath.split('/')[0];

	// document.getElementById('openProject').style.display = 'none';
	// document.getElementById('navBtns').style.display = 'flex';

	log(this.files);

	for (let i = 0; i < this.files.length; i++) {
		let file = this.files[i];

		let path = file.webkitRelativePath;
		path = path.slice(path.indexOf('/') + 1);

		if (path.startsWith('node_modules')) continue;

		if (file.type == 'text/javascript') {
			codeNav.innerHTML += `<tab data-value="${i}">${path}</tab>`;
		}
	}

	let tabs = document.querySelectorAll('#codeNav tab');
	tabs[0].className = 'active';

	let file = this.files[tabs[0].dataset.value];
	loadSketch(file);
}
