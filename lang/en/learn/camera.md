# 0-0

## Camera Movement

In this example the camera follows the player's x axis movement.

# 1-0

## Camera Zoom

`camera.zoom` changes the scale that sprites and other elements in the world are drawn at. Increasing the zoom will make sprites appear larger, and decreasing the zoom will make sprites appear smaller.

`camera.zoomTo(target, speed)` is an async function that can be used to smoothly zoom the camera in and out. It takes an optional second parameter, the amount it will zoom per frame.

# 2-0

## Camera On/Off

By default, `allSprites.draw()` is called at the end of the p5.js draw loop, where the camera is automatically turned on. However, if you want to control when sprites and groups are drawn, you can draw them separately.

The player and environment of your game should be drawn after `camera.on()` is called.

UI or HUD sprites, represented by orange squares in this examples, should be drawn after `camera.off()` is called.

`mouse.x` stores the x position of the mouse in relation to the world, which can be larger than the canvas. `camera.mouse.x` stores the x position of the mouse in relation to the canvas.

# 3-0

## Mouse Events with the Camera

In this example the camera is moving left and right using a sin wave.

The big sprite is drawn in the world space when the camera is on. The big sprite doesn't move, but it looks like it does because the camera is moving.

The small sprite is drawn when the camera is off. If you wanted to make a UI element in your game, like a pause button sprite, you should make it when the camera is off.
