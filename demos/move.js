let player, block;

function setup() {
	new Canvas(800, 500);

	player = new Sprite();
	player.diameter = 50;
	player.x = 600;

	block = new Sprite();
}

function draw() {
	clear();

	// depending on how the player hits the block
	// it either can reach the destination or not
	if (mouse.presses()) {
		player.moveTo(mouse, 8);
	}
}
