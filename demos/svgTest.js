let logosAni;

function preload() {
	let logos = [];
	for (let i = 0; i < 25; i++) {
		logos.push('../logos/logo' + i + '.svg');
	}
	logosAni = new SpriteAnimation(...logos);
	logosAni.frameDelay = 30;
}

function setup() {
	createCanvas(800, 400);
}

function draw() {
	clear();
	logosAni.draw(width / 2, height / 2, 0, 2, 2);
	logosAni.update();
}
