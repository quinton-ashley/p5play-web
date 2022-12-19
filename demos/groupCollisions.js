// Collisions between groups

let boxes, dots, asterisk;

function preload() {
	// create a user controlled sprite
	asterisk = new Sprite(400, 200, 120);
	asterisk.addAni('assets/asterisk_normal0001.png', 3);
	asterisk.addAni('stretch', 'assets/asterisk_stretching0001.png', 8);

	boxes = new Group();
	boxes.addAni('assets/box0001.png', 3);
	boxes.ani.frameDelay = 20;
	boxes.collider = 'static';

	dots = new Group();
	dots.addAni('assets/small_circle0001.png', 3);
	dots.ani.frameDelay = 30;
	dots.shape = 'circle';
}

function setup() {
	new Canvas(800, 400);

	for (let i = 0; i < 4; i++) {
		// new box with a random position on the screen
		new boxes.Sprite(random(0, width), random(0, height));
	}

	for (let j = 0; j < 10; j++) {
		new dots.Sprite(random(0, width), random(0, height));
	}

	// when the asterisk overlaps a dot, the collect function is run
	asterisk.overlap(dots, collect);
}

// the first parameter will be the sprite (individual or from a group)
// that set the overlap or collide detection
// the second parameter will be the sprite (individual or from a group)
// that overlapped or collided with the first sprite
function collect(collector, collected) {
	// the collector is the asterisk
	collector.ani = 'stretch'; // change animation
	collector.ani.frame = 0; // reset frame to starting frame
	// you can also use .autoResetAnimations to true to always reset
	// an animation to frame 0 after changing to an animation that had
	// already been played

	// collected is the sprite in the group collectibles that triggered
	// the event
	collected.remove();
}

function draw() {
	background(255);

	asterisk.moveTowards(mouse);

	// if the asterisk's animation is named "stretch" and it reached
	// its last frame, change its current animation to its default animation
	if (asterisk.ani.name == 'stretch' && asterisk.ani.frame == asterisk.ani.lastFrame) {
		asterisk.ani = 'default';
	}

	allSprites.debug = mouse.pressing();
}
