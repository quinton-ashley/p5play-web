let block, platform;

function setup() {
	createCanvas(60, 400);
	world.gravity.y = 10;

	block = new Sprite(30, 30);
	block.bounciness = 0;
	platform = new Sprite(30, 200, 60, 5, 'kinematic');
	platform.shapeColor = 'red';
}

function draw() {
	clear();
	platform.vel.y = cos(frame * 2.2) * 6;

	// the block will blink between red and blue when the block is being
	// displaced by the platform, ideally the block should stay red while
	// stationary on the platform
	if (block.colliding(platform)) {
		block.shapeColor = 'red';
	} else {
		block.shapeColor = 'blue';
	}
}
