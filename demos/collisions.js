// Collision detection and resolution

// Move the mouse, the asterisk responds to overlaps with the gray circle
// it collides with the box and displaces the cloud

let box, asterisk, cloud, circle;

function preload() {
	circle = new Sprite(400, 200, 100, 'static');
	circle.addAni('assets/plain_circle.png');
	circle.overlaps(allSprites);

	box = new Sprite(200, 200, 75, 120, 'static');
	box.addAni('assets/box0001.png', 3);

	cloud = new Sprite(600, 200, 100);
	cloud.addAni('assets/cloud_breathing0001.png', 9);
	cloud.ani.frameDelay = 10;
	// higher drag increases the force required to displace a sprite
	cloud.drag = 100;
	// increasing rotationDrag or angularDrag increases the force
	// required to rotate a sprite
	cloud.rotationDrag = 100;

	asterisk = new Sprite(400, 200, 120);
	// if you don't give the animation a name, the name "default" will be used
	asterisk.addAni('assets/asterisk_normal0001.png', 3);
	asterisk.addAni('round', 'assets/asterisk_circle0006.png', 8);
	asterisk.rotationDrag = 2;
}

function setup() {
	new Canvas(800, 400);
}

function draw() {
	background(255);

	asterisk.moveTowards(mouse);

	if (asterisk.overlapping(circle)) {
		asterisk.ani = 'round';
	} else {
		asterisk.ani = 'default';
	}

	// if debug is set to true the sprite's physic's body, center,
	// and layer are visualized
	allSprites.debug = mouse.pressing();
}
