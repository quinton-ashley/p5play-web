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
