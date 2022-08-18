// Create animations from multiple images

// SpriteAnimations should be stored in file level variables
// in order to be displayed during the draw cycle.
let ghostAni, shapeShifterAni;

// Images and animations should be loaded in the preload function
function preload() {
	// create an animation from a list of images
	// each image will be uses as one frame in the animation
	shapeShifterAni = loadAnimation(
		'assets/asterisk.png',
		'assets/triangle.png',
		'assets/square.png',
		'assets/cloud.png',
		'assets/star.png',
		'assets/mess.png',
		'assets/monster.png'
	);

	// When the animation is played a frame delay of 10 will change
	// the animation frame after 10 draw loops. The default is 4.
	shapeShifterAni.frameDelay = 10;

	// Create an animation from a sequence of numbered images using the
	// path to the first image and the index of the last image.
	ghostAni = loadAnimation('assets/ghost_standing0001.png', 7);
}

function setup() {
	createCanvas(800, 300);
}

function draw() {
	background(255);

	// The animation function is similar to the p5.js image function.
	// Specify the SpriteAnimation instance and the x, y position
	// you want to display the animation at.
	animation(ghostAni, 300, 150);
	animation(shapeShifterAni, 500, 150);
}
