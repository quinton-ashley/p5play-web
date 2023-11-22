# p5play-types

The "build.js" script converts the latest of "p5play.js" into a
non-functional version that's only purpose is for generating typescript definitions. It outputs "p5play.d.ts", which is are used by vscode to provide intellisense (autocomplete) for p5play.

## Usage

First you'll need to install [bun](https://bun.sh/).

Run `bun i typescript -g` to install typescript globally.

Then you can use the "build.js" script:

```
bun dev/types/types.js -i /path/to/p5play.js
```
