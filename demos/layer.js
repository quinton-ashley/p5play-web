// Sprite drawing order
// new sprite are drawn on top of old ones
// click to sort the sprites depth according to their y coordinates

function preload() {
	loadAni('box', 'assets/box0001.png');
	loadAni('ghost', 'assets/ghost_standing0004.png');
	loadAni('cloud', 'assets/cloud_breathing0001.png');
	loadAni('square', 'assets/square.png');
}

function setup() {
	new Canvas(800, 400);
}

function draw() {
	background(255);

	if (allSprites.length < 100) {
		let aniNames = ['box', 'ghost', 'cloud', 'square'];
		// assign a random appearance
		let rnd = floor(random(0, 4));

		// create a sprite in a random position
		let sprite = new Sprite(aniNames[rnd], random(0, width), random(0, height), 'none');

		// you can link the scale to the y position to simulate perspective
		sprite.scale = map(sprite.y, 0, height, 0.2, 1);
	}
}

// unless the depths are directly set
function mousePressed() {
	// set the existing sprites' depths in relation to their position
	for (let sprite of allSprites) {
		// set the existing sprites' layer in relation to their position
		// sprites on the bottom will be drawn first
		sprite.layer = sprite.y;
	}
}
