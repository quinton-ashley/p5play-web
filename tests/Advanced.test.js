/**
 * @jest-environment jsdom
 */

const log = console.log;
global.p5 = require('p5');
global.planck = require('planck');
require('../v3/p5.play.js');

test('Sprite : constructors', () => {
	const sketch = (p) => {
		p.setup = () => {
			expect(p).toHaveProperty('Canvas');
		};
	};
	new p5(sketch);
});
