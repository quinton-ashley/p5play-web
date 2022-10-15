'use strict';

// Wrap the p5js application in a wrapper.
const minimalExample = (p) => {
	p.preload = () => {};

	p.setup = () => {
		let mySprites = new p.Group();

		// FIXME: Placing this here works as intended.
		mySprites.overlap(mySprites);

		// Create a sprite outside the left border of the screen and
		// let it move to the right.
		let sprite = new p.Sprite(-200, p.windowHeight - 270, 200, 300);
		sprite.speed = 4;
		sprite.direction = 0;

		// // FIXME: Placing this here leads to the mouse hover not being detected
		// // on this sprite.
		// sprite.overlap( mySprites )

		// // FIXME: Placing this here works as intended.
		// mySprites.overlap( sprite )

		mySprites.add(sprite);

		// // FIXME: Placing this here leads to the mouse hover not being detected
		// // on this sprite.
		// sprite.overlap( mySprites )

		// // FIXME: Placing this here leads to the mouse hover not being detected
		// // on this sprite.
		// mySprites.overlap( sprite )

		// Create a another sprite a bit further outside the left border of
		// the screen and let it move a bit faster to the right.
		let sprite2 = new p.Sprite(-600, p.windowHeight - 270, 200, 300);
		sprite2.speed = 6;
		sprite2.direction = 0;

		// // FIXME: Placing this here leads to the mouse hover not being detected
		// // on this sprite2.
		// sprite2.overlap( mySprites )

		mySprites.add(sprite2);

		// // FIXME: Placing this here leads to the mouse hover not being detected
		// // on both sprites.
		// mySprites.overlap( mySprites )

		// sprite.overlap( sprite2 )

		p.createCanvas(p.windowWidth, p.windowHeight);
		p.setFrameRate(24);
	};

	p.draw = () => {
		p.allSprites.forEach((sprite) => {
			if (sprite.mouse.hovers()) {
				p.setFrameRate(5);
			}
			if (sprite.mouse.hovered()) {
				p.setFrameRate(24);
			}
		});

		p.background(255, 255, 250);

		p.allSprites.debug = p.mouse.pressing();
	};
};

// Instatiate the p5js application.
let myp5 = new p5(minimalExample, 'minimalExample');
