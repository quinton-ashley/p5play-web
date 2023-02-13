/**
 * @jest-environment jsdom
 */

const log = console.log;
global.p5 = require('p5');
global.planck = require('planck');
require('../v3/p5play.js');

test('SpriteAnimation', () => {
	const sketch = (p) => {
		p.setup = () => {
			new p.Canvas(400, 400);
			p.noLoop();

			expect(p.SpriteAnimation).toBeInstanceOf(Function);

			let imgs = [p.spriteArt('bww'), p.spriteArt('wbw'), p.spriteArt('wwb')];

			let ani0 = new p.SpriteAnimation(imgs);
			expect(ani0).toBeInstanceOf(p.SpriteAnimation);
			expect(ani0.length).toBe(3);
			expect(ani0.frame).toBe(0);
			ani0.frame = 1;
			expect(ani0.frame).toBe(1);
		};
	};
	new p5(sketch);
});
