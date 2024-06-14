/**
 * @jest-environment jsdom
 */

const log = console.log;
require('../v3/q5.js');
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
				expect(p.mouse.isOnCanvas).toBe(false);
				expect(p.mouse.isActive).toBe(false);

				// return false for invalid input..
				expect(p.mouse.presses('invalid-input')).toBe(false);

				p.mouse.right = 10;
				// return 'right' for input starting with 'right'..
				const res = p.mouse.pressing('right-click');
				expect(res).toBe(10);
				p.mouse.right = -1;
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
					expect(p.mouse.pos.x).toEqual(10);
					expect(p.mouse.pos.y).toEqual(20);
					expect(p.mouse.position.x).toEqual(10);
					expect(p.mouse.position.y).toEqual(20);
				}

				// TODO: continue tests by creating MouseEvents..
				if (p.frameCount == 3) {
					// Test left button..
					evt = new MouseEvent('mousedown', {
						view: window,
						bubbles: true,
						cancelable: true,
						clientX: 10,
						clientY: 20,
						button: 0
					});
					p.canvas.dispatchEvent(evt);
					expect(p.mouse.left).toBe(1);
				}

				if (p.frameCount == 4) {
					// Test left button finish click..
					evt = new MouseEvent('mouseup', {
						view: window,
						bubbles: true,
						cancelable: true,
						clientX: 10,
						clientY: 20,
						button: 0
					});
					p.canvas.dispatchEvent(evt);
					expect(p.mouse.left).toBe(-1);
				}

				if (p.frameCount == 5) {
					// Test right button
					evt = new MouseEvent('mousedown', {
						view: window,
						bubbles: true,
						cancelable: true,
						clientX: 30,
						clientY: 40,
						button: 2
					});
					p.canvas.dispatchEvent(evt);
					expect(p.mouse.right).toBe(1);
				}

				if (p.frameCount == 6) {
					// Test right button finish click..
					evt = new MouseEvent('mouseup', {
						view: window,
						bubbles: true,
						cancelable: true,
						clientX: 30,
						clientY: 40,
						button: 2
					});
					p.canvas.dispatchEvent(evt);
					expect(p.mouse.right).toBe(-1);
				}

				if (p.frameCount == 7) {
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
				if (p.frameCount == 1) {
					// trigger a keydown event for the 'a' key..
					let evt = new KeyboardEvent('keydown', {
						view: window,
						bubbles: true,
						cancelable: true,
						key: 'a'
					});
					p.canvas.dispatchEvent(evt);

					expect(p.kb.a).toBe(1);
				}

				if (p.frameCount == 2) {
					// trigger keydown event for the 'space' key..
					evt = new KeyboardEvent('keydown', {
						view: window,
						bubbles: true,
						cancelable: true,
						key: ' '
					});
					p.canvas.dispatchEvent(evt);

					// check that the 'space' key is down..
					expect(p.kb[' ']).toBe(1);

					// trigger keyup event for the 'space' key..
					evt = new KeyboardEvent('keyup', {
						view: window,
						bubbles: true,
						cancelable: true,
						key: ' '
					});
					p.canvas.dispatchEvent(evt);

					// the key was pressed and released in the same frame,
					// so the property should be -3
					expect(p.kb[' ']).toBe(-3);
				}

				if (p.frameCount == 3) {
					expect(p.kb.a).toBe(3);

					// trigger a keyup event for the 'a' key..
					evt = new KeyboardEvent('keyup', {
						view: window,
						bubbles: true,
						cancelable: true,
						key: 'a'
					});
					p.canvas.dispatchEvent(evt);

					expect(p.kb.a).toBe(-1);
				}

				if (p.frameCount == 4) {
					p.noLoop();
					resolve();
				}
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
