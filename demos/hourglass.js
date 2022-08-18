let hourglass;

function setup() {
	createCanvas(400, 400);
	world.gravity.y = 10;

	let centerX = width * 0.5;
	let centerY = height * 0.5;
	hourglass = new Sprite(centerX, centerY, [200, 60, 200, 60, 212, -120, 200, -120, 200, 60, 212, -120], 'kinematic');
	hourglass.angularDamping = 1000;

	for (let i = 0; i < 200; i++) {
		let x = centerX + ((i % 12) - 6) * 6;
		let y = centerY + (64 + (i / 12) * 6) * (i % 2 ? 1 : -1);

		new Sprite(x, y, 6).friction = 0.02;
	}
}
function draw() {
	// if (frameCount % 10 != 0) return;
	background(50);
}

function mousePressed() {
	hourglass.rotate(180, 2);
}
