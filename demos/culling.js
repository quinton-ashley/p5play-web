// Culling

// Culling prevents unnecessary collision calculations from being done
// on sprites outside the boundaries of your game.

let instructions = 'Click to make the dots move in a random direction';

let pinkDots, greenDots, walls;
let showPinkRect = 0;
let showGreenRect = 0;

function preload() {
	walls = new Group();
	walls.addAni('box', 'assets/box0001.png', 3);
	walls.ani.frameDelay = 16;
	walls.addAni('small_platform', 'assets/small_platform0001.png', 3);
	walls.ani.frameDelay = 16;
	walls.collider = 'static';

	dots = new Group();
	dots.shape = 'circle';
	dots.bounciness = 1;

	pinkDots = new dots.Group();
	pinkDots.addAni('assets/small_circle0001.png', 3);
	pinkDots.ani.frameDelay = 30;

	greenDots = new dots.Group();
	greenDots.addAni('assets/small_circle0004.png', 6);
	greenDots.ani.frameDelay = 30;
}

function setup() {
	new Canvas(800, 400);

	// top and bottom walls
	new walls.Sprite('small_platform', width / 2, 100);
	new walls.Sprite('small_platform', width / 2, height - 100);
	// left and right walls
	new walls.Sprite('box', 200, height / 2);
	new walls.Sprite('box', width - 200, height / 2);

	makeDots();
}

function makeDots() {
	// half width
	let hw = width / 2;

	// make 5 pink dots in a row
	for (let i = 0; i < 5; i++) {
		new pinkDots.Sprite(hw + 40 * i - 80, height * 0.45);
	}
	// make 5 green dots in a row
	for (let i = 0; i < 5; i++) {
		new greenDots.Sprite(hw + 40 * i - 80, height * 0.55);
	}
}

function draw() {
	background(255);

	stroke(0);
	strokeWeight(1);
	textAlign(CENTER);
	text(instructions, width / 2, height - 20);

	noFill();
	strokeWeight(5);

	if (showPinkRect > 0) {
		stroke('#f99dcd');
		rect(200, 100, 400, 200);
		showPinkRect--;
	}

	// cull pink dots when they are -100 pixels beyond the edge of the screen
	// (aka 100 pixels before the edge)
	// the callback function sets the showPinkRect value to 10 frames
	pinkDots.cull(-100, (dot) => {
		showPinkRect = 10;
		dot.remove();
	});

	if (showGreenRect > 0) {
		stroke('#1A784E');
		rect(0, 0, width, height);
		showGreenRect--;
	}

	// cull green dots when they are 0 pixels beyond the edge of the screen
	// the callback function sets the showPinkRect value to 10 frames
	greenDots.cull(0, (dot) => {
		showGreenRect = 10;
		dot.remove();
	});

	// For most games you should set the cull value higher so the entire
	// sprite exits the screen visually before it is removed.

	// The default cull value for all sprites is 10,000 pixels
	// from the edge of the screen. This runs at the end of every draw.
	// You can customize this buy calling allSprites.cull yourself.
	// example: allSprites.cull(250);

	// You can also set the cull distance from the top, bottom, left, and
	// right sides of the screen individually. The callback is optional.
	// group.cull(top, bottom, left, right, cb)

	// when all the dots are gone, make them again
	if (!pinkDots.length && !greenDots.length) {
		makeDots();
	}
}

function mousePressed() {
	for (let pinkDot of pinkDots) {
		pinkDot.direction = random(0, 360);
		pinkDot.speed = 2;
	}
	for (let greenDot of greenDots) {
		greenDot.direction = random(0, 360);
		greenDot.speed = 4;
	}
}
