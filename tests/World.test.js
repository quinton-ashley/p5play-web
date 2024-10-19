/**
 * @jest-environment jsdom
 */

const log = console.log;
require('../v3/q5.js');
Q5.disableFriendlyErrors = true;
global.planck = require('../v3/planck.min.js');
require('../v3/p5play.js');

test('World : properties', () => {
	const sketch = (p) => {
		p.setup = () => {
			new p.Canvas(400, 400);
			p.noLoop();

			expect(p).toHaveProperty('world');
			expect(p.world).toBeInstanceOf(p.World);

			expect(p.world.mouseSprite).toBeNull();
			expect(p.world.mouseSprites).toEqual([]);
			expect(p.world.autoStep).toEqual(true);

			// check default values
			expect(p.world.gravity.x).toBe(0);
			expect(p.world.gravity.y).toBe(0);
			expect(p.world.origin.x).toBe(0);
			expect(p.world.origin.y).toBe(0);
			expect(p.world.velocityThreshold).toBe(0.19);
			expect(p.world.contacts).toEqual([]);
			expect(p.world.mouseTracking).toEqual(true);
			expect(p.world.autoStep).toBe(true);

			p.world.gravity.x = 1;
			p.world.gravity.y = 2;
			expect(p.world.gravity.x).toEqual(1);
			expect(p.world.gravity.y).toEqual(2);

			p.world.origin.x = 10;
			p.world.origin.y = 20;
			expect(p.world.origin.x).toEqual(10);
			expect(p.world.origin.y).toEqual(20);

			p.world.velocityThreshold = 0.5;
			expect(p.world.velocityThreshold).toEqual(0.5);
		};
	};
	new p5(sketch);
});
