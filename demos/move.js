let player, block;

function setup() {
	createCanvas(500, 500);

	player = new Sprite();
	player.diameter = 50;
	player.x = 400;

	block = new Sprite();
}

function draw() {
	clear();
	if (mouse.pressed()) {
		player.move(mouse.x, mouse.y, 8);
	}
}
