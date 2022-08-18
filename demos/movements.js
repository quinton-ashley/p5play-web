// Moving sprites
let ghost, circle;

function preload() {
	ghost = new Sprite(0, 0, 50, 100);
	ghost.addAni('floating', 'assets/ghost_standing0001.png', 7);

	circle = new Sprite(500, 200, 50);
	circle.addAni('floating', 'assets/asterisk_circle0006.png', 8);
	circle.direction = 90;

	ghost.overlap(circle);
}

function setup() {
	createCanvas(800, 400);
}

function draw() {
	background(255);

	// aside of setting the velocity directly you can move a sprite
	// by providing a speed and an angle
	circle.direction += 2;
	// speed, angle
	circle.speed = 5;

	// you can rotate the sprite according the direction it is moving
	// uncomment this
	// circle.rotateToDirection = true;

	// or by applying a force toward a point
	// force (acceleration), pointx, pointy
	ghost.attractionPoint(0.2, mouse.x, mouse.y);
}
