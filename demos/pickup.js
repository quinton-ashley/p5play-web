let instructions = 'Use the left and right arrow keys to move the player to pickup items';

let player, items;

function setup() {
	new Canvas(800, 400);
	world.gravity.y = 10;

	items = new Group();

	player = new Sprite(width * 0.5, height - 30, 50, 20, 'k');
	// a is the player, b is the item
	player.overlap(items, (a, b) => b.remove());
}

function draw() {
	background(255);
	text(instructions, 20, 20);

	if (frameCount % 40 == 0) {
		new items.Sprite(random(10, width - 10), -10, 20, 20);
	}

	if (kb.pressing('left')) {
		player.vel.x = -10;
	} else if (kb.pressing('right')) {
		player.vel.x = 10;
	} else player.vel.x = 0;
}
