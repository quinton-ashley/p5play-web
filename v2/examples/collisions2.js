// Collisions
// Collision between groups
// function called upon collision

let obstacles;
let collectibles;
let asterisk;

function setup() {
	createCanvas(800, 400);

	// create a user controlled sprite
	asterisk = createSprite(400, 200);
	asterisk.addAnimation('default', 'assets/asterisk_normal0001.png', 'assets/asterisk_normal0003.png');

	asterisk.addAnimation('stretch', 'assets/asterisk_stretching0001.png', 'assets/asterisk_stretching0008.png');

	//  2 groups
	obstacles = new Group();
	collectibles = new Group();

	for (let i = 0; i < 4; i++) {
		let box = createSprite(random(0, width), random(0, height));
		box.addAnimation('default', 'assets/box0001.png', 'assets/box0003.png');
		obstacles.add(box);
	}

	for (let j = 0; j < 10; j++) {
		let dot = createSprite(random(0, width), random(0, height));
		dot.addAnimation('default', 'assets/small_circle0001.png', 'assets/small_circle0003.png');
		dot.animation.frameDelay = 16;
		collectibles.add(dot);
	}
}

function draw() {
	background(255, 255, 255);

	// if no arrow input set velocity to 0
	asterisk.velocity.x = (mouseX - asterisk.position.x) / 10;
	asterisk.velocity.y = (mouseY - asterisk.position.y) / 10;

	// asterisk collides against all the sprites in the group obstacles
	asterisk.collide(obstacles);

	// I can define a function to be called upon collision, overlap, displace or bounce
	// see collect() below
	asterisk.overlap(collectibles, collect);

	// if the animation is "stretch" and it reached its last frame
	if (asterisk.getAnimationLabel() == 'stretch' && asterisk.animation.getFrame() == asterisk.animation.getLastFrame()) {
		asterisk.changeAnimation('default');
	}

	drawSprites();
}

// the first parameter will be the sprite (individual or from a group)
// calling the function
// the second parameter will be the sprite (individual or from a group)
// against which the overlap, collide, bounce, or displace is checked
function collect(collector, collected) {
	// collector is another name for asterisk
	// show the animation
	collector.changeAnimation('stretch');
	collector.animation.rewind();
	// collected is the sprite in the group collectibles that triggered
	// the event
	collected.remove();
}
