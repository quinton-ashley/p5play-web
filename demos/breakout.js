// BREAKOUT!
// move the mouse to control the paddle, click to start

let walls, paddle, ball, bricks, hasStarted;

function setup() {
	createCanvas(800, 600);

	allSprites.collider = 'static';
	allSprites.shapeColor = color(255);

	walls = new Group();
	walls.w = 30;
	walls.h = 800;

	let wallTop = new walls.Sprite(width / 2, 0);
	wallTop.rotation = 90;

	// left and right walls
	new walls.Sprite(0, height / 2);
	new walls.Sprite(width, height / 2);

	ball = new Sprite(width / 2, height - 200, 11, 'dynamic');
	ball.bounciness = 1;
	ball.friction = 0;

	paddle = new Sprite(width / 2, height - 50, 100, 20, 'dynamic');
	paddle.rotationLock = true;

	bricks = new Group();
	bricks.tile = '=';
	bricks.w = 40;
	bricks.h = 20;

	ball.collide(bricks, (ball, brick) => {
		brick.remove();
	});

	ball.collide(paddle, (ball, paddle) => {
		ball.direction += (ball.x - paddle.x) / 2;
		ball.speed = 8;
	});
}

function draw() {
	background(247, 134, 131);

	// TODO make this work!
	// if (hasStarted) {
	// 	// good games usually don't follow the laws of physics precisely
	// 	// here the ball direction is pushed more vertical
	// 	// if it becomes too horizontal
	// 	if ((ball.direction < 20 && ball.direction >= 0) || (ball.direction > -160 && ball.direction < -180)) {
	// 		ball.direction++;
	// 	}
	// 	if ((ball.direction < 0 && ball.direction > -20) || (ball.direction < 180 && ball.direction > 160)) {
	// 		ball.direction--;
	// 	}
	// }

	paddle.moveTowards(mouse.x, height - 50, 1);

	if (mouse.pressed()) {
		// start or restart the game
		bricks.remove();

		new Tiles(
			[
				'=====...======',
				'======..======',
				'==..==..==....',
				'==..==..==....',
				'======..=====.',
				'=====...======',
				'==..........==',
				'==..........==',
				'==......======',
				'==......=====.'
			],
			110,
			80,
			bricks.w + 4,
			bricks.h + 4
		);

		ball.x = width / 2;
		ball.y = height - 200;
		ball.direction = 90 + random(-10, 10);
		ball.speed = 8;

		hasStarted = true;
	}
}
