function setup() {
	createCanvas(500, 500);

	dots = new Group();
	dots.shapeColor = 'yellow';

	for (let i = 0; i < 26; i++) {
		new dots.Sprite(i * 20, i * 20, 10);
	}
}

function draw() {
	clear();
}
