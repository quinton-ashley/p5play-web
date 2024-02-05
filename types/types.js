// bun is require to run this script: https://bun.sh

// usage: bun types/types.js -i /path/to/p5play.js

import { unlinkSync } from 'node:fs';

const log = console.log;
const pathToP5Play = process.argv[3] || 'v3/p5play.js';

let file = Bun.file(pathToP5Play);
file = await file.text();

// remove everything before p5playInit {
const start = file.indexOf('p5playInit() {') + 14;
const end = file.indexOf("});\n\np5.prototype.registerMethod('pre'") - 1;

file = file.slice(start, end + 1);

file = file.replace('const $ = this;', 'let $;');

file = file.replace('this.log = console.log;', '');

file = file.replace(/^\s*this\.([_\w]+) = class/gm, 'class $1');
file = file.replace(/extends this\.([_\w]+)/gm, 'extends $1');

// overwrite p5play.js
await Bun.write('types/p5play.js', file);

const proc = Bun.spawn(['tsc', '--project', 'types/tsconfig.json']);

// await completion
await proc.exited;

let dec = await Bun.file('types/p5play.d.ts');
dec = await dec.text();
dec = dec.slice(dec.indexOf('*/') + 2);
dec = dec.replaceAll('declare ', '');
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
dec =
	`import * as p5 from 'p5';
declare global {
` +
	dec +
	'\n}\n';
await Bun.write('v3/p5play.d.ts', dec);

unlinkSync('types/p5play.d.ts'); // delete temp files
