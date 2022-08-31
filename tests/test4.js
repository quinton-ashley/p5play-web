'use strict';

// Wrap the p5js application in a wrapper.
const minimalExample = (p) => {
	p.preload = () => {};

	p.setup = () => {
		// Create a sprite outside the left border of the screen and
		// let it move to the right.
		let sprite = new p.Sprite(-200, p.windowHeight - 270, 200, 300);
		sprite.speed = 4;
		sprite.direction = 0;

		// Create a another sprite a bit further outside the left border of
		// the screen and let it move a bit faster to the right.
		let sprite2 = new p.Sprite(-600, p.windowHeight - 270, 200, 300);
		sprite2.speed = 6;
		sprite2.direction = 0;

		sprite2.overlap(sprite);

		p.createCanvas(p.windowWidth, p.windowHeight);
		p.setFrameRate(24);
	};

	p.draw = () => {
		p.allSprites.forEach((sprite) => {
			if (sprite.mouse.hoveredOn()) {
				p.setFrameRate(5);
			}
			if (sprite.mouse.hoveredOut()) {
				p.setFrameRate(24);
			}
		});

		p.background(255, 255, 250);

		p.allSprites.debug = p.mouse.pressing();
	};
};

// Instatiate the p5js application.
let myp5 = new p5(minimalExample, 'minimalExample');
