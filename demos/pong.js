// Pong
// use w/s to move the left paddle and i/k to move the right paddle

let paddleL, paddleR, ball, wallTop, wallBottom;

let serveSpeed = 10;

function setup() {
	new Canvas(800, 400);

	allSprites.collider = 'static';
	allSprites.color = color(255);

	paddleL = new Sprite(30, height / 2, 10, 100);
	paddleR = new Sprite(width - 28, height / 2, 10, 100);

	wallTop = new Sprite(width / 2, 0, width, 30);
	wallBottom = new Sprite(width / 2, height, width, 30);

	ball = new Sprite(width / 2, height / 2, 10, 10, 'dynamic');

	ball.collide(paddleL, () => {
		ball.direction -= (ball.y - paddleL.y) * 0.5;
		ball.speed = serveSpeed;
	});

	ball.collide(paddleR, () => {
		ball.direction += (ball.y - paddleR.y) * 0.5;
		ball.speed = serveSpeed;
	});

	ball.bounciness = 1;
	ball.rotationLock = true;
	ball.speed = serveSpeed;
	ball.friction = 0;

	let pallette = { w: color(255), ' ': color(0, 0, 0, 0) };
	net = spriteArt('w \n w\n'.repeat(height / 2), 2, pallette);
}

function draw() {
	background(0);
	image(net, width / 2 - 1, 0);

	if (kb.pressing('up') && paddleL.y > wallTop.y) {
		paddleL.y -= 12;
	} else if (kb.pressing('down') && paddleL.y < wallBottom.y) {
		paddleL.y += 12;
	}

	if (kb.pressing('up2') && paddleR.y > wallTop.y) {
		paddleR.y -= 12;
	} else if (kb.pressing('down2') && paddleR.y < wallBottom.y) {
		paddleR.y += 12;
	}

	// if the ball goes off the screen, reset it
	// try adding score counters!
	if (ball.x < -400) {
		ball.direction = 0;
	} else if (ball.x > width + 400) {
		ball.direction = 180;
	}
	if (ball.x < -400 || ball.x > width + 400) {
		ball.x = width / 2;
		ball.y = height / 2;
		ball.speed = serveSpeed;
	}
}
