const p5functions = [
	'preload',
	'setup',
	'draw',
	'keyPressed',
	'keyReleased',
	'keyTyped',
	'mouseMoved',
	'mouseDragged',
	'mousePressed',
	'mouseReleased',
	'mouseClicked',
	'touchStarted',
	'touchMoved',
	'touchEnded'
];

let editor;
let myP5 = document.getElementById('myP5');
let sketch;

function playCode(code, elem) {
	function s(p) {
		for (let f of p5functions) {
			code = code.replace('function ' + f + '()', 'p.' + f + ' = function()');
		}
		with (p) eval(code);
	}
	elem.innerHTML = ''; // avoid duplicate canvases
	return new p5(s, elem);
}

function playEditor() {
	if (sketch) sketch.remove();
	sketch = playCode(editor.getValue(), myP5);
}

function startMain() {
	ace.config.set('basePath', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.8.1/');
	editor = ace.edit('editor');
	editor.session.on('changeMode', function (e, session) {
		if ('ace/mode/javascript' === session.getMode().$id) {
			if (!!session.$worker) {
				session.$worker.send('setOptions', [
					{
						esversion: 11,
						esnext: false
					}
				]);
			}
		}
	});
	editor.session.setMode('ace/mode/javascript');
	editor.setTheme('ace/theme/xcode');
	editor.getSession().setMode('ace/mode/javascript');
	editor.getSession().setUseWrapMode(true);
	//editor.setHighlightActiveLine(false);
	editor.renderer.setShowPrintMargin(false);
	//editor.renderer.setShowGutter(false);
	//editor.gotoLine(0);
	// editor.setAutoScrollEditorIntoView(true);
	editor.setOptions({
		maxLines: 28,
		tabSize: 2
	});
}

let args = {};
{
	let params = new URLSearchParams(location.href.split('?')[1]);
	for (let pair of params.entries()) {
		args[pair[0]] = pair[1];
	}
}

// I removed demos that I felt were duplicates of Learn page examples
let examples = {
	Physics: {
		collisions: 'collide, overlap, displace',
		customColliders: 'custom colliders',
		bounces: 'bounces',
		swap: 'control swap',
		pickup: 'pickup',
		culling: 'culling offscreen sprites'
	},
	Camera: {
		camera: 'using the virtual camera',
		mouseCamera: 'mouse events with camera'
	},
	Advanced: {
		ballPit: 'ball pit',
		drop: 'drop',
		hourglass: 'hourglass',
		tumbler: 'tumbler',
		groupOrbit: 'group orbit',
		polygons: 'polygons',
		star: 'star'
	},
	Tests: {
		collisions5: 'large edge colliders [TODO]',
		moveOrbit: 'group orbit + moveTowards [TODO]',
		collidingBug: 'displacing [BUG]',
		fullBounce: 'bounciness [BUG]'
	},
	Games: {
		pong: 'Pong',
		asteroids: 'Asteroids',
		breakout: 'Breakout',
		dotEater: 'Dot Eater',
		flappyBird: 'Flappy Bird',
		platformer: 'Tricky Platformer'
	}
};

let ih = '';
for (let category in examples) {
	ih += `<div><h4>${category}</h4>`;
	for (let name in examples[category]) {
		let description = examples[category][name];
		ih += `
<a class="dropdown-item" role="menuitem" href="?file=${name}.js">${description}</a>
`;
	}
	ih += `</div>`;
}
let ul = document.getElementById('examples');
ul.innerHTML += ih;

let originalCode;

$(async () => {
	let file = args.file || args.fileName || 'collisions.js';
	originalCode = `console.log('running ${file}');\n\n`;
	originalCode += await (await fetch(file)).text();
	startMain();
	console.log('example loaded');
	editor.setValue(originalCode, -1);
	playEditor();
});

function undoAllChanges() {
	editor.setValue(originalCode, -1);
	playEditor();
}

function run() {
	playEditor();
}

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
