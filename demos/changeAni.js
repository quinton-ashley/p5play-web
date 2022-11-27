// Changing the sprites' animations
// position and transformations: rotation, scale, mirror
// move the mouse and click
// press and hold the up and down keys

let ghost;

function preload() {
	// create a new sprite and add the 3 animations
	ghost = new Sprite(400, 150, 50, 100);

	// loadAni is short for loadAnimation
	// loadAni(name, firstFrame, amountOfFrames)
	ghost.addAni('floating', 'assets/ghost_standing0001.png', 7);

	// offset is the distance of the animation from the center of the sprite
	// in this case since the animations have different heights, I offset 18
	// pixels from the center
	ghost.ani.offset.y = 18;
	// the .ani or .animation property stores the animation the sprite is
	// currently playing. Each animation you load will be automatically
	// set to the current animation. You can use this feature to change
	// an animation's properties without needing to store it in a
	// separate variable.

	ghost.addAni('moving', 'assets/ghost_walk0001.png', 4);

	ghost.addAni('spinning', 'assets/ghost_spin0001.png', 3);
}

function setup() {
	new Canvas(800, 300);
}

function draw() {
	background(255);

	// if mouse is to the left
	if (mouse.x < ghost.x - 10) {
		// you can change the sprite's animation by setting .ani to the
		// name of an animation
		ghost.ani = 'moving';
		ghost.mirror.x = true; // flip horizontally
		ghost.vel.x = -2;
	} else if (mouse.x > ghost.x + 10) {
		// if mouse is to the right
		ghost.ani = 'moving';
		ghost.mirror.x = false; // unflip
		ghost.vel.x = 2;
	} else {
		// else when close to the mouse, don't move
		ghost.ani = 'floating';
		ghost.vel.x = 0;
	}

	if (mouse.pressing()) {
		// the rotation is not part of the spinning animation
		ghost.rotation -= 10;
		ghost.ani = 'spinning';
	} else {
		ghost.rotation = 0;
	}

	// up and down keys to change the scale
	// note that scaling the image quality deteriorates
	// and scaling to a negative value flips the image
	if (kb.pressing('up')) ghost.scale += 0.05;
	if (kb.pressing('down')) ghost.scale -= 0.05;
}
