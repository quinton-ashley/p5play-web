/**
 * @jest-environment jsdom
 */

const log = console.log;
global.p5 = require('../v3/q5.js');
global.planck = require('../v3/planck.min.js');
require('../v3/p5play.js');

test('World : properties', () => {
	const sketch = (p) => {
		p.setup = () => {
			new p.Canvas(400, 400);
			p.noLoop();

			expect(p).toHaveProperty('world');
			expect(p.world).toBeInstanceOf(p.World);

			expect(p.world.hw).toBe(200);
			expect(p.world.hh).toBe(200);
			expect(p.world.mouseSprite).toBeNull();
			expect(p.world.mouseSprites).toEqual([]);
			expect(p.world.autoStep).toEqual(true);

			// check default values
			expect(p.world.gravity.x).toBe(0);
			expect(p.world.gravity.y).toBe(0);
			expect(p.world.offset.x).toBe(0);
			expect(p.world.offset.y).toBe(0);
			expect(p.world.velocityThreshold).toBe(0.19);
			expect(p.world.contacts).toEqual([]);
			expect(p.world.mouseTracking).toEqual(true);
			expect(p.world.autoStep).toBe(true);

			p.world.gravity.x = 1;
			p.world.gravity.y = 2;
			expect(p.world.gravity.x).toEqual(1);
			expect(p.world.gravity.y).toEqual(2);

			p.world.offset.x = 10;
			p.world.offset.y = 20;
			expect(p.world.offset.x).toEqual(-10);
			expect(p.world.offset.y).toEqual(-20);

			p.world.velocityThreshold = 0.5;
			expect(p.world.velocityThreshold).toEqual(0.5);
		};
	};
	new p5(sketch);
});

test('World : resize method', () => {
	const sketch = (p) => {
		p.setup = () => {
			new p.Canvas(400, 400);
			p.noLoop();

			// Check that the world's origin has been set correctly
			expect(p.world.origin).toEqual({ x: 200, y: 200 });
			// Check that the world's half-width and half-height have been set correctly
			expect(p.world.hw).toEqual(200);
			expect(p.world.hh).toEqual(200);

			// Make it resize with specific width and height..
			p.world.resize(500, 300);

			// Check that the world's origin has been set correctly
			expect(p.world.origin).toEqual({ x: 250, y: 150 });
			// Check that the world's half-width and half-height have been set correctly
			expect(p.world.hw).toEqual(250);
			expect(p.world.hh).toEqual(150);

			// Adjust the origin if tile size is not 1..
			p.allSprites.tileSize = 2;

			// Call the resize method with specific width and height values
			p.world.resize(500, 300);

			// Check that the world's origin has been set correctly, with the tile size taken into account
			expect(p.world.origin).toEqual({ x: 249, y: 149 });

			// Check that the world's half-width and half-height have been set correctly
			expect(p.world.hw).toEqual(250);
			expect(p.world.hh).toEqual(150);

			// Reset the tile size to 1 for subsequent tests
			p.allSprites.tileSize = 1;
		};
	};
	new p5(sketch);
});
