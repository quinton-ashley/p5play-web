//Setting a sprite lifespan and visibility
//click on the canvas to create self destructing sprite and toggle visibility

let cloud;
let instructions = 'Click anywhere to create a disappearing sprite';
instructions += ' '.repeat(10);
instructions += 'Click and hold to make the cloud invisible';

function setup() {
	createCanvas(800, 400);

	cloud = createSprite(400, 200);
	cloud.addAnimation('normal', 'assets/cloud_breathing0001.png', 'assets/cloud_breathing0009.png');
	cloud.velocity.x = 3;
}

function draw() {
	background(255, 255, 255);

	//sprites' visibility can be turned on an off
	//and invisible sprite is still updating normally
	if (mouseIsPressed) {
		cloud.visible = false;
	} else {
		cloud.visible = true;
	}

	if (cloud.position.x > width) cloud.position.x = 0;

	//draw the sprites
	drawSprites();

	textAlign(CENTER);
	text(instructions, width / 2, height - 20);
}

//every mouse press
function mousePressed() {
	//create a sprite
	let splat = createSprite(mouseX, mouseY);
	splat.addAnimation('normal', 'assets/asterisk_explode0001.png', 'assets/asterisk_explode0011.png');

	//set a self destruction timer (life)
	splat.life = 40;
}
