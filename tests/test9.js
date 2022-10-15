function setup() {
	createCanvas(200, 128);

	sprite1 = new Sprite(90, 50);
	sprite2 = new Sprite(115, 75);

	sprite1.overlap(sprite2);
}

function draw() {
	clear();
}
