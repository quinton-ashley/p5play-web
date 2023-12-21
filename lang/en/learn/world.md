# 0-0

## World

Each instance of p5play has its own `world` object, that can be used to control the Box2D physics simulation. Its most important property is `gravity`, which has x and y components.

Note that the physics simulation is deterministic. That means if you run the same code twice, unless you're using random values, you'll get the same result!

# 0-1

## Sleeping

`world.allowSleeping` is true by default.

A sprite starts "sleeping" when it stops moving and doesn't collide with anything new. "Sleeping" sprites get ignored during physics simulation, which usually prevents the Box2D physics engine solver from having to make unnecessary calculations. While this is good for performance, sometimes it can cause problems.

You can wake up a sleeping sprite by setting `sprite.sleeping` to false. You can also disable sleeping on a per sprite basis by setting `sprite.allowSleeping` to false.

# 1-0

## Controlling Time

By default, after each time the p5.js draw function is run, p5play calls three functions in this order:

- `allSprites.draw()` : draws all sprites
- `world.step()` : progresses the physics simulation
- `allSprites.update()` : updates animations and mouse events

But you can also take manual control of these processes by calling them yourself.

# 1-1

## world.step

The `world.step` function calculates the positions and velocities of all sprites after progressing the physics simulation by 1/60th of a second by default.

Set `world.autoStep = false` to disable automatic stepping, in effect pausing time! Then you can call `world.step` manually when you want to progress the physics simulation. Only run it after all sprites have been drawn.

This mini example shows how a time step can be provided as an input parameter, but note that the Box2D physics engine solver is only stable up to a time step of 1/30th of a second. If you want to advance the simulation by a larger amount of time, call `world.step` multiple times.

# 2-0

## Performance Testing

The `renderStats` function displays the number of sprites drawn and FPS approximations. For more accurate results, use your web browser's performance testing tools.

FPS in this context refers to how many frames per second your computer can generate, not including the delay between when frames are actually shown on the screen. The higher the FPS, the better your game is performing.

Having less sprites and using a smaller canvas will make your game perform better. For better performance, don't use the p5.js `clear` function or sample the colors of pixels in your canvas using `canvas.get`.

By default the Box2D physics engine performs 8 velocity and 3 position iterations on each `world.step`. Decreasing these values will make the simulation faster but also less accurate.

I've tested p5play in every web browser and found that Google Chrome performs the best.
