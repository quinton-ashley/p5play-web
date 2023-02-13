/**
 * @jest-environment jsdom
 */

const log = console.log;
global.p5 = require('p5');
global.planck = require('planck');
require('../v3/p5play.js');

test('Sprite : constructors', () => {
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
			expect(s.width).toBe(50);
			expect(s.w).toBe(50);
			expect(s.height).toBe(50);
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
			expect(s.diameter).toBe(40);
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

			s = new p.Turtle();
			expect(s.shape).toBe('polygon');
			expect(s.x).toBe(25);
			expect(s.y).toBe(25);
			s.remove();
		};
	};
	new p5(sketch);
});

test('Sprite : properties', () => {
	const sketch = (p) => {
		let s;

		p.setup = () => {
			new p.Canvas(400, 400);
			p.noLoop();

			s = new p.Sprite();
			s.x = 5;
			expect(s.x).toBe(5);
			s.y = 10;
			expect(s.y).toBe(10);

			s.w = 15;
			expect(s.w).toBe(15);
			expect(s.hw).toBe(7.5);
			expect(() => {
				s.hw = 10;
			}).toThrow();
			s.h = 20;
			expect(s.h).toBe(20);
			expect(s.hh).toBe(10);
			expect(() => {
				s.hh = 10;
			}).toThrow();

			expect(s.vel instanceof p5.Vector).toBe(true);
			expect(typeof s.vel.__lookupGetter__('x') == 'function').toBe(true);
			expect(typeof s.vel.__lookupGetter__('y') == 'function').toBe(true);

			s.rotation = 25;
			expect(s.rotation).toBeCloseTo(25);
			s.rotationSpeed = 30;
			expect(s.rotationSpeed).toBeCloseTo(30);
			s.rotationSpeed = 0;
			expect(s.rotationSpeed).toBe(0);

			s.color = 'red';
			expect(s.color).toBeInstanceOf(p5.Color);
			expect(s.color.levels).toEqual([255, 0, 0, 255]);
			s.color = p.color('#00ff00');
			expect(s.color).toBeInstanceOf(p5.Color);
			expect(s.color.levels).toEqual([0, 255, 0, 255]);

			s.textColor = 'red';
			expect(s.textColor).toBeInstanceOf(p5.Color);
			expect(s.textColor.levels).toEqual([255, 0, 0, 255]);
			s.textColor = p.color('#0000ff');
			expect(s.textColor).toBeInstanceOf(p5.Color);
			expect(s.textColor.levels).toEqual([0, 0, 255, 255]);

			s.textSize = 35;
			expect(s.textSize).toBe(35);
			s.text = 'hello';
			expect(s.text).toBe('hello');

			s.d = 20;
			expect(s.shape).toBe('circle');
			expect(s.d).toBe(20);
			expect(s.w).toBe(20);
			expect(s.h).toBe(20);

			s.collider = 'static';
			expect(s.collider).toBe('static');
			s.collider = 'dynamic';
			expect(s.collider).toBe('dynamic');
			s.collider = 'kinematic';
			expect(s.collider).toBe('kinematic');
			s.collider = 'none';
			expect(s.collider).toBe('none');
		};
	};
	new p5(sketch);
});

test('Sprite : physics', () => {
	return new Promise((resolve) => {
		const sketch = (p) => {
			let s0, s1;

			p.setup = () => {
				new p.Canvas(400, 400);

				s0 = new p.Sprite(10, 0);
				s1 = new p.Sprite(100, 10, 50, 'static');
			};

			p.draw = () => {
				if (p.frame == 1) {
					expect(s0.x).toBe(10);
					expect(s0.y).toBe(0);
					expect(s1.x).toBe(100);
					expect(s1.y).toBe(10);
					p.world.gravity.y = 10;
				}
				if (p.frame == 2) {
					// s0 is dynamic so with gravity it should fall
					expect(s0.x).toBe(10);
					expect(s0.y).toBeGreaterThan(0);
					expect(s0.vel.x).toBe(0);
					expect(s0.vel.y).toBeGreaterThan(0);
					// becasue s1 is static it should be in the same place
					expect(s1.x).toBe(100);
					expect(s1.y).toBe(10);
				}
				if (p.frame == 3) {
					s0.speed = 0;
					s0.x = 10;
					s0.y = 0;
					p.world.gravity.y = -5;
				}
				if (p.frame == 4) {
					// the x position shouldn't because gravity is only in the y
					expect(s0.x).toBe(10);
					expect(s0.y).toBeLessThan(0);
					// the x vel won't change but they y-vel will
					expect(s0.vel.x).toBe(0);
					expect(s0.vel.y).toBeLessThan(0);
				}
				if (p.frame == 5) {
					s0.remove();
					s1.remove();
					s0 = new p.Sprite(100, 86, 100, 2, 'kinematic');
					s0.vel.y = -5;
					s1 = new p.Sprite(100, 60, 50);
				}
				if (p.frame == 6) {
					// kinematic platform moved up and pushed s1
					expect(s0.y).toBeLessThan(86);
					expect(s1.y).toBeLessThan(60);
					// the speed of kinematic sprites is not effected by moving
					// other sprites
					expect(s0.vel.y).toBe(-5);
					expect(s1.vel.y).toBeLessThan(0);

					// end of test
					p.noLoop();
					resolve();
				}
			};
		};
		new p5(sketch);
	});
});

test('Sprite : move, moveTo, moveTowards', () => {
	const sketch = (p) => {
		let s;

		p.setup = async () => {
			new p.Canvas(400, 400);

			s = new p.Sprite();

			await expect(s.move(100, 180, 10)).resolves.toBe(true);
			expect(s.x).toBe(200);
			expect(s.y).toBe(100);

			await expect(s.move(100, 'up', 10)).resolves.toBe(true);
			expect(s.x).toBe(100);
			expect(s.y).toBe(100);

			await expect(s.move(10)).resolves.toBe(true);
			expect(s.x).toBe(100);
			expect(s.y).toBe(110);

			s.direction = 'left';
			await expect(s.move(10)).resolves.toBe(true);
			expect(s.x).toBe(90);
			expect(s.y).toBe(110);

			await expect(s.moveTo(10, 20)).resolves.toBe(true);
			expect(s.x).toBe(10);
			expect(s.y).toBe(20);

			// test interrupted movement
			expect(s.moveTo(50, 20)).resolves.toBe(false);
			await expect(s.moveTo(30, 20)).resolves.toBe(true);

			s.moveTowards(0, 0);
			expect(s.x).toBeLessThan(30);

			s.remove();
		};

		p.draw = () => {};
	};
	new p5(sketch);
});

test('Sprite : rotate, rotateTo, rotateTowards', () => {
	const sketch = (p) => {
		let s;

		p.setup = async () => {
			new p.Canvas(400, 400);

			s = new p.Sprite();

			await expect(s.rotate(180, 10)).resolves.toBe(true);
			expect(s.rotation).toBe(180);
			expect(frame).toBe(18);

			await expect(s.rotateTo(200, 0)).resolves.toBe(true);
			expect(s.rotation).toBe(90);

			s.rotateTowards(0, 0);
			expect(s.rotation).toBeGreaterThan(90);

			s.remove();
		};

		p.draw = () => {};
	};
	new p5(sketch);
});

test('Sprite : chain and polygon constructors', () => {
	const sketch = (p) => {
		let s;

		p.setup = () => {
			new p.Canvas(400, 400);
			p.noLoop();

			s = new p.Sprite([
				[0, 10],
				[20, 30]
			]);
			expect(s.shape).toBe('chain');
			expect(s.x).toBe(0);
			expect(s.y).toBe(10);
			expect(s.w).toBe(20);
			expect(s.h).toBe(20);
			expect(s.vertices.length).toBe(2);
			expect(s.vertices[0].x).toBe(0);
			expect(s.vertices[0].y).toBe(10);
			s.collider = 'static';
			expect(s.shape).toBe('chain');
			expect(s.x).toBe(0);
			expect(s.y).toBe(10);
			expect(s.w).toBe(20);
			expect(s.h).toBe(20);
			s.remove();

			s = new p.Sprite(1, 1, [
				[100, 40],
				[-100, 40],
				[0, -80]
			]);
			expect(s.shape).toBe('polygon');
			expect(s._originMode).toBe('center');
			expect(s.x).toBe(1);
			expect(s.y).toBe(1);
			expect(s.w).toBe(100);

			expect(() => new p.Sprite([40, 50], [60, 70])).toThrow();
		};
	};
	new p5(sketch);
});
