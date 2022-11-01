let ground, ball;

function setup() {
	createCanvas(500, 200);
	world.gravity.y = 10;

	//                 (x, y, [distance0, distance1, ...])
	ground = new Sprite(
		30,
		90,
		[
			[20, 20],
			[60, -10],
			[50, 10]
		],
		'static'
	);

	ball = new Sprite(40, 0, 20);
}

function draw() {
	clear();
	rect(ground.x - 2, ground.y - 2, 4, 4);
}
