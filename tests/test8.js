let splatAni;

function setup() {
	createCanvas(500, 160);
	splatAni = loadAni('../learn/assets/asterisk_explode0001.png', 11);
}

function draw() {
	clear();

	if (mouse.presses()) {
		let splat = new Sprite(splatAni, mouse.x, mouse.y);
		splat.life = 40;
	}
}
