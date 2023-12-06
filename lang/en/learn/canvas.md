# 0-0

## Advanced Topics

These reference pages highlight some of the more advanced features of p5play.

You should probably read the other reference pages first!

# 0-1

## Canvas

The `Canvas` class is a wrapper around p5play's version of the p5.js `createCanvas` function, which is used to create an HTML5 canvas element. p5play's version also provides a few extra features.

If no parameters are passed to `new Canvas()`, it will create a canvas that fills the entire window.

Use `canvas.w` and `canvas.h` to get the width and height of the canvas.

You can also pass an aspect ratio to the Canvas constructor. This will create the largest possible canvas that fits within the window, while maintaining the given aspect ratio. For example, `new Canvas('2:1')` will create a canvas that is twice as wide as it is tall.

# 1-0

## pixelated mode

Another `Canvas` feature is the `"pixelated"` preset. Use it for making 8-bit or 16-bit style retro games!

By default, the `"pixelated"` preset scales the canvas to fit the screen while retaining its aspect ratio, but you can also define a custom scale by passing a multiplier after the preset name.

For example, `"pixelated x2"` will create a canvas that's displayed at twice the size of the specified width and height.

To display all sprites at integer coordinates, set `allSprites.pixelPerfect` to true and use integer coordinates for the camera's position and zoom.

Note that modern fonts are vector based, so they won't look very good in pixelated mode. Load a bitmap font instead with the p5.js [`loadFont`](https://p5js.org/reference/#/p5/loadFont) function.

# 2-0

## Resize

The `resizeCanvas` or `canvas.resize` functions resize the canvas to a specified width and height.

Visually the canvas will shrink or extend to the new size. Sprites will not change position.

If you would prefer to keep the camera focused on the same area, then you must manually adjust the camera position after calling this function.
