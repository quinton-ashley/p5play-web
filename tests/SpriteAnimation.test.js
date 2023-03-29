/**
 * @jest-environment jsdom
 */

const log = console.log;
global.p5 = require('../v3/q5.js');
global.planck = require('../v3/planck.min.js');
require('../v3/p5play.js');

// path to my VSCode Live Server
// let host = 'http://127.0.0.1:5501';

// alternatively images can be loaded from p5play.org
let host = 'https://p5play.org';

test('SpriteAnimation : properties', () => {
	const sketch = (p) => {
		p.setup = () => {
			new p.Canvas(400, 400);
			p.noLoop();

			expect(p.SpriteAnimation).toBeInstanceOf(Function);

			// test basic usage with list mode
			let images0 = [p.spriteArt('bww'), p.spriteArt('wbw'), p.spriteArt('wwb')];
			let ani0 = new p.SpriteAnimation(...images0);

			expect(ani0).toBeInstanceOf(p.SpriteAnimation);

			expect(ani0.length).toBe(3);
			expect(ani0.name).toBe('default');
			expect(ani0.frame).toBe(0);
			expect(ani0.offset).toEqual({ x: 0, y: 0 });
			expect(ani0.frameDelay).toBe(4);
			expect(ani0.demoMode).toBe(false);
			expect(ani0.playing).toBe(true);
			expect(ani0.visible).toBe(true);
			expect(ani0.looping).toBe(true);
			expect(ani0.endOnFirstFrame).toBe(false);
			expect(ani0.frameChanged).toBe(false);
			expect(ani0.onComplete).toBe(null);
			expect(ani0.onChange).toBe(null);
			expect(ani0.rotation).toBe(0);
			expect(ani0.scale).toEqual({ x: 1, y: 1 });

			ani0.frame = 1;
			expect(ani0.frame).toBe(1);

			const images1 = [p.createImage(32, 32), p.createImage(32, 32), p.createImage(32, 32)];
			const ani1 = new p.SpriteAnimation('custom', ...images1);

			expect(ani1).toBeInstanceOf(p.SpriteAnimation);
			expect(ani1.name).toBe('custom');

			// test that sprite s0 is the parent of ani2
			const s0 = new p.Sprite();
			const images2 = [p.createImage(32, 32), p.createImage(32, 32), p.createImage(32, 32)];
			const ani2 = new p.SpriteAnimation(s0, ...images2);

			expect(s0.ani).toBe(ani2);

			// test that group g0 is the parent of ani3
			const g0 = new p.Group();
			const images3 = [p.createImage(32, 32), p.createImage(32, 32), p.createImage(32, 32)];
			const ani3 = new p.SpriteAnimation(g0, ...images3);

			expect(g0.ani).toBe(ani3);
		};
	};
	new p5(sketch);
});

test('SpriteAnimation : List mode', () => {
	return new Promise((resolve) => {
		const sketch = (p) => {
			let ani0;
			p.preload = () => {
				ani0 = new p.SpriteAnimation(
					host + '/learn/assets/asterisk.png',
					host + '/learn/assets/triangle.png',
					host + '/learn/assets/square.png'
				);
			};
			p.setup = () => {
				new p.Canvas(400, 400);
				p.noLoop();

				expect(ani0.length).toBe(3);

				resolve();
			};
		};
		new p5(sketch);
	});
});

test('SpriteAnimation : Sequence mode', () => {
	return new Promise((resolve) => {
		const sketch = (p) => {
			let ani0;
			p.preload = () => {
				ani0 = new p.SpriteAnimation(host + '/learn/assets/cloud_breathing0001.png', 9);
			};
			p.setup = () => {
				new p.Canvas(400, 400);
				p.noLoop();

				expect(ani0.length).toBe(9);

				resolve();
			};
		};
		new p5(sketch);
	});
});

test('SpriteAnimation : SpriteSheet mode', () => {
	return new Promise((resolve) => {
		const sketch = (p) => {
			let spritesheet0;
			p.preload = () => {
				spritesheet0 = p.loadImage(host + '/learn/assets/questKid.png');
			};
			p.setup = () => {
				new p.Canvas(400, 400);
				p.noLoop();

				const owner = {
					spriteSheet: spritesheet0,
					anis: {
						frameSize: 2,
						w: 5,
						h: 5
					},
					tileSize: 1,
					_dimensionsUndefinedByUser: true
				};

				const spriteAnimation = new p.SpriteAnimation(owner, owner.spriteSheet);
				expect(spriteAnimation.frames.length).toBe(2);

				resolve();
			};
		};
		new p5(sketch);
	});
});

test('SpriteAnimations', () => {
	const sketch = (p) => {
		p.setup = () => {
			new p.Canvas(400, 400);
			p.noLoop();

			const group = new p.SpriteAnimation();

			// test setting and getting a custom property
			group.duration = 100;
			expect(group.duration).toBe(100);

			// test setting and getting an object property
			group.offset.x = 50;
			expect(group.offset.x).toBe(50);

			const sprite1 = new p.SpriteAnimation();
			const sprite2 = new p.SpriteAnimation();
			group.sprite1 = sprite1;
			group.sprite2 = sprite2;

			expect(sprite1.offset.x).toBe(0);
			expect(sprite2.offset.x).toBe(0);

			resolve();
		};
	};
	new p5(sketch);
});
