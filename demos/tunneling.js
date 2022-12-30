function setup() {
	new Canvas(800, 400);

	let centerX = width * 0.5;
	let centerY = height * 0.5;

	let circle = new Sprite(centerX, centerY, 5);
	circle.color = '#fff'; // white
	circle.bounciness = 1;
	circle.friction = 0;

	// this test determines whether tunneling is prevented
	// by the planck.js physics simulation
	// tunneling is when an object is moving so fast that
	// within one frame it would move to the other side of
	// a thin wall
	circle.direction = 44;
	circle.speed = 20;

	new Sprite(centerX, height * 0.25, width, 2, 'static');
	new Sprite(centerX, height * 0.75, width, 2, 'static');
	new Sprite(width * 0.25, centerY, 2, height, 'static');
	new Sprite(width * 0.75, centerY, 2, height, 'static');
}

function draw() {
	background(50);
}
