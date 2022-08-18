//breakout close (core mechanics)
//mouse to control the paddle, click to start

let paddle, ball, wallTop, wallBottom, wallLeft, wallRight;
let bricks;
let MAX_SPEED = 9;
let WALL_THICKNESS = 30;
let BRICK_W = 40;
let BRICK_H = 20;
let BRICK_MARGIN = 4;
let ROWS = 9;
let COLUMNS = 16;

function setup() {
	createCanvas(800, 600);

	paddle = createSprite(width / 2, height - 50, 100, 10);
	paddle.immovable = true;

	wallTop = createSprite(width / 2, -WALL_THICKNESS / 2, width + WALL_THICKNESS * 2, WALL_THICKNESS);
	wallTop.immovable = true;

	wallBottom = createSprite(width / 2, height + WALL_THICKNESS / 2, width + WALL_THICKNESS * 2, WALL_THICKNESS);
	wallBottom.immovable = true;

	wallLeft = createSprite(-WALL_THICKNESS / 2, height / 2, WALL_THICKNESS, height);
	wallLeft.immovable = true;

	wallRight = createSprite(width + WALL_THICKNESS / 2, height / 2, WALL_THICKNESS, height);
	wallRight.immovable = true;

	bricks = new Group();

	let offsetX = width / 2 - ((COLUMNS - 1) * (BRICK_MARGIN + BRICK_W)) / 2;
	let offsetY = 80;

	for (let r = 0; r < ROWS; r++) {
		for (let c = 0; c < COLUMNS; c++) {
			let brick = createSprite(
				offsetX + c * (BRICK_W + BRICK_MARGIN),
				offsetY + r * (BRICK_H + BRICK_MARGIN),
				BRICK_W,
				BRICK_H
			);
			brick.shapeColor = color(255, 255, 255);
			bricks.add(brick);
			brick.immovable = true;
		}
	}

	//the easiest way to avoid pesky multiple collision is to
	//have the ball bigger than the bricks
	ball = createSprite(width / 2, height - 200, 11, 11);
	ball.maxSpeed = MAX_SPEED;
	paddle.shapeColor = ball.shapeColor = color(255, 255, 255);
}

function draw() {
	background(247, 134, 131);

	paddle.position.x = constrain(mouseX, paddle.width / 2, width - paddle.width / 2);

	ball.bounce(wallTop);
	ball.bounce(wallBottom);
	ball.bounce(wallLeft);
	ball.bounce(wallRight);

	if (ball.bounce(paddle)) {
		let swing = (ball.position.x - paddle.position.x) / 3;
		ball.setSpeed(MAX_SPEED, ball.getDirection() + swing);
	}

	ball.bounce(bricks, brickHit);

	drawSprites();
}

function mousePressed() {
	if (ball.velocity.x == 0 && ball.velocity.y == 0) {
		ball.setSpeed(MAX_SPEED, random(90 - 10, 90 + 10));
	}
}

function brickHit(ball, brick) {
	brick.remove();
}
