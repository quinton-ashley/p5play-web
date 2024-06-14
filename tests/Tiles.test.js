/**
 * @jest-environment jsdom
 */

const log = console.log;
require('../v3/q5.js');
global.planck = require('../v3/planck.min.js');
require('../v3/p5play.js');

test('Tiles', () => {
	return new Promise((resolve) => {
		const sketch = (p) => {
			p.setup = () => {
				new p.Canvas(400, 400);
				p.noLoop();

				expect(p.Tiles).toBeInstanceOf(Function);

				// I changed the Tiles constructor to throw the error
				// if the tile is not found
				expect(() => {
					new p.Tiles('X', 0, 0, 10, 10);
				}).toThrow();

				// TODO: test a successful usage of the Tiles constructor

				// const tiles = '.....\n..a..\n.b...\n.....';
				// const x = 10;
				// const y = 10;
				// const w = 20;
				// const h = 20;

				// const tilesObj = new p.Tiles(tiles, x, y, w, h);

				resolve();
			};
		};
		new p5(sketch);
	});
});
