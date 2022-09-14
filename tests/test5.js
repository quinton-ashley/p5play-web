let ground;

function setup() {
	createCanvas(400, 400);
	// world.gravity.y = 10;

	new Sprite().rotation = random(90);
	ground = new Sprite(200, 400, [400, 0], 'kinematic');
	ground.vel.y = -1;
}

function draw() {
	clear();
}
