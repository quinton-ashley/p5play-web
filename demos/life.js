// Setting a sprite's lifespan and visibility

let instructions = 'Click anywhere to create a disappearing sprite';
instructions += ' '.repeat(10);
instructions += 'Click and hold to make the cloud invisible';

let cloud, splatAni;

function preload() {
	cloud = new Sprite(400, 200, 120);
	cloud.addAni('assets/cloud_breathing0001.png', 9);

	cloud.speed = 3;

	splatAni = loadAni('assets/asterisk_explode0001.png', 11);
}

function setup() {
	createCanvas(800, 400);
}

function draw() {
	background(255);

	// sprites' visibility can be turned on an off
	// and invisible sprite is still updating normally
	if (mouseIsPressed) cloud.visible = false;
	else cloud.visible = true;

	// teleport the cloud to the left side of the screen
	if (cloud.x > width) cloud.x = 0;

	textAlign(CENTER);
	text(instructions, width * 0.5, height - 20);
}

// every mouse press
function mousePressed() {
	let splat = new Sprite(splatAni, mouse.x, mouse.y);
	// set a self destruction timer (life)
	splat.life = 40;
}
