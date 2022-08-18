let ball, platform;
let gridSize = 32;

function setup() {
	createCanvas(800, 400);
	// error can be fixed by setting gravity to 10
	world.gravity.y = 9.8;

	ball = new Sprite(400, 200, 8);
	ball.bounciness = 1;

	platform = new Sprite(400, 368, 96, 32, 'static');
}

function draw() {
	background(0);

	fill(100);
	for (let i = 0; i < width / gridSize; i++) {
		for (let j = 0; j < height / gridSize; j++) {
			rect(i * gridSize, j * gridSize, gridSize, gridSize);
		}
	}
}
