function setup() {
	createCanvas(800, 200);

	// create a hexagon sprite
	let x = width * 0.5;
	let y = height * 0.5;
	//            [length, angle, repeat]
	new Sprite(x, y, [80, 360 / 6, 6]);
}

function draw() {
	background(100);
}
