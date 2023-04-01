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

			// Check the constructor with another property,,
			new p.Canvas(100, 240);

			expect(p).toHaveProperty('canvas');
			expect(p.width).toBe(100);
			expect(p.height).toBe(240);

			// Check with default property..
			new p.Canvas();
			const defaultCanvasWidth = 1024;
			const defaultCanvasHeight = 768;
			
			expect(p).toHaveProperty('canvas');
			expect(p.width).toBe(defaultCanvasWidth);
			expect(p.height).toBe(defaultCanvasHeight);
		};
	};
	new p5(sketch);
});
