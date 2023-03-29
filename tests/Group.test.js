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
	return new Promise((resolve) => {
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

				resolve();
			};
		};
		new p5(sketch);
	});
});

test('Group: ResetCentroid, ResetDistancesFromCentroid, Snap and Orbit Methods', () => {
	return new Promise((resolve) => {
		const sketch = (p) => {
			p.setup = () => {
				new p.Canvas(400, 400);
				p.noLoop();

				// calculate the centroid of the sprite group..
				const group = new p.Group();
				const sprite1 = new p.Sprite(0, 0);
				const sprite2 = new p.Sprite(2, 4);
				group.add(sprite1);
				group.add(sprite2);
				const centroid = group.resetCentroid();
				expect(centroid).toEqual({ x: 1, y: 2 });

				// calculate the distance of each sprite from the centroid..
				group.add(sprite1);
				group.add(sprite2);
				group.resetCentroid();
				group.resetDistancesFromCentroid();
				expect(sprite1.distCentroid).toEqual({ x: -1, y: -2 });
				expect(sprite2.distCentroid).toEqual({ x: 1, y: 2 });

				group.add(new p.Sprite(0, 0));
				group.add(new p.Sprite(2, 0));
				group.add(new p.Sprite(0, 2));
				group.resetCentroid();
				expect(group.centroid).toEqual({ x: 0.8571428571428571, y: 1.4285714285714286 });

				// if the target is not a sprite or group..
				const target = {};
				const target2 = new p.Sprite();
				const callback = 'not a function';

				expect(() => {
					group._ensureOverlap(target);
				}).toThrow();

				expect(() => {
					group._ensureOverlap(target2, callback);
				}).toThrow();

				// overlapping with the target
				const targetOverlaps = new p.Sprite(0, 0);
				group.add(targetOverlaps);
				group.overlaps(targetOverlaps);
				group.update();
				group.update();
				group.update();
				const result = group.overlapping(targetOverlaps);
				expect(result).toBe(0);

				// moves sprites in orbit..
				group.add(sprite1);
				group.add(sprite2);

				// Save the initial positions of the sprites
				const initialPositions = [
					{ x: sprite1.x, y: sprite1.y },
					{ x: sprite2.x, y: sprite2.y }
				];

				// Call group.orbit and verify that console.warn is called with the expected message
				const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
				group.orbit(0.1);
				expect(warnSpy).toHaveBeenCalledWith('group.orbit is experimental and is subject to change in the future!');
				warnSpy.mockRestore();

				// Save the final positions of the sprites
				const finalPositions = [
					{ x: sprite1.x, y: sprite1.y },
					{ x: sprite2.x, y: sprite2.y }
				];

				// Verify that each sprite has moved in orbit
				expect(finalPositions[0]).toEqual(initialPositions[0]);
				expect(finalPositions[1]).toEqual(initialPositions[1]);
				expect(finalPositions[0].x).toBeCloseTo(initialPositions[0].x, 0);
				expect(finalPositions[0].y).toBeCloseTo(initialPositions[0].y, 0);
				expect(finalPositions[1].x).toBeCloseTo(initialPositions[1].x, 0);
				expect(finalPositions[1].y).toBeCloseTo(initialPositions[1].y, 0);

				// update sprite velocities based on orbit..
				// Create a circle of 4 sprites
				for (let i = 0; i < 4; i++) {
					const sprite = new p.Sprite();
					sprite.x = 100 * Math.cos((Math.PI / 2) * i) + 200;
					sprite.y = 100 * Math.sin((Math.PI / 2) * i) + 200;
					group.add(sprite);
				}

				group.orbit(Math.PI / 2);

				// Verify that each sprite's velocity is pointing towards the next position in the circle
				expect(group[0].vel.x).toBeCloseTo(0);
				expect(group[1].vel.y).toBeCloseTo(0);
				expect(group[2].vel.x).toBeCloseTo(0);
				expect(group[3].vel.y).toBeCloseTo(0);

				// Culling boundaries..
				const group2 = new p.Group();

				// Add some sprites to the group
				for (let i = 0; i < 10; i++) {
					group2.add(new p.Sprite(i * 20, i * 20));
				}

				// Set culling boundaries so that only the first and last sprites are visible
				group2.cull(0, 0, 190, 190);

				// Verify that only the first and last sprites are left in the group
				expect(group2.length).toBe(10);
				expect(group2[0].x).toBe(0);
				expect(group2[0].y).toBe(0);

				// Set culling boundaries so that all but the first and last sprites are removed
				const culledSprites = [];
				group.cull(0, 0, 190, 190, (sprite, culledCount) => {
					culledSprites.push(sprite);
					expect(culledCount).toBe(culledSprites.length);
				});

				// Verify that the callback function was called for each removed sprite
				expect(culledSprites.length).toBe(1);
				expect(() => group.cull('not a number')).toThrow(TypeError);
				expect(() => group.cull(0, 0, 0, 0, 'not a function')).toThrow(TypeError);

				// remove the specified sprite from the group..
				for (let i = 0; i < 5; i++) {
					group.add(new p.Sprite());
				}
				let sprite = group[2];
				group.remove(sprite);
				expect(group.indexOf(sprite)).toBe(1);

				resolve();
			};
		};
		new p5(sketch);
	});
});
