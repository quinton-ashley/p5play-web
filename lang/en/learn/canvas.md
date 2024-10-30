# 0-0

## Canvas

The `Canvas` constructor creates a new HTML5 `canvas` element and adds it to your webpage.

It's like the q5.js `createCanvas` function, but with some added features!

Use `canvas.w` to get the width and `canvas.h` to get the height of the canvas. `canvas.hw` gets half the width and `canvas.hh` gets half the height of the canvas.

# 0-1

If no parameters are passed to `new Canvas()`, it will create a canvas that fills the entire window.

You can also pass an aspect ratio to the Canvas constructor. This will create the largest possible canvas that fits within the window, while maintaining the given aspect ratio. For example, `new Canvas('2:1')` will create a canvas that is twice as wide as it is tall.

# 1-0

## Display Mode

The `displayMode` function lets you customize how your canvas is presented.

- `"normal"`, is the default, which doesn't apply styling to the canvas or its parent element
- `"centered"` makes the canvas horizontally and vertically centered in its parent element
- `"maxed"` makes the canvas fill the parent element with letterboxing if necessary to preserve its aspect ratio

This function also accepts a render quality preset as the second input parameter. Use the `"pixelated"` preset for making 8-bit or 16-bit style retro games!

In this example, a third input parameter is used to display the canvas at 8x scale.

To display all sprites at integer coordinates, set `allSprites.pixelPerfect` to true and use integer coordinates for the camera's position and zoom.

Note that modern fonts are vector based, so they won't look good at low resolutions. Load a pixel font instead with the [`loadFont`](https://p5js.org/reference/p5/loadFont) function.

# 2-0

## Resize

The `resizeCanvas` or `canvas.resize` functions resize the canvas to a specified width and height.

Visually the canvas will shrink or extend to the new size. Sprites will not change position.

If you'd prefer to keep the camera focused on the same area, manually adjust the camera position after calling this function.
