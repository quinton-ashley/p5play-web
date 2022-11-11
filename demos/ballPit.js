let circles, bigCircles, littleCircles, walls;

function setup() {
	new Canvas(400, 400);

	// by default the velocity threshold is higher to avoid jittering on
	// stationary objects, for a physics experiment like this no momentum
	// should be lost no matter how small
	planck.Settings.velocityThreshold = 0;

	circles = new Group();
	circles.bounciness = 1;
	circles.friction = 0;
	circles.direction = () => random(0, 360);
	circles.x = () => random(50, width - 50);
	circles.y = () => random(50, height - 50);

	bigCircles = new circles.Group();
	bigCircles.diameter = 50;
	bigCircles.mass = PI * 250;
	bigCircles.speed = 3;
	bigCircles.amount = 3;

	littleCircles = new circles.Group();
	littleCircles.diameter = 5;
	littleCircles.mass = PI * 25;
	littleCircles.speed = 0;
	littleCircles.amount = 150;

	walls = new Group();
	walls.collider = 'static';

	new walls.Sprite(width / 2, 10, [width, 0]);
	new walls.Sprite(width / 2, height - 10, [width, 0]);
	new walls.Sprite(10, height / 2, [height, 90]);
	new walls.Sprite(width - 10, height / 2, [height, 90]);
}

function draw() {
	background(220);
	status();

	if (mouse.presses()) circles.direction = 90;
}

function status() {
	// planck provides a fast and fairly accurate simulation of physics
	// for general use. In this specific experiment however total momentum
	// should remain the same (without changing the direction of circles)
	// over a long period of time but it doesn't due to planck's inaccuracies
	// a lot of momentum is lost in the beginning and gradually overtime
	// it rises. Visually the experiment still looks good though!
	let tm = 0;
	for (let c of circles) {
		tm += c.speed * c.mass;
	}
	textSize(12);
	text('Momentum ' + tm.toFixed(0), 30, 30);
}
