# 0-0

## World

Each instance of p5play has its own `world` object, that can be used to control the physics simulation.

The most important property of this object is `gravity`, which has x and y components.

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
- `allSprites.update()` : updates sprite.ani and sprite.mouse

But you can also take manual control of these processes by calling them yourself.

In the mini-example, try pressing space to toggle slow-motion!

## sprite.draw and group.draw

You can use the `sprite.draw` and `group.draw` functions to manually control when individual sprites and groups are drawn inside the p5.js draw loop. Any sprites not drawn manually will be automatically drawn at the end of the p5.js draw loop unless the sprite's autoDraw property is set to false directly or by one of its parent groups. To prevent automatic drawing completely set `allSprites.autoDraw = false`.

Note that you will have to manually turn the camera on and off if you want to use it with manually drawn sprites.

# 1-1

## world.step

`world.step` checks for collisions and calculates the positions and velocities of all sprites after progressing the physics simulation by 1/60th of a second by default. Sprites can't be progressed forward in time individually.

Before you use `world.step` in your p5.js draw function, be sure to draw all the sprites. Otherwise, they will be drawn in the wrong position!

Set `world.autoStep = false` to disable automatic stepping. Then you can call `world.step` manually whenever you want to progress the physics simulation.

# 1-2

## sprite.update and group.update

What does `sprite.update` do? It's responsible for updating the sprite's animation and mouse events. It also runs the user's custom update function if they set any. To prevent automatic updating completely set `allSprites.autoUpdate = false`.

Why is this functionality separated from the world step? Because on a pause screen the physics world could be paused, but pause menu UI animations and mouse events could still be updated.
