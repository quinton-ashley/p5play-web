// Pickup

let instructions = 'Use the left and right arrow keys to move the player to pickup items';

let player, items;
let score = 0;
let count = 0;

function setup() {
	createCanvas(800, 200);

	let centerX = width * 0.5;

	items = new Group();

	player = new Sprite(centerX, height - 30, 50, 20);
	// a is the player, b is the item
	player.overlap(items, (a, b) => b.remove());
}

function draw() {
	background(255);
	text(instructions, 20, 20);

	if (count >= 80) {
		let item = new Sprite(random(10, width - 10), -10, 20, 20);
		item.vel.y = 2;
		items.add(item);
		count = 0;
	}

	if (keyIsDown('ArrowLeft')) {
		player.vel.x = -10;
	} else if (keyIsDown('ArrowRight')) {
		player.vel.x = 10;
	} else {
		player.vel.x = 0;
	}

	count++;
}
