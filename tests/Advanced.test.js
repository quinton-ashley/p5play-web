/**
 * @jest-environment jsdom
 */

const log = console.log;
global.p5 = require('../v3/q5.js');
global.planck = require('../v3/planck.min.js');
require('../v3/p5play.js');

test('Canvas : constructors', () => {
	const sketch = (p) => {
		p.setup = () => {
			expect(p).toHaveProperty('Canvas');

			new p.Canvas(50, 120);

			expect(p).toHaveProperty('canvas');
			expect(p.width).toBe(50);
			expect(p.height).toBe(120);
		};
	};
	new p5(sketch);
});
