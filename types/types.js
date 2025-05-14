// bun is require to run this script: https://bun.sh

// usage: bun types/types.js -i /path/to/p5play.js

import { unlinkSync } from 'node:fs';

const log = console.log;
let pathToP5Play = process.argv[3] || 'v3/p5play.js';

let file = Bun.file(pathToP5Play);
file = await file.text();

// isolate the code that's inside the p5playInit function
let start = file.indexOf('// START p5play.d.ts') + 20;
let end = file.indexOf('// END p5play.d.ts') - 1;
file = file.slice(start, end + 1);

file = file.replace('const $ = this;', 'let $;');

file = file.replace('let log = ($.log = console.log);', '');

file = file.replace(/^\s*this\.([_\w]+) = class/gm, 'class $1');
file = file.replace(/extends this\.([_\w]+)/gm, 'extends $1');

// overwrite p5play.js
await Bun.write('types/p5play.js', file);

let proc = Bun.spawn(['tsc', '--project', 'types/tsconfig.json']);

// await completion
await proc.exited;

let dec = await Bun.file('types/p5play.d.ts');
dec = await dec.text();
dec = dec.slice(dec.indexOf('*/') + 2);
dec = dec.replaceAll('declare ', '');

// replace all instances of 4 spaces with a tab
dec = dec.replace(/^( {4})+/gm, match => '\t'.repeat(match.length / 4));


dec = dec.replace(
	`
let usePhysics: boolean;
let timeScale: number;`,
	''
);
dec = dec.replace(
	`
namespace errMsgs {
	namespace Group {
		import collide = collide;
		export { collide };
		import overlap = overlap;
		export { overlap };
	}
	namespace Sprite { }
}`,
	''
);
dec = dec.replace(
	`
	/**
	 * @class
	 */
	GroupSprite: any;
	/**
	 * @class
	 */
	Subgroup: any;
	`,
	`
	Sprite: typeof Sprite;
	GroupSprite: typeof Sprite;
	Group: typeof Group;
	Subgroup: typeof Group;
	`
);
dec = dec.replace(/^(const|function|var)*\s*_[^{\n]+\n/gm, '');
dec = dec.replace(/^\s*(const|var)*\s*_([^{\n]+){(?:[^{}]*{[^{}]*}[^{}]*)*[^{}]*};\n/gm, '');
dec = `import 'q5';\n\ndeclare global {\n` + dec + '\n}\n';
dec = dec.replace(
	`
function resizeCanvas(w: any, h: any): void;
function frameRate(hz: any): any;
function background(...args: any[]): void;
function fill(...args: any[]): void;
function stroke(...args: any[]): void;
function loadImage(...args: any[]): new (width?: number, height?: number) => HTMLImageElement;
function loadImg(...args: any[]): new (width?: number, height?: number) => HTMLImageElement;`,
	'\n'
);
dec = dec.replace(
	`
let pressAmt: number;
function onpointerdown(e: any): void;
function onpointermove(e: any): void;
function onpointerup(e: any): void;`,
	''
);
dec = dec.replace(
	`
function onkeydown(e: any): void;
function onkeyup(e: any): void;`,
	''
);
dec = dec.replace(
	`
function p5playAfterSetup(): void;
function p5playPreDraw(): void;
function p5playPostDraw(): void;`,
	''
);
await Bun.write('v3/p5play.d.ts', dec);

unlinkSync('types/p5play.d.ts'); // delete temp files
