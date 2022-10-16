let block, platform;

function setup() {
	createCanvas(60, 400);
	world.gravity.y = 10;

	block = new Sprite(30, 30);
	block.bounciness = 0;
	platform = new Sprite(30, 300, 60, 5, 'kinematic');
	platform.shapeColor = 'red';
}

function draw() {
	clear();
	platform.vel.y = cos(frame * 1.8) * 7;

	// will blink between red and blue when the ball is being
	// pushed by the platform
	if (block.colliding(platform)) {
		block.shapeColor = 'red';
	} else {
		block.shapeColor = 'blue';
	}
}
