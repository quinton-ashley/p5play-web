const log = console.log;

const qrDiv = document.getElementById('qr');

let ipAddress;
let homeDir;

let lang;
let proj;
let serverRunning = false;

let activeTabBtn = {};
let activeTab = document.getElementById('welcome');

let desktop = typeof window.ipc !== 'undefined';

async function start() {
	if (desktop) {
		document.body.innerHTML += `<script src="../node_modules/@bitjson/qr-code/dist/qr-code.js"></script>`;
		ipAddress = await ipc.invoke('getIpAddress');
		homeDir = await ipc.invoke('getHomeDir');
	}

	let tabBtns = document.getElementById('tab-btns');
	for (let i = 0; i < tabBtns.children.length; i++) {
		let tabBtn = tabBtns.children[i];
		tabBtn.addEventListener('click', function () {
			activeTabBtn.className = '';
			this.className = 'active';
			activeTabBtn = this;
			activeTab.style.display = 'none';
			activeTab = document.getElementById(this.dataset.tab);
			activeTab.style.display = 'flex';
		});
	}

	lang = await (await fetch('../lang/en/en.json')).json();
	for (let key in lang.DOM) {
		let el = document.getElementById(key);
		if (el) el.innerHTML += lang.DOM[key];
	}
	lang = lang.msgs;
}
start();

async function selectProjectFolder() {
	if (!desktop) return;

	let dir = await ipc.invoke('selectFolder', lang.selectProjectFolder);
	if (!dir) return alert(lang.error + ': ' + lang.err0);
	proj = dir;

	let selector = document.getElementById('selectProjectFolder');
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
