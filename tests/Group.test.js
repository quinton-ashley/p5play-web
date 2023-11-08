/**
 * @jest-environment jsdom
 */

const log = console.log;
global.p5 = require('../v3/q5.js');
global.planck = require('../v3/planck.min.js');
require('../v3/p5play-beta.js');

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

test('Group: Constructor', () => {
	return new Promise((resolve) => {
		const sketch = (p) => {
			p.setup = () => {
				new p.Canvas(400, 400);
				p.noLoop();

				// Constructor instance..
				const group = new p.Group();
				expect(group).toBeInstanceOf(p.Group);

				// Inherits Array Methods..
				expect(group).toHaveLength(0);
				const sprite = new p.Sprite();
				group.push(sprite);

				expect(group).toHaveLength(1);
				expect(group[0]).toBe(sprite);

				// Create a mock p5 instance
				const pInst = {
					Group: jest.fn(),
					Sprite: jest.fn(),
					SpriteAnimations: jest.fn(),
					allSprites: null,
					p5play: {
						groups: {},
						groupsCreated: 0
					}
				};

				const group2 = new p.Group(10, pInst.Sprite, pInst.SpriteAnimations);
				expect(group2.length).toBeTruthy();

				resolve();
			};
		};
		new p5(sketch);
	});
});

test('Group: Properties', () => {
	const sketch = (p) => {
		p.setup = () => {
			new p.Canvas(400, 400);
			p.noLoop();

			const group = new p.Group();

			expect(group.idNum).toBeDefined();

			// Add and remove sprites..
			const sprite1 = new p.Sprite();
			const sprite2 = new p.Sprite();

			group.add(sprite1, sprite2);
			expect(group).toHaveLength(2);

			group.remove(sprite1);
			expect(group).toHaveLength(1);
			expect(group[0]).toBe(sprite2);

			group.removeAll();
			expect(group).toHaveLength(0);

			// set the current animation..
			const anim = new p.SpriteAnimation();
			group.ani = anim;

			expect(group.ani).toEqual(anim);
			expect(group.animation).toEqual(anim);
			expect(group.length).toEqual(0);

			group.amount = 5;
			expect(group.length).toEqual(5);

			group.amount = 2;
			expect(group.length).toEqual(2);

			group.amount = 0;
			expect(group.length).toEqual(0);
		};
	};
	new p5(sketch);
});

test('Group: overlaps, overlapping, overlapped', () => {
	return new Promise((resolve, reject) => {
		const sketch = (p) => {
			let s0, s1, g1, g2;

			p.setup = () => {
				new p.Canvas(400, 400);

				g1 = new p.Group();

				s0 = new p.Sprite(200, 200);

				// if the target is not a group..
				const invalidTarget = {};
				const invalidCB = 'not a function';

				expect(() => {
					s0.overlaps(invalidTarget);
				}).toThrow();

				expect(() => {
					s0.overlaps(g1, invalidCB);
				}).toThrow();

				s0.overlaps(g1, (a, b) => {
					expect(a).toBe(s0);
					expect(b).toBe(s1);

					a.test = 1;
					b.test = 2;
				});

				s1 = new g1.Sprite(254, 200);

				g2 = new p.Group();
				g2.add(s0);

				g1.overlaps(g2, (a, b) => {
					expect(a).toBe(s1);
					expect(b).toBe(s0);

					g1.test = 1;
				});

				s0.vel.x = 20;

				sequence();
			};

			async function sequence() {
				expect(s0.overlaps(s1)).toBe(false);
				expect(s0.overlaps(g1)).toBe(false);

				await p.delay();
				await p.delay();

				expect(s0.overlaps(s1)).toBe(true);
				expect(s0.overlaps(g1)).toBe(true);
				expect(s0.overlapping(s1)).toBe(1);
				expect(s0.overlapping(g1)).toBe(1);
				expect(s0.overlapped(s1)).toBe(false);
				expect(s0.overlapped(g1)).toBe(false);

				expect(g1.test).toBe(1);
				expect(s0.test).toBe(1);
				expect(s1.test).toBe(2);

				await p.delay();

				expect(s0.overlaps(s1)).toBe(false);
				expect(s0.overlaps(g1)).toBe(false);
				expect(s0.overlapping(s1)).toBe(2);
				expect(s0.overlapping(g1)).toBe(2);
				expect(s0.overlapped(s1)).toBe(false);
				expect(s0.overlapped(g1)).toBe(false);

				let overlappingFrameCount = 0;
				while (s0.overlapping(g1)) {
					await p.delay();
					overlappingFrameCount++;
				}
				expect(overlappingFrameCount).toBe(4);

				expect(s0.overlapped(s1)).toBe(true);
				expect(s0.overlapped(g1)).toBe(true);

				resolve();
			}
			p.draw = () => {
				if (p.frameCount == 10) reject('timed out');
			};
		};
		new p5(sketch);
	});
});
