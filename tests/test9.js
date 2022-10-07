let splats;

function setup() {
	createCanvas(500, 160);

	splats = new Group();
	splats.life = 40;
	splats.addAni('../learn/assets/asterisk_explode0001.png', 11);
}

function draw() {
	clear();

	if (mouse.pressed()) {
		new splats.Sprite(mouse.x, mouse.y);
	}
}
