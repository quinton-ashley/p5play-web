// flappy bird clone
// mouse click or spacebar to flap

let bird, ground, pipes, gameOver;
let birdImg, pipeImg, groundImg, bgImg;

function preload() {
	birdImg = loadImage('assets/flappy_bird.png');
	pipeImg = loadImage('assets/flappy_pipe.png');
	groundImg = loadImage('assets/flappy_ground.png');
	bgImg = loadImage('assets/flappy_bg.png');
}

function setup() {
	new Canvas(400, 600);
	world.autoStep = false;

	ground = new Sprite(groundImg, 0, 650, 'none');

	pipes = new Group();
	pipes.image = pipeImg;
	pipes.collider = 'static';

	bird = new Sprite(birdImg, 0, 300, 24);

	camera.x = 150;
	gameOver = true;
	canStartNewGame = true;
}

function draw() {
	if (mouse.presses() || kb.presses('space')) {
		if (canStartNewGame) newGame();
		bird.vel.y = -9; // FLAP WINGS!
	}

	if (!gameOver) {
		bird.rotation = bird.direction * 0.8;

		// prevent bird from going above the top of the screen (cheating!)
		if (bird.y < 0) bird.y = 0;

		if (bird.y > 530 || bird.overlaps(pipes)) die();

		// spawn pipes every 60 frames (1 second)
		if (frameCount % 60 == 0) {
			let pos = random(0, 250);

			let bottomPipe = new pipes.Sprite();
			bottomPipe.x = width + bird.x;
			bottomPipe.y = ground.y - pos;

			let topPipe = new pipes.Sprite();
			topPipe.x = bottomPipe.x;
			topPipe.y = ground.y - pos - 510 - random(0, 100);
			topPipe.mirror.y = -1;
		}

		// get rid of passed pipes
		for (let pipe of pipes) {
			if (pipe.x < bird.x - width / 2) {
				pipe.remove();
			}
		}

		// wrap ground
		if (camera.x > ground.x + width / 2) {
			ground.x += width;
		}
	}

	camera.off();

	background(247, 134, 131);
	image(bgImg, 0, ground.y - 280);

	camera.on();

	if (!gameOver) {
		camera.x = bird.x + 150;
		world.step();
	}
}

async function die() {
	gameOver = true;
	await delay(500); // 500 milliseconds
	canStartNewGame = true;
}

function newGame() {
	pipes.removeAll();
	gameOver = false;
	canStartNewGame = false;
	bird.x = 0;
	bird.y = height / 2;
	bird.vel.x = 4;
	bird.vel.y = 0;
	ground.x = -150;
	world.gravity.y = 24;
}
