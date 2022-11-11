// Diagonal Slow Bounce Fix

let ball, walls;

function setup() {
	new Canvas(800, 400);

	/* FIX */
	// by default the velocity threshold is higher to avoid jittering on
	// stationary objects, for a physics experiment like this no momentum
	// should be lost no matter how small
	planck.Settings.velocityThreshold = 0;

	let centerX = width * 0.5;
	let centerY = height * 0.5;

	ball = new Sprite(centerX + 20, centerY, 20);
	ball.vel.x = 0.8;
	ball.vel.y = 0.8;
	ball.bounciness = 1;
	ball.friction = 0;

	walls = new Group();
	walls.collider = 'static';
	new walls.Sprite(centerX, height * 0.25, width * 0.46, 20);
	new walls.Sprite(centerX, height * 0.75, width * 0.46, 20);
	new walls.Sprite(width * 0.25, centerY, 20, height * 0.46);
	new walls.Sprite(width * 0.75, centerY, 20, height * 0.46);
}

function draw() {
	background(150);
	text(Math.abs(ball.velocity.x) + Math.abs(ball.velocity.y), 20, 20);
}
