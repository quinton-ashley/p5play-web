/**
 * @jest-environment jsdom
 */

const log = console.log;
global.p5 = require('../v3/q5.js');
global.planck = require('../v3/planck.min.js');
require('../v3/p5play-beta.js');

test('Camera', () => {
	const sketch = (p) => {
		p.setup = () => {
			new p.Canvas(400, 400);
			p.noLoop();

			expect(p).toHaveProperty('camera');
			expect(p.camera.zoom).toBe(1);

			expect(p.camera.pos).toEqual({ x: 0, y: 0 });
			expect(p.camera.position).toEqual({ x: 0, y: 0 });
			expect(p.camera.zoom).toBe(1);
			expect(p.camera.mouse).toEqual({ x: expect.any(Number), y: expect.any(Number) });
			expect(p.camera.active).toBe(false);
			expect(p.camera.bound).toEqual({ min: { x: -300, y: -300 }, max: { x: 300, y: 300 } });
			expect(p.camera.x).toBe(0);
			expect(p.camera.y).toBe(0);

			p.camera.x = 100;
			expect(p.camera.x).toBe(100);
			expect(p.camera.pos).toEqual({ x: 100, y: 0 });
			expect(p.camera.position).toEqual({ x: 100, y: 0 });

			p.camera.y = 50;
			expect(p.camera.y).toBe(200);
			expect(p.camera.pos).toEqual({ x: 100, y: 50 });
			expect(p.camera.position).toEqual({ x: 100, y: 50 });

			p.camera.zoom = 2;
			expect(p.camera.zoom).toBe(2);

			p.camera.zoom = 0.5;
			expect(p.camera.zoom).toBe(0.5);

			p.camera.on();
			expect(p.camera.active).toBe(true);

			p.camera.off();
			expect(p.camera.active).toBe(false);
		};
		new p5(sketch);
	};
});

test('Camera: zoomTo', () => {
	return new Promise((resolve) => {
		const sketch = (p) => {
			p.setup = () => {
				new p.Canvas(400, 400);

				(async () => {
					await p.camera.zoomTo(2, 0.5);
					expect(p.camera.zoom).toBe(2);

					await p.camera.zoomTo(0.5, -1);
					expect(p.camera.zoom).toBe(0.5);

					p.noLoop();
					resolve();
				})();
			};
		};
		new p5(sketch);
	});
});
