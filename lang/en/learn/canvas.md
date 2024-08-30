# 0-0

## Canvas

The `Canvas` constructor creates a new HTML5 `canvas` element and adds it to your webpage.

It's like the p5.js `createCanvas` function, but with some added features!

Use `canvas.w` to get the width and `canvas.h` to get the height of the canvas. `canvas.hw` gets half the width and `canvas.hh` gets half the height of the canvas.

# 0-1

If no parameters are passed to `new Canvas()`, it will create a canvas that fills the entire window.

You can also pass an aspect ratio to the Canvas constructor. This will create the largest possible canvas that fits within the window, while maintaining the given aspect ratio. For example, `new Canvas('2:1')` will create a canvas that is twice as wide as it is tall.

Another added feature is the `"fullscreen"` preset, `new Canvas(1920, 1080, 'fullscreen')` will letterbox the canvas to fit within the window, while maintaining a 1920x1080 resolution.

# 1-0

## pixelated mode

Another `Canvas` feature is the `"pixelated"` preset. Use it for making 8-bit or 16-bit style retro games!

This preset will make the canvas fit the screen, unless you specify a multiplier. For example, `"pixelated x2"` will create a canvas that's displayed at twice the size of the specified width and height.

To display all sprites at integer coordinates, set `allSprites.pixelPerfect` to true and use integer coordinates for the camera's position and zoom.

Note that modern fonts are vector based, so they won't look very good in pixelated mode. Load a bitmap font instead with the p5.js [`loadFont`](https://p5js.org/reference/p5/loadFont) function.

# 2-0

## Resize

The `resizeCanvas` or `canvas.resize` functions resize the canvas to a specified width and height.

Visually the canvas will shrink or extend to the new size. Sprites will not change position.

If you'd prefer to keep the camera focused on the same area, manually adjust the camera position after calling this function.
