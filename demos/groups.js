// Sprite Groups

let clouds, ghosts, asterisk;

function setup() {
	new Canvas(800, 400);

	// Most games have sprites that have similar properties and behaviors,
	// such as the ghosts in PacMan. Use sprite groups to easily create
	// sprites that have the same traits as other sprites in the group.

	allSprites.diameter = 120;

	clouds = new Group();
	clouds.layer = 0;
	clouds.collider = 'none'; // no physics body collider
	clouds.rotationSpeed = -2;
	clouds.addAni('assets/cloud_pulsing0001.png', 7);
	clouds.ani.frameDelay = 40;

	ghosts = new Group();
	ghosts.layer = 1;
	ghosts.collider = 'none';
	ghosts.addAni('assets/ghost_standing0001.png', 7);
	ghosts.ani.frameDelay = 30;

	asterisk = new Sprite();
	asterisk.layer = 2;
	asterisk.addAni('assets/asterisk_normal0001.png', 3);
	asterisk.ani.frameDelay = 8;

	// assign new sprites to the respective groups
	for (let i = 0; i < 6; i++) {
		// Group sprites inherit the traits from their group
		// but these sprites are still unique and all their properties are
		// still editable.
		new ghosts.Sprite(random(0, 800), random(0, 400));

		new clouds.Sprite(random(0, 800), random(0, 400));
	}
}

function draw() {
	background(255);

	// a group can be accessed like an array
	// removed objects will be automatically removed from the groups

	// move all the ghosts y velocities with a sine wave
	for (let ghost of ghosts) {
		ghost.vel.y = sin(frameCount * 3);
	}

	// change's the sprite's velocities so it moves towards a point
	// at a specified tracking ratio
	asterisk.moveTowards(mouse, 0.1);
	// 1 represents 1:1 tracking, the mouse moves to the destination immediately, 0 represents no tracking

	allSprites.debug = mouse.pressing();
}
