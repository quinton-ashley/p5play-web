// Changing the sprites' appearance
// press the mouse and move the cursor to control the animations

let box, asterisk, ghost, cloud;

function preload() {
	// if you create a new sprite without an animation,
	// the sprite's collider will be shown
	box = new Sprite(100, 150, 50, 100);
	// change the color of the collider to orange
	box.color = color(222, 125, 2);

	asterisk = new Sprite(300, 150, 110); // circle with diameter of 110
	asterisk.addImg('assets/asterisk.png');

	ghost = new Sprite(500, 150, 60, 128);
	ghost.addAni('floating', 'assets/ghost_standing0001.png', 7);

	cloud = new Sprite(700, 150, 120);
	cloud.addAni('breathing', 'assets/cloud_breathing0001.png', 5);
}

function setup() {
	new Canvas(800, 300);
}

function draw() {
	background(255);

	// all the methods and properties of the current animation will be
	// accessible from the .animation or .ani properties of the sprite

	// stop/play a sprite animation
	if (mouse.pressing()) {
		ghost.ani.stop();
	} else {
		ghost.ani.play();
	}

	// change the frame in relation to the mouse's y position
	let frame = round(map(mouse.y, 0, height, 0, cloud.ani.lastFrame, true));
	// note: frames must be integer numbers so I have to round the result of map

	cloud.ani.changeFrame(frame);
}
