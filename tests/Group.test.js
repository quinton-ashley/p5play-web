/**
 * @jest-environment jsdom
 */

const log = console.log;
global.p5 = require('../v3/q5.js');
global.planck = require('../v3/planck.min.js');
require('../v3/p5play.js');

test('Group', () => {
	const sketch = (p) => {
		let g;

		p.setup = () => {
			new p.Canvas(400, 400);
			p.noLoop();

			expect(p).toHaveProperty('Group');
			expect(p.Group).toBeInstanceOf(Function);

			g = new p.Group();
			expect(g).toBeInstanceOf(p.Group);

			new g.Sprite();

			g.customProp = 'foo';
			expect(g.customProp).toBe('foo');

			new g.Sprite();

			expect(g[0].customProp).toBe(undefined);
			expect(g[1].customProp).toBe('foo');

			g.life = 100;

			expect(g[0].life).toBe(100);

			const spriteConstructedOutsideGroup = new p.Sprite();
			let spriteAdded = g.push(spriteConstructedOutsideGroup);
			expect(spriteAdded).toBe(3);
			expect(g.at(-1)).toBe(spriteConstructedOutsideGroup);

			spriteAdded = g.add(spriteConstructedOutsideGroup);
			expect(spriteAdded).toBe(4);
			expect(g.at(-1)).toBe(spriteConstructedOutsideGroup);

			g.removeAll();

			expect(g.length).toBe(0);
		};
	};
	new p5(sketch);
});
