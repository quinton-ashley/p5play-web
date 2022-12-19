// Dynamically drawn sprites
// sprite with a custom drawing function follows the mouse
// and changes shape according to its speed

let stretchy;
let face;

function preload() {
	face = loadImage('assets/face.png');

	stretchy = new Sprite(400, 200, 10, 10);

	// Sometimes you won't be able to use pre-drawn animations to get
	// the kind of visual effect you want for a sprite in motion.

	// You can customize the sprite's draw() function
	// and make it display anything you want!

	stretchy.draw = () => {
		// inside the sprite's draw function the center of the sprite
		// is translated to be at position (0, 0)
		fill(237, 205, 0);

		// rotate the ellipse to the direction the sprite is moving
		// make the ellipse stretch in the sprite direction
		// proportionally to its speed
		push();
		rotate(stretchy.direction);
		ellipse(0, 0, 100 + stretchy.speed, 100 - stretchy.speed);
		pop();

		image(face, stretchy.vel.x * 2, stretchy.vel.y * 2);
	};
}

function setup() {
	new Canvas(800, 400);
	noStroke();
}

function draw() {
	background(255);

	// mouse trailer, the speed is inversely proportional to the mouse distance
	stretchy.moveTowards(mouse, 0.07);
}
