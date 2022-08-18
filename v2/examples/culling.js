let instructions = 'Click to make the dots move in a random direction';

let pinkDots, greenDots, walls;
let showPinkRect = 0;
let showGreenRect = 0;

function setup() {
	createCanvas(800, 400);

	walls = new Group();
	makeWalls();

	pinkDots = new Group();
	greenDots = new Group();
	makeDots();
}

function draw() {
	background(255, 255, 255);

	textAlign(CENTER);
	text(instructions, width / 2, height - 20);

	greenDots.bounce(walls);
	pinkDots.bounce(walls);

	pinkDots.bounce(pinkDots);
	greenDots.bounce(greenDots);

	pinkDots.bounce(greenDots);

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
	pinkDots.cull(-100, () => {
		showPinkRect = 10;
	});

	if (showGreenRect > 0) {
		stroke('#1A784E');
		rect(0, 0, width, height);
		showGreenRect--;
	}

	// cull green dots when they are 0 pixels beyond the edge of the screen
	// the callback function sets the showPinkRect value to 10 frames
	greenDots.cull(0, () => {
		showGreenRect = 10;
	});

	// For most games you should set the cull value higher so the entire
	// sprite exits the screen visually before it is removed.
	// Culling prevents unnecessary collision calculations from being done
	// on sprites outside the boundaries of your game.

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

	drawSprites();
}

function mousePressed() {
	for (let pinkDot of pinkDots) {
		pinkDot.setSpeed(2, random(0, 360));
	}
	for (let greenDot of greenDots) {
		greenDot.setSpeed(4, random(0, 360));
	}
}

function makeWalls() {
	// top and bottom walls
	walls.add(createSprite(width / 2, 100));
	walls.add(createSprite(width / 2, height - 100));
	// left and right walls
	walls.add(createSprite(200, height / 2));
	walls.add(createSprite(width - 200, height / 2));

	for (let i = 0; i < 4; i++) {
		let wall = walls[i];
		let type = 'box';
		// top and bottom walls
		if (i == 0 || i == 1) type = 'small_platform';
		wall.addAnimation('default', 'assets/' + type + '0001.png', 'assets/' + type + '0003.png');
		// wall can not be moved by other sprites during collision events
		wall.immovable = true;
	}
}

function makeDots() {
	// half width
	let hw = width / 2;

	// make 5 pink dots in a row
	for (let i = 0; i < 5; i++) {
		let pinkDot = createSprite(hw + 40 * i - 80, height * 0.45);
		pinkDot.addAnimation('default', 'assets/small_circle0001.png', 'assets/small_circle0003.png');
		pinkDot.animation.frameDelay = 16;
		pinkDots.add(pinkDot);
	}
	// make 5 green dots in a row
	for (let i = 0; i < 5; i++) {
		let greenDot = createSprite(hw + 40 * i - 80, height * 0.55);
		greenDot.addAnimation('default', 'assets/small_circle0004.png', 'assets/small_circle0006.png');
		greenDot.animation.frameDelay = 16;
		greenDots.add(greenDot);
	}
}
