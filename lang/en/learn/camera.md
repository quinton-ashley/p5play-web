# 0-0

## Camera

In this example the camera follows the player's x axis movement.

# 1-0

## Camera On/Off

By default, `allSprites.draw()` is called at the end of the p5.js draw loop. However, if you want to control when sprites and groups are drawn, you can draw them separately.

The player and environment of your game should be drawn with the camera on.

UI or HUD sprites, represented by orange squares in this examples, should be drawn when the camera is off.

`camera.zoom` can be used to zoom the camera in and out.

`camera.zoomTo(target, speed)` is an async function that can be used to smoothly zoom the camera in and out. It takes an optional second parameter, the amount it will zoom per frame.

`mouse.x` stores the x position of the mouse in relation to the world, which can be larger than the canvas. `camera.mouse.x` stores the x position of the mouse in relation to the canvas.

# 2-0

## Mouse Events with the Camera

In this example the camera is move left and right using a sin wave.

The big sprite is drawn in the world space when the camera is on. The big sprite doesn't move, but it looks like it does because the camera is moving.

The small sprite is drawn when the camera is off in the screen space (UI). If you wanted to make a UI element in your game, like a pause button sprite, you should make it when the camera is off.
