// creating animations from sprite sheets

let explodeAni;

function preload() {
	// Load an animation from a SpriteSheet, an image which contains
	// all the frames of an animation or multiple animations.
	// loadAnimation(spriteSheet, atlas);
	explodeAni = loadAnimation('assets/explode_sprite_sheet.png', { size: [171, 158], frames: 11 });
	// Since the size of the animated character is the same for every frame
	// of animation, an atlas object can be used to specify the size and how
	// many frames of animation there are.
}

function setup() {
	createCanvas(800, 200);
}

function draw() {
	background(255);

	// animate the sprite sheet
	animation(explodeAni, 100, 100);

	// show full sheet for example reference
	image(explodeAni.spriteSheet, 250, 20, 500, 154);
}
