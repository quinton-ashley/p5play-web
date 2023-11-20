# 0-0

## What is a Group?

In p5play a Group is a collection of and blueprint for sprites with similar traits and behaviors. For example the dots in Pac-Man!

The `group.length` property can be used to check how many sprites are in a group. In this example the while loop condition is true as long as the dots group has less than 24 sprites.

In the mini example, `new dots.Sprite` creates a sprite that inherits the dots group's color, y position, and diameter. Each dot is assigned a unique x position.

I call this "soft inheritance" because a group acts as a blueprint for new group sprites.

# 0-1

You can access a sprite in a group by index because groups are arrays. You can use any of the standard JavaScript array methods on a group.

# 0-2

Setting a group's property to a different value will affect all the sprites in the group! I call this "dynamic inheritance".

# 0-3

Using movement functions like `moveTowards` on a group, will cause all the sprites in a group to move.

# 1-0

## Arrow function property setters

In p5play, when you set a sprite property in a group to an arrow function, each new sprite created using that group will use the function to evaluate the property.

When `group.amount` gets adjusted, the group will automatically create or remove sprites to match the set amount.

In this mini example, each gem sprite is assigned a random position.

# 1-1

## Indexed arrow function setters

Arrow setters can even use the sprite's index in the group!

The index, `i`, is given as an input parameter to the group's arrow setters. It can be used to calculate the new group sprite's properties.

# 2-0

## Collisions and Overlaps

Collision and overlap functions aren't just for detecting events between two sprites. You can also check for collisions and overlaps between sprites and groups or between groups. The functions are:

`collides`, `colliding`, `collided`  
`overlaps`, `overlapping`, `overlapped`

Instead of using these functions in `if` statements, you can provide them with a callback function as a second parameter. The callback function will run when the collision or overlap event occurs. The callback function receives, as inputs, two sprites.

In this mini example the callback function receives the player sprite and the gem sprite in the gems group that the player overlaps. That gem gets collected (removed).

# 3-0

## allSprites Group

p5play creates an `allSprites` group that contains all the sprites in a sketch.

# 4-0

## Custom Properties

You can add your own properties to sprites and groups, just like with any other JavaScript object!

Also when you add custom properties to a group, they will be inherited by new group sprites. You can even use arrow functions as property setters.

# 5-0

## Sub Groups

In this mini example there are two sub groups of the `boxes` group: `smallBoxes` and `bigBoxes`.

New sprites created using the `bigBoxes` group will inherit traits from the `boxes` group but not from the `smallBoxes` groups.

The `boxes` group contains all the sprites in the `smallBoxes` and `bigBoxes` groups.

The `remove` function removes the group itself, only use it if you don't want to use the group again. If you just want to remove all the sprites from a group, use the `removeAll` function.

# 6-0

## Culling

By default, sprites are removed when they go 10000 pixels offscreen relative to the camera's position. This is to prevent the world from getting too big, which would slow down the physics simulation.

To change this, set `allSprites.autoCull = false`. Use the `cull` function to set a different cull boundary, and note that it can even cull sprites that don't have a physics collider.

An optional last parameter can be used to specify a callback function that will be called when a sprite is culled. The default response to culling is to remove the sprite that exited the cull boundary, but by setting your own function you can do something else. The callback function receives the sprite that was culled and a total count of how many sprites were culled on that frame. Note that in this example, the amount of balls decreases if more than one ball is culled in one frame.

# 6-1

## life

Another way to limit how long a sprite exists is to set its `life` property, which is the number of frames that the sprite exists for. When the sprite's life is up, it will be removed. This is useful for creating temporary objects like projectiles and force fields.

Try out this little game! Click the mouse to create a beach ball and try keeping it in the air with the water stream.
