let icon;

function preload() {
	icon = loadImage('assets/quintos_logo.png');
}

function setup() {
	new Canvas(800, 400);
	world.gravity.y = 10;

	// angled platforms to drop sprites onto
	// Sprite(x, y, [length, angle], colliderType)
	new Sprite(width * 0.1, height * 0.5, [width, 40], 'static');
	new Sprite(width * 0.9, height * 0.5, [width, -40], 'static');
}

function draw() {
	background(255);

	// draw all sprites before the info text
	allSprites.draw();

	// info textbox
	rect(15, 5, 120, 65);
	text('Click to drop sprites', 20, 20);
	text('sprites: ' + allSprites.length, 20, 40);
	text('fps: ' + round(getFrameRate()), 20, 60);
}

function mousePressed() {
	for (let i = 1; i < 10; i++) {
		let x = width * i * 0.1;
		let sprite;
		let chance = random(); // returns a random decimal number, 0 to 1
		if (chance < 0.3) {
			// sprite with image
			// Sprite(image, x, y)
			sprite = new Sprite(icon, x, 14);
		} else if (chance < 0.6) {
			// circle sprite
			// Sprite(x, y, radius)
			sprite = new Sprite(x, 20, 20);
		} else {
			// rectangular sprite
			// Sprite(x, y, width, height)
			sprite = new Sprite(x, 20, 20, 10);
		}
	}
}
