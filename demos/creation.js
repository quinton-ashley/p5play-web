// Welcome to the p5play Version 3 demos!

// Please look at the reference documentation on the learn section of
// the website first: https://p5play.org/learn/sprite.html

// In this first demo I'll explain the basics of p5.js and p5play.

// You can edit this file and press Play to restart the program with
// your changes. You don't have to wait for the code to compile or load.
// That's the beauty of JavaScript!

// p5.js runs this function one time when its ready to start your program
function setup() {
	new Canvas(800, 400);
}

// p5.js runs this function over and over in a loop,
// by default it is run 60 times per second. Each iteration
// creates an image (frame) which is displayed on the p5.js canvas.
function draw() {
	background(255); // try removing this line and see what happens!

	fill(0);
	textAlign(CENTER);
	text('Click to create a new sprite', width / 2, height / 2);

	// check if the left mouse button was pressed
	if (mouse.presses()) {
		// let the variable "s" store
		// a new sprite at the mouse's position,
		// with a width of 30 and height of 30
		let s = new Sprite(mouse.x, mouse.y, 30, 30);
		// you can also use the createSprite function to make new sprites
		// try editing the sprite's size!

		// by default sprites are displayed as simple shapes
		// that have a random fill color

		// sprites have many properties you can edit
		// here the x and y velocities of the sprite are edited
		s.vel.x = random(-5, 5);
		s.vel.y = random(-5, 5);
		// try editing the sprite's speed!

		// Sprites collide by default in p5play v3.
		// Try playing this example and see if you can keep one of the
		// squares from leaving the p5.js canvas!
	}

	// by default all sprites are drawn at the end
}
