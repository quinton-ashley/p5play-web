# 0-0

## Camera Movement

The `camera` is center positioned and located in the middle of the canvas by default.

The camera can be moved by changing its `x` and `y` values or by using the `camera.moveTo` function.

If you want the camera to follow a sprite, put camera movement code in the `drawFrame` function, which runs after the physics simulation.

In this example the camera follows the player's x axis movement.

# 1-0

## Camera Zoom

`zoom` changes the scale that sprites and other elements in the world are drawn at. Increasing the zoom will make sprites appear larger, and decreasing the zoom will make sprites appear smaller.

`zoomTo(target, speed)` is an async function that can be used to smoothly zoom the camera in and out. It takes an optional second parameter, the amount it will zoom per frame.

# 2-0

## Camera On & Off

By default, `allSprites.draw()` is called at the end of the q5.js draw loop, where the camera is automatically turned on. However, if you want to control when sprites and groups are drawn, you can draw them separately.

The player and environment of your game should be drawn after the camera is turned on with `camera.on()`.

UI or HUD sprites, represented by orange squares in this examples, should be drawn after the camera is turned off with `camera.off()`.

`mouse.x` stores the x position of the mouse in relation to the world, which can be larger than the canvas. `mouse.canvasPos.x` stores the x position of the mouse in relation to the canvas.

# 3-0

## Mouse Events with the Camera

None of the sprites in this example are moving! The camera is just moving left and right.

The big sprite is drawn in the world space when the camera is on. The small sprite is drawn when the camera is off.

Note that `sprite.mouse` functions still work, whether the camera is on or off.
