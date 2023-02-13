/**
 * @jest-environment jsdom
 */

const log = console.log;
global.p5 = require('p5');
global.planck = require('planck');
require('../v3/p5play.js');

test('Canvas : constructors', () => {
	const sketch = (p) => {
		p.setup = () => {
			expect(p).toHaveProperty('Canvas');

			new p.Canvas(100, 100);
		};
	};
	new p5(sketch);
});
