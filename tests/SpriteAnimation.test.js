/**
 * @jest-environment jsdom
 */

const log = console.log;
global.p5 = require('p5');
global.planck = require('planck');
require('../v3/p5.play.js');

test('SpriteAnimation', () => {
	const sketch = (p) => {
		p.setup = () => {
			new p.Canvas(400, 400);
			p.noLoop();

			expect(p.SpriteAnimation).toBeInstanceOf(Function);
		};
	};
	new p5(sketch);
});
