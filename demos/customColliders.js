// Collision detection - custom colliders

// Move the mouse to test collision between sprites.
// The area responsive to collisions doesn't have to
// match the size of the images.

let shapeShifter, sun, bubbly, circle;

function preload() {
	shapeShifter = new Sprite(150, 200, 'static');
	// an animation with frames of different sizes
	shapeShifter.addAni(
		'assets/asterisk_normal0001.png',
		'assets/small_triangle.png',
		'assets/asterisk_circle0006.png',
		'assets/small_rectangle.png'
	);
	shapeShifter.ani.frameDelay = 8; // slow down

	sun = new Sprite(400, 200, 110, 'static');
	sun.addAni('assets/sun1.png', 3);

	bubbly = new Sprite(650, 180, 75, 75, 'static');
	bubbly.addAni('assets/bubbly0001.png', 4);
	bubbly.ani.offset.y = -26;

	circle = new Sprite(400, 350, 110);
	circle.addAni('assets/asterisk_circle0006.png', 8);
	circle.rotationDrag = 2;
}

function setup() {
	new Canvas(800, 400);
}

function draw() {
	background(255);

	shapeShifter.w = shapeShifter.ani.w;
	shapeShifter.h = shapeShifter.ani.h;

	// follow the mouse
	// moving sprites with the velocity instead of the position directly
	// improves the collision resolution
	circle.moveTowards(mouse);

	allSprites.debug = mouse.pressing();
}
