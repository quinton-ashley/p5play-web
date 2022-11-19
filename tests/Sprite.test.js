/**
 * @jest-environment jsdom
 */

global.p5 = require('p5');
global.planck = require('planck');
require('../v3/p5.play.js');

test('Sprite : constructor', () => {
	const sketch = (p) => {
		let s;

		p.setup = () => {
			new p.Canvas(400, 400);
			p.noLoop();

			s = new p.Sprite();
			expect(s).toBeInstanceOf(p.Sprite);
			expect(s.shape).toBe('box');
			expect(s.x).toBe(200);
			expect(s.y).toBe(200);
			expect(s.w).toBe(50);
			expect(s.h).toBe(50);
			s.remove();
			expect(s.removed).toBe(true);

			expect(() => new p.Sprite(10)).toThrow();

			s = new p.Sprite(0, 0);
			expect(s.shape).toBe('box');
			expect(s.x).toBe(0);
			expect(s.y).toBe(0);
			expect(s.w).toBe(50);
			expect(s.h).toBe(50);
			s.remove();

			s = new p.Sprite(0, 0, 40);
			expect(s.shape).toBe('circle');
			expect(s.x).toBe(0);
			expect(s.y).toBe(0);
			expect(s.d).toBe(40);
			expect(s.w).toBe(40);
			expect(s.h).toBe(40);
			s.remove();

			s = new p.Sprite(0, 0, 40, 60);
			expect(s.shape).toBe('box');
			expect(s.x).toBe(0);
			expect(s.y).toBe(0);
			expect(s.w).toBe(40);
			expect(s.h).toBe(60);
			s.remove();
		};
	};
	new p5(sketch);
});

test('Sprite : move, moveTo, moveAway, moveTowards', () => {
	const sketch = (p) => {
		let s;

		p.setup = async () => {
			new p.Canvas(400, 400);

			s = new p.Sprite();

			await expect(s.move(180, 10, 100)).resolves.toBe(undefined);
			expect(s.x).toBe(200);
			expect(s.y).toBe(100);

			await expect(s.move('up', 10, 100)).resolves.toBe(undefined);
			expect(s.x).toBe(100);
			expect(s.y).toBe(100);

			await expect(s.moveTo(10, 20)).resolves.toBe(undefined);
			expect(s.x).toBe(10);
			expect(s.y).toBe(20);
		};

		p.draw = () => {};
	};
	new p5(sketch);
});
