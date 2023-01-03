// Collision detection - Bouncing behavior

let circles;
let boxes;

// If you want to use preload, all your asset loading must be done
// in preload. Using preload is useful because for example here the
// width and height of the boxes are determined by the dimensions of
// its animation.
function preload() {
	circles = new Group();
	circles.addAni('assets/asterisk_circle0006.png', 8);

	circles.diameter = 110;
	circles.bounciness = 0.9;
	circles.friction = 0;
	circles.direction = () => random(0, 360);
	circles.speed = () => random(2, 6);
	circles.scale = () => random(0.2, 1);

	boxes = new Group();
	boxes.addAni('assets/box0001.png', 3);
	boxes.ani.frameDelay = 60;
	boxes.collider = 'static';
	// ternary conditions, fancy eh?
	boxes.rotation = () => (boxes.length % 2 ? 0 : 90);
}

function setup() {
	new Canvas(800, 400);

	for (let i = 0; i < 20; i++) {
		// new circle with a random position on the screen
		let circle = new circles.Sprite(random(0, width), random(0, height));
		// mass determines the force exchange in case of bounce
		circle.mass = circle.scale;
		circle.ani.frameDelay = round(random(10, 20));
	}

	for (let j = 0; j < 4; j++) {
		new boxes.Sprite(random(0, width), random(0, height));
	}
}

function draw() {
	background(255);

	// all sprites bounce at the screen edges
	for (let s of allSprites) {
		if (s.x < 0) {
			s.x = 1;
			s.vel.x = abs(s.vel.x);
		}

		if (s.x > width) {
			s.x = width - 1;
			s.vel.x = -abs(s.vel.x);
		}

		if (s.y < 0) {
			s.y = 1;
			s.vel.y = abs(s.vel.y);
		}

		if (s.y > height) {
			s.y = height - 1;
			s.vel.y = -abs(s.vel.y);
		}
	}

	allSprites.debug = mouse.pressing();
}
