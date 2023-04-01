/**
 * @jest-environment jsdom
 */

const log = console.log;
global.p5 = require('../v3/q5.js');
global.planck = require('../v3/planck.min.js');
require('../v3/p5play.js');

test('InputDevice : mouse', () => {
	return new Promise((resolve) => {
		const sketch = (p) => {
			p.setup = () => {
				new p.Canvas(400, 400);

				expect(p).toHaveProperty('mouse');

				expect(p.mouse.x).toBe(0);
				expect(p.mouse.y).toBe(0);
				expect(p.mouse.holdThreshold).toEqual(12);
				expect(p.mouse.default).toEqual('left');
				expect(p.mouse.draggable).toBe(false);
				expect(p.mouse.isOnCanvas).toBe(false);
				expect(p.mouse.active).toBe(false);

				// return false for invalid input..
				expect(p.mouse.presses('invalid-input')).toBe(false);

				// return 'left' for input starting with 'left'..
				const acResultLeft = p.mouse.ac('left-click');
				expect(acResultLeft).toBe('left');
			};

			p.draw = () => {
				if (p.frameCount == 1) {
					let evt = new MouseEvent('mousemove', {
						view: window,
						bubbles: true,
						cancelable: true,
						clientX: 10,
						clientY: 20
					});
					p.canvas.dispatchEvent(evt);
				}
				if (p.frameCount == 2) {
					expect(p.mouse.x).toEqual(10);
					expect(p.mouse.y).toEqual(20);
					expect(p.mouse.pos).toEqual({ x: 10, y: 20 });
					expect(p.mouse.position).toEqual({ x: 10, y: 20 });
				}

				// TODO: continue tests by creating MouseEvents..

				if (p.frameCount == 10) {
					p.noLoop();
					resolve();
				}
			};
		};
		new p5(sketch);
	});
});

test('InputDevice : keyboard', () => {
	return new Promise((resolve) => {
		const sketch = (p) => {
			p.setup = () => {
				new p.Canvas(400, 400);

				expect(p).toHaveProperty('kb');
			};

			p.draw = () => {
				// TODO: test using KeyboardEvents..

				p.noLoop();
				resolve();
			};
		};
		new p5(sketch);
	});
});

test('InputDevice : contro', () => {
	const sketch = (p) => {
		p.setup = () => {
			new p.Canvas(400, 400);
			p.noLoop();

			expect(p).toHaveProperty('contro');
		};
	};
	new p5(sketch);
});

test('InputDevice : touch', () => {
	const sketch = (p) => {
		p.setup = () => {
			new p.Canvas(400, 400);
			p.noLoop();

			expect(p).toHaveProperty('touches');
		};
	};
	new p5(sketch);
});
