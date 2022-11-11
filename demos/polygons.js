let sides;

function setup() {
	new Canvas(800, 400);

	sides = 3;
	makePoly();
}

function draw() {
	clear();
	text('Click to see how other polygons are drawn', 20, 20);

	if (mouse.presses()) {
		allSprites.remove();

		// 12 is the maximum number of sides a polygon
		// can have in planck.js
		sides++;
		makePoly();
	}
}

function makePoly() {
	let x = width * 0.5;
	let y = height * 0.25;
	// formula calculates how long the side length should be
	// so the radius of the polygon is width/sides
	let len = width * 5 * sin(PI / sides);
	let angle = 360 / sides;
	//          [length, angle, repeat]
	new Sprite(x, y, [len, angle, sides]);

	// shows the steps for drawing the polygon
	y = height * 0.75;
	for (let i = 1; i <= sides; i++) {
		x = (width * (i - 0.5)) / sides;
		new Sprite(x, y, [len, angle, i]);

		// create a dot to mark the center of the sprite
		if (i != 1 && i != sides) {
			new Sprite(x, y, 1, 1, 'static');
		}
	}
}
