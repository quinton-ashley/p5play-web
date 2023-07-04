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
			const animation = new p.SpriteAnimation();
			group.ani = animation;

			expect(group.ani).toEqual(animation);
			expect(group.animation).toEqual(animation);
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

test('Group: Methods', () => {
	return new Promise((resolve) => {
		const sketch = (p) => {
			p.setup = () => {
				new p.Canvas(400, 400);
				p.noLoop();

				const group = new p.Group();

				// if the target is not a sprite or group..
				const target = {};
				const target2 = new p.Sprite();
				const callback = 'not a function';

				expect(() => {
					group.overlaps(target);
				}).toThrow();

				expect(() => {
					group.overlaps(target2, callback);
				}).toThrow();

				group.overlaps(target2);

				// TODO make good tests for overlaps, culling, and removal

				resolve();
			};
		};
		new p5(sketch);
	});
});
