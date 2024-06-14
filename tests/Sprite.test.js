/**
 * @jest-environment jsdom
 */

const log = console.log;
require('../v3/q5.js');
global.planck = require('../v3/planck.min.js');
require('../v3/p5play.js');

test('Sprite : constructors', () => {
	// p is a p5.js instance
	// it gets its own instance of p5play
	// and its own planck physics world
	const sketch = (p) => {
		let s;

		p.setup = () => {
			new p.Canvas(400, 400);
			p.noLoop();

			// test default constructor
			s = new p.Sprite();
			expect(s).toBeInstanceOf(p.Sprite);
			expect(s.shape).toBe('box');
			expect(s.pos).toBeInstanceOf(p5.Vector);
			expect(s.x).toBe(200);
			expect(s.y).toBe(200);
			expect(s.width).toBe(50);
			expect(s.w).toBe(50);
			expect(s.height).toBe(50);
			expect(s.h).toBe(50);
			s.remove();
			expect(s.removed).toBe(true);

			expect(() => new p.Sprite(10)).toThrow();

			// test constructor with position (x, y)
			s = new p.Sprite(0, 0);
			expect(s.shape).toBe('box');
			expect(s.x).toBe(0);
			expect(s.y).toBe(0);
			expect(s.w).toBe(50);
			expect(s.h).toBe(50);
			s.remove();

			// test constructor with position (x, y) and diameter	(d)
			s = new p.Sprite(0, 0, 40);
			expect(s.shape).toBe('circle');
			expect(s.x).toBe(0);
			expect(s.y).toBe(0);
			expect(s.diameter).toBe(40);
			expect(s.d).toBe(40);
			expect(s.w).toBe(40);
			expect(s.h).toBe(40);
			s.remove();

			// test constructor with position (x, y) and size (w, h)
			s = new p.Sprite(0, 0, 40, 60);
			expect(s.shape).toBe('box');
			expect(s.x).toBe(0);
			expect(s.y).toBe(0);
			expect(s.w).toBe(40);
			expect(s.h).toBe(60);
			s.remove();

			// test special Turtle sprite constructor
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

			// test x, y
			s = new p.Sprite();
			s.x = 5;
			expect(s.x).toBe(5);
			s.y = 10;
			expect(s.y).toBe(10);

			// default density and mass
			expect(s.density).toBe(5);
			expect(s.mass).toBeCloseTo(3.461);

			// test width, height (w, h)
			s.w = 15;
			expect(s.w).toBe(15);
			expect(s.hw).toBe(7.5);
			expect(() => {
				s.hw = 10;
			}).toThrow();
			expect(s.mass).toBeCloseTo(1.038);

			s.h = 20;
			expect(s.h).toBe(20);
			expect(s.hh).toBe(10);
			expect(() => {
				s.hh = 10;
			}).toThrow();
			expect(s.mass).toBeCloseTo(0.415);

			expect(s).toBeInstanceOf(p.Sprite);
			expect(s.vel).toBeInstanceOf(p5.Vector);
			expect(typeof s.vel.__lookupGetter__('x') == 'function').toBe(true);
			expect(typeof s.vel.__lookupGetter__('y') == 'function').toBe(true);

			s.rotation = 25;
			expect(s.rotation).toBeCloseTo(25);
			s.rotationSpeed = 30;
			expect(s.rotationSpeed).toBeCloseTo(30);
			s.rotationSpeed = 0;
			expect(s.rotationSpeed).toBe(0);
			s.rotation = 0;

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

			// test change shape to circle
			s.d = 20;
			expect(s.shape).toBe('circle');
			expect(s.d).toBe(20);
			expect(s.w).toBe(20);
			expect(s.h).toBe(20);
			expect(s.mass).toBeCloseTo(0.432);

			// test change collider type
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
	// tests that use the p5.js preload or draw functions
	// or any async functions must be wrapped in a Promise
	return new Promise((resolve) => {
		const sketch = (p) => {
			let s0, s1;

			p.setup = () => {
				new p.Canvas(400, 400);

				s0 = new p.Sprite(10, 0);
				s1 = new p.Sprite(100, 10, 50, 'static');
				expect(s1.mass).toBe(0);
			};

			p.draw = () => {
				if (p.frameCount == 1) {
					expect(s0.x).toBe(10);
					expect(s0.y).toBe(0);
					expect(s1.x).toBe(100);
					expect(s1.y).toBe(10);
					p.world.gravity.y = 10;
				}
				if (p.frameCount == 2) {
					// s0 is dynamic so with gravity it should fall
					expect(s0.x).toBe(10);
					expect(s0.y).toBeGreaterThan(0);
					expect(s0.vel.x).toBe(0);
					expect(s0.vel.y).toBeGreaterThan(0);
					// becasue s1 is static it should be in the same place
					expect(s1.x).toBe(100);
					expect(s1.y).toBe(10);
				}
				if (p.frameCount == 3) {
					s0.speed = 0;
					s0.x = 10;
					s0.y = 0;
					p.world.gravity.y = -5;
				}
				if (p.frameCount == 4) {
					// the x position shouldn't because gravity is only in the y
					expect(s0.x).toBe(10);
					expect(s0.y).toBeLessThan(0);
					// the x vel won't change but they y-vel will
					expect(s0.vel.x).toBe(0);
					expect(s0.vel.y).toBeLessThan(0);
				}
				if (p.frameCount == 5) {
					s0.remove();
					s1.remove();
					s0 = new p.Sprite(100, 86, 100, 2, 'kinematic');
					s0.vel.y = -5;
					s1 = new p.Sprite(100, 60, 50);
				}
				if (p.frameCount == 6) {
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
	return new Promise((resolve) => {
		const sketch = (p) => {
			let s;

			p.setup = () => {
				new p.Canvas(400, 400);

				s = new p.Sprite(200, 200);

				sequence();
			};

			async function sequence() {
				await expect(s.move(1, 180, 10)).resolves.toBe(true);
				expect(s.x).toBe(199);
				expect(s.y).toBe(200);

				await expect(s.move(20, 'up', 10)).resolves.toBe(true);
				expect(s.x).toBe(199);
				expect(s.y).toBe(180);

				s.direction = 'right';
				await expect(s.move(1)).resolves.toBe(true);
				expect(s.x).toBe(200);
				expect(s.y).toBe(180);

				await expect(s.move(1, 'upRight')).resolves.toBe(true);
				expect(s.x).toBeCloseTo(200.707);
				expect(s.y).toBeCloseTo(179.293);

				await expect(s.moveTo(10, 20, 20)).resolves.toBe(true);
				expect(s.x).toBe(10);
				expect(s.y).toBe(20);

				// test interrupted movement
				expect(s.moveTo(50, 20)).resolves.toBe(false);
				await expect(s.moveTo(30, 20, 5)).resolves.toBe(true);

				s.moveTowards(20, 0);
				await p.sleep();
				expect(s.x).toBeLessThan(30);
				expect(s.y).toBeLessThan(20);

				// s.direction = 'up';
				// s.speed = 3;
				// expect(s.direction).toBe(-90);
				// expect(s.speed).toBe(3);
				// expect(s.y).toBe(23);

				// s.vel.x = -3;
				// s.vel.y = 1;
				// expect(s.x).toBe(26);
				// expect(s.y).toBe(24);

				p.noLoop();
				resolve();
			}

			p.draw = () => {};
		};
		new p5(sketch);
	});
});

test('Sprite : rotate, rotateTo, rotateTowards', () => {
	const sketch = (p) => {
		let s;

		p.setup = async () => {
			new p.Canvas(400, 400);
			p.noLoop();

			s = new p.Sprite();

			await expect(s.rotate(180, 10)).resolves.toBe(true);
			expect(s.rotation).toBe(180);
			expect(frameCount).toBe(18);

			await expect(s.rotateTo(200, 0)).resolves.toBe(true);
			expect(s.rotation).toBe(90);

			s.rotateTowards(0, 0);
			expect(s.rotation).toBeGreaterThan(90);

			s.remove();
		};
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

test('Sprite : collides, colliding, collided', () => {
	return new Promise((resolve, reject) => {
		const sketch = (p) => {
			let s0, s1;

			p.setup = () => {
				new p.Canvas(400, 400);

				s0 = new p.Sprite(200, 200);
				s0.test = 0;

				s1 = new p.Sprite(254, 200);
				s1.test = 0;

				s0.collides(s1, (a, b) => {
					expect(a).toBe(s0);
					expect(b).toBe(s1);

					a.test = 1;
					b.test = 2;
				});

				s0.vel.x = 5;

				sequence();
			};

			async function sequence() {
				expect(s0.collides(s1)).toBe(false);
				expect(s1.collides(s0)).toBe(false);

				await p.sleep();
				await p.sleep();

				expect(s0.collides(s1)).toBe(true);
				expect(s1.collides(s0)).toBe(true);
				expect(s0.colliding(s1)).toBe(1);
				expect(s1.colliding(s0)).toBe(1);
				expect(s0.collided(s1)).toBe(false);
				expect(s1.collided(s0)).toBe(false);

				expect(s0.test).toBe(1);
				expect(s1.test).toBe(2);

				await p.sleep();

				expect(s0.collides(s1)).toBe(false);
				expect(s1.collides(s0)).toBe(false);
				expect(s0.colliding(s1)).toBe(2);
				expect(s1.colliding(s0)).toBe(2);
				expect(s0.collided(s1)).toBe(false);
				expect(s1.collided(s0)).toBe(false);

				let collidingFrameCount = 0;
				while (s0.colliding(s1)) {
					await p.sleep();
					collidingFrameCount++;
				}
				expect(collidingFrameCount).toBe(1);

				expect(s0.collided(s1)).toBe(true);
				expect(s1.collided(s0)).toBe(true);

				resolve();
			}

			p.draw = () => {
				if (p.frameCount == 10) reject('timed out');
			};
		};
		new p5(sketch);
	});
});

test('Sprite : overlaps, overlapping, overlapped', () => {
	return new Promise((resolve, reject) => {
		const sketch = (p) => {
			let s0, s1;

			p.setup = () => {
				new p.Canvas(400, 400);

				s0 = new p.Sprite(200, 200);
				s0.test = 0;

				s1 = new p.Sprite(254, 200);
				s1.test = 0;

				s0.overlaps(s1, (a, b) => {
					expect(a).toBe(s0);
					expect(b).toBe(s1);

					a.test = 1;
					b.test = 2;
				});

				s0.vel.x = 25;

				sequence();
			};

			async function sequence() {
				expect(s0.overlaps(s1)).toBe(false);
				expect(s1.overlaps(s0)).toBe(false);

				await p.sleep();
				await p.sleep();

				expect(s0.overlaps(s1)).toBe(true);
				expect(s1.overlaps(s0)).toBe(true);
				expect(s0.overlapping(s1)).toBe(1);
				expect(s1.overlapping(s0)).toBe(1);
				expect(s0.overlapped(s1)).toBe(false);
				expect(s1.overlapped(s0)).toBe(false);

				expect(s0.test).toBe(1);
				expect(s1.test).toBe(2);

				await p.sleep();

				expect(s0.overlaps(s1)).toBe(false);
				expect(s1.overlaps(s0)).toBe(false);
				expect(s0.overlapping(s1)).toBe(2);
				expect(s1.overlapping(s0)).toBe(2);
				expect(s0.overlapped(s1)).toBe(false);
				expect(s1.overlapped(s0)).toBe(false);

				let overlappingFrameCount = 0;
				while (s0.overlapping(s1)) {
					await p.sleep();
					overlappingFrameCount++;
				}
				expect(overlappingFrameCount).toBe(3);

				expect(s0.overlapped(s1)).toBe(true);
				expect(s1.overlapped(s0)).toBe(true);

				resolve();
			}

			p.draw = () => {
				if (p.frameCount == 10) reject('timed out');
			};
		};
		new p5(sketch);
	});
});
