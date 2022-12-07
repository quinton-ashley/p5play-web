function setup() {
	new Canvas(800, 200);

	// 12 is the maximum number of sides a polygon
	// can have in planck.js
	let sides = 5;

	// draws a star
	let x = width * 0.5;
	let y = height * 0.5;
	let len = (width / sides) * (1 / sides);
	let angle = 360 / sides;

	// shows the steps for drawing stars
	for (let i = 1; i <= sides; i++) {
		x = width * (((i - 0.5) * 1) / sides);
		new Sprite(x, y, [len, angle * 2, len, -angle, i]);

		// create a dot to mark the center of the sprite
		if (i != sides) {
			new Sprite(x, y, 1, 1, 'static');
		}
	}
}

function draw() {
	clear();
}
