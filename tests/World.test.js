/**
 * @jest-environment jsdom
 */

const log = console.log;
global.p5 = require('p5');
global.planck = require('planck');
require('../v3/p5play.js');

test('World', () => {
	const sketch = (p) => {
		p.setup = () => {
			new p.Canvas(400, 400);
			p.noLoop();

			expect(p).toHaveProperty('world');
			expect(p.world).toBeInstanceOf(planck.World);
			expect(p.world.gravity.x).toBe(0);
			expect(p.world.gravity.y).toBe(0);
		};
	};
	new p5(sketch);
});
