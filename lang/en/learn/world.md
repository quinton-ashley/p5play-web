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

The `world.timeScale` ratio is set to 1 by default for real time physics simulation. Set it lower for slow motion. Make it 0 to pause time!

Note that the Box2D physics engine solver is only stable up to a time scale of 2. If you want to advance the simulation by a larger amount of time, run the `world.physicsUpdate` function multiple times.

Click the canvas in the example to make the physics simulation progress in slow motion, 1/4th real time. The Matrix bullet time effect is achieved by making the background of each frame slightly transparent.

`world.realTime` stores how many real time seconds have elapsed since the start of the world, including pauses.

`world.physicsTime` stores how many seconds have elapsed in the physics simulation.

# 2-0

## Performance Testing

Set `p5play.renderStats` to true to display the number of sprites drawn, display rate, and FPS calculations. For more comprehensive results, use your web browser's performance testing tools.

FPS in this context refers to how many frames per second your computer can generate, not including the delay between when frames are actually shown on the screen. The higher the FPS, the better your game is performing.

Having less sprites and using a smaller canvas will make your game perform better. For better performance, don't use the q5.js `clear` function or sample the colors of pixels in your canvas using `canvas.get`.

By default the Box2D physics engine performs 8 velocity iterations `world.velocityIterations` and 3 position iterations `world.positionIterations`. Decreasing these values will make the simulation faster but also less accurate.

I've tested p5play in every web browser and found that Google Chrome performs the best.
