window.mies ??= [];
mie.lang ??= {};
mie.lang.p5 = {};

mie.lang.p5.completions = [
	{ value: 'new Sprite', score: 2, meta: '(ani, x, y, w, h, collider)' },
	{ value: 'Sprite', score: 1, meta: '(ani, x, y, w, h, collider)' },
	{ value: 'new Group', score: 1, meta: '()' },
	{ value: 'Group', score: 1, meta: '()' },
	{ value: 'createCanvas', score: 1, meta: '(w, h)' },
	{ value: 'ani', score: 1, meta: 'SpriteAnimation' },
	{ value: 'createSprite', score: 1, meta: '(ani, x, y, w, h, collider)' },
	{ value: 'createGroup', score: 1, meta: '()' }
];

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

mie.lang.p5.play = function (code) {
	if (!code.includes('function setup') && !code.includes('function draw')) {
		code = mie.bases[this.base || 0] + code + '}';
	}
	function s(p) {
		for (let f of p5functions) {
			code = code.replace('function ' + f + '()', 'p.' + f + ' = function()');
		}
		with (p) eval(code);
	}
	this.previewElem.innerHTML = ''; // avoid duplicate canvases
	return new p5(s, this.previewElem);
};

mie.lang.p5.remove = function () {
	if (this.player?.remove) this.player.remove();
};
