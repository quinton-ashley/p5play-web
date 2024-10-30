# 0-0

## Setup and Draw

The code inside the [q5.js](https://q5js.org) (or [p5.js](https://p5js.org)) `setup` function runs when the program starts. The `new Canvas()` constructor creates a section of the screen that the program can draw on.

The q5 `draw` function is run 60 times per second by default. The `background` function can be used to fill the canvas with a color each time it is drawn.

Try changing the width and height of the canvas (the numbers inside the `Canvas` constructor), then restart the example program!

# 0-1

## What is a sprite?

A sprite is a ghost!

Video game developers use the word "sprite" to refer to characters, items, or anything else that moves above a background.

The `new Sprite()` constructor creates a sprite object, which contains variables that define a sprite’s position, size, and appearance.

Try editing the properties of the box and circle sprites in the code examples below!

# 0-2

## Try it!

Try turning the sprite named `ball` into a blue circle with a diameter of 30 and place it at the top right corner of the canvas.

# 1-0

## Sprite physics

A sprite's collider is used to detect collisions with other
sprites. By default, sprites have a `'dynamic'` physics
collider that allows the sprite to move freely and be affected by
gravity.

`'static'` colliders can't be moved. `'kinematic'` colliders can be moved
programmatically but not by other sprites. They also won't collide with other kinematic colliders. Setting a sprite's collider
type to `'none'` makes it have no collider.

The collider type can also be set using the first letter of the collider type name: `'d'`, `'s'`, `'k'`, or `'n'`.

Click the reload icon on the top right corner of a code example to replay it!

# 1-1

## Try it!

Try creating a sprite named `peg` with a static collider and circle shape. Create a sprite `block` with a dynamic collider and box shape. Position the block so that it hits the peg and falls to the right.

Each time the q5 `draw` function finishes, sprites are automatically drawn and updated. Note that `world` is created when p5play loads but by default there's no gravity. Try setting `world.gravity.y` to a positive number.

For an extra challenge, try resetting the block to its original position after it falls.

# 2-0

## Sprites with an Image

`sprite.image` (aka `sprite.img`) can be set to a Q5.Image or a url path to an image file.

If you need an image to be loaded before your program starts, it's best to use [`loadImage`](https://p5js.org/reference/p5/loadImage) inside the q5 `preload` function.

`sprite.image.offset` can be used to offset the image relative to the sprite's center. This can help better align the image with the sprite's physics collider.

`sprite.image.scale` changes the display size of the sprite's image. The default is 1.0. If the image appears way too big or small, you should probably change the size of the image file itself.

Try clicking on the canvas of this example. When the `sprite.debug` property is set to true you can see the sprite's physics body collider.

# 2-1

## Emoji Sprites

No images? 🫥 No problem! 😄

You can use any emoji as the image for your sprite.

The size of the emoji image will be based on the sprite's size. Great for quick prototyping! 🧪

# 2-2

## Pixel Art

You can use the `spriteArt` function to create pixel art images for your sprites. It takes a string as input and returns an image. Each character in the string represents the color value of a pixel in the image.

The second input parameter to the `spriteArt` function is the scale of the image.

# 2-3

## Try it!

Try making your own pixel art! Take a look at the alphabet below to see what color each letter represents by default.

# 2-4

## Custom Colors

You can also make pixel art that uses custom colors by creating a color palette and passing it as the third parameter to the `spriteArt` function.

Color palettes in p5play must be provided in [JavaScript Object literal](https://p5js.org/reference/p5/Object) format. A simple JS object is like a dictionary. You can define a color for each letter you use in your pixel art. To create a color use the q5 [`color`](https://p5js.org/reference/p5/color) function which accepts RGB (red, green, blue) values or HEX color codes.

The easiest way to find colors is to use a [color picker](https://www.google.com/search?q=google+color+picker).

# 3-0

## Sprite movement

Moving a sprite by directly editing its (x, y) coordinates will teleport it to the new position, without moving it through intermediate positions.

Try clicking around this code example.

# 3-1

If you want a sprite to physically interact with other sprites while it's moving, don't teleport it!

This bad example shows what happens if a sprite is teleported every time the q5.js draw function renders a frame.

# 3-2

All the other movement methods on this page change the sprite's `velocity`, aka `vel`, which is its rate of motion along the x and y axis.

`vel` is Q5.Vector, you can use any vector functions on it.

Restart this example to see the player sprite hit the block!

# 3-3

Yet, you may find it's more convenient to move a sprite by setting its `direction` and `speed`.

You can also set a sprite's direction using an angle value or direction name such as: 'up', 'down', 'left', 'right', 'upLeft', 'upRight', 'downLeft', 'downRight'.

# 3-4

The `move` function moves a sprite across a fixed distance. The direction and speed of the movement can be specified as parameters to the function or set separately, like in the previous example.

# 3-5

The `moveTowards` function moves a sprite towards a position, at a percentage of the distance to that position.

In this example, the player moves 10% of the distance to the mouse on every q5 `draw` call. Its speed, and the force it exerts on the block, is proportional to the distance it moves.

# 3-6

The `moveTo` function generates an impulse that moves a sprite to a position at a constant speed.

But note that if the sprite is acted on by a force like gravity or bumps into another sprite, its speed and direction will be affected and it may not reach the target position.

Any movement function that accepts an object with x and y properties could instead be called with (x, y) position numbers.

# 3-7

Hopefully the examples on this page helped you understand some of the sprite movement options available in p5play!

But, note that the `move`, `moveTo`, and `moveTowards` functions are imperative, they override a sprite's current motion, forcing it to move in a new direction. That may not always be what you want! Read the page on advanced sprite movement to learn how to move a sprite with respect to other forces acting on it, such as gravity.

# 4-0

## Create Sprites faster

Inside the Sprite constructor, `new Sprite()`, you can specify the sprite's position, size, and collider type.

As you saw on the previous Sprite reference pages, you don't need to add any inputs to the Sprite constructor to create a sprite. But, if you do want to set a sprite's size in the constructor you'll need to specify its position first.

By default, if no inputs are given to the Sprite constructor, a new sprite is positioned at the center of the canvas, with a width and height of 50 pixels, and a dynamic collider.

# 4-1

## Try it!

Try creating two sprites using the sprite constructor.

# 5-0

## Collisions

To check for collisions use these functions inside the q5 `draw` function.

On the first frame that a sprite collides with another sprite, the `collides` function returns true.

While a sprite is colliding with another sprite, the `colliding` function returns the number of frames the collision has occurred for.

On the first frame after two sprites collided, the `collided` function returns true.

# 6-0

## Overlaps

Sprites collide by default but they can also overlap!

By default sprites are drawn in the order they were created in.

# 6-1

## Layer

You can change the draw order by editing a sprite's `.layer` property. Sprites with higher layer values get drawn on top of sprites with lower layer values.

# 6-2

For detecting overlaps, use these functions inside the q5 `draw` function.

On the first frame that a sprite overlaps with another sprite, the `overlaps` function returns true.

While a sprite is overlapping with another sprite, the `overlapping` function returns the number of frames the overlap has occurred for.

On the first frame after two sprites overlapped, the `overlapped` function returns true.

Note that physical interactions between sprites, including collisions and overlaps, can't be properly detected when a
sprite is teleported, its position is directly changed!

The `remove` function deletes a sprite.

# 6-3

## Try it!

Try making the blue sprite change to red only if it's overlapping with the red sprite.

# 6-4

## Switch between overlaps and collides

When you set an overlap relationship between two sprites, they will no longer collide, but you can make them have a collision relationship again by using a collision function.

In this example, pressing the space key temporarily allows the player to ghost through the wall.

# 7-0

## Sprite rotation

Directly changing the `rotation` property of a sprite will teleport it to the specified rotation angle.

Don't teleport a sprite if you want it to physically interact with other sprites while it's rotating!

# 7-1

All of the other rotation methods on this page work by changing the sprite's `rotationSpeed`.

# 7-2

Use the `rotate` function to rotate a sprite by an amount.

Rotation speed can be defined separately or as an optional second parameter.

# 7-3

Use the `rotateTo` function to rotate a sprite to an angle or to face a position. The `rotateMinTo` function changes the sign of the sprite's rotation speed if needed to rotate the sprite the minimum angular distance to face the destination angle. The "facing" angle, an optional third parameter, is the angle that the sprite should be at when facing the target position.

Try changing the facing angle from 0 to 90 in the code example. Then when you click, the long side of the sprite will rotate to face the mouse.

# 7-4

Use the `rotateTowards` function to rotate a sprite towards an angle or towards facing a position.

The optional second parameter is the tracking speed, a percent of the distance the sprite moves on each frame to the target rotation angle, 0.1 (10%) by default.

# 7-5

Use the `offset` property to move the sprite's physics body relative to its center.

When `sprite.debug` is true, the center of the sprite is marked with a small green crosshair. The center point is where the sprite's x and y coordinates are located. It is also the center of rotation.

# 8-0

## Scaling

Changing `sprite.scale` will scale the sprite's collider and visual appearance by the specified amount.

Press a number key to see the sprite scale uniformly by that amount.

Click your mouse or touch tap to double the sprite's scale.

Press "x" or "y" to scale the sprite in that direction by a random amount. But note that if the sprite gets scaled unevenly, the image will get distorted and stay that way even when scaled uniformly again.

# 9-0

## Physical attributes

Sprites have physical attributes that affect how they interact with the world. Take a look at the code examples to see these attributes in action.

# 9-1

## Mass

The larger the sprite, the more mass it has by default. When a sprite's size is initially defined, its `mass` will be calculated.

But in the real world, stretching or squishing an object doesn't change its mass, so in p5play changing a sprite's size doesn't change its mass either. To recalculate a sprite's mass after changing its size, use the `resetMass` function.

# 9-2

## Try it!

This code example shows how sprites of different sizes can balance on a seesaw if their mass is set to the same value. Try changing the mass of one of the sprites.

# 9-3

## planck

p5play uses planck.js, a JS port of the Box2D physics engine. It generates realistic looking interactions at a good rate of performance, but it also has some limitations you should be aware of.

In this code example the ball has a `bounciness` of 1, so each time the ball bounces it should return to its starting position. However, due to a bug in planck, the ball bounces incrementally higher each time it hits the ground.

# 9-4

This full bounce interaction is impossible in real life, but could be an important element in a video game.

The `bounciness` bug is most noticeable when a collider bounces off a flat surface, like in these examples.

Here's a workaround that overrides the ball's y velocity after it collides with the ground.

# 9-5

In this example the block's color is red when it is colliding with the moving platform. Although you might expect the block to stay red while being lifted by the platform, it blinks between red and blue.

In real life when a person gets on an elevator and it rises, we would say that person was colliding with the elevator floor.

In planck however, when a collider is displaced by another collider, they constantly collide and separate from each other.

If you're trying to make a platformer game, `colliding` is not a reliable way to check if a sprite is standing on a platform. Check out my [platformer demo](https://openprocessing.org/sketch/1869796).

# 10-0

## Advanced Movement

`move` functions are imperative, they override a sprite's velocities. But what if you want a sprite to respect other forces acting on it, such as gravity?

A bearing is the direction that needs to be followed to reach a destination. Changing a sprite's bearing won't imperatively change its movement direction.

Use `applyForce` with one input parameter, the amount of force, to have the force be applied at the sprite's `bearing` angle.

In this example, the drone has to overcome the force of gravity to fly. Make the drone fly, then let it fall, when upward force is applied to the drone again it'll gradually stop falling and start to fly!

# 10-1

The `applyForceScaled` function multiplies the force applied to the sprite by its mass.

You can use this function to give sprites their own gravity!

Both force functions can accept force as separate x and y components or as an amount, provided you set the sprite's `bearing`.

By default, force is applied to the sprite's center of mass. But the force functions can also accept a last input parameter, a position object with x and y properties that specifies the relative position of where force will be applied on the sprite.

# 10-2

Use the `attractTo` function to attract the sprite to a position by applying force. The position can be given as an object with x and y properties or as separate x and y parameters.

This example shows an electron orbiting the nucleus of an atom. (Note this visualization isn't realistic based on current scientific understanding, but it looks cool!)

Note that the advanced movement functions shown on this page will not wake [sleeping sprites](./world.html)!

# 10-3

Torque is the force that causes rotation. Use `applyTorque` to non-imperatively affect the sprite's rotation.

In this example, the robot rolls slower going uphill than it does going downhill.

# 11-0

## Chain Colliders

There are three different chain modes: vertex, distance, and line.

To use vertex mode, provide the Sprite constructor with an array of vertex arrays. Each vertex array should contain \[x, y\] coordinates. In these code examples the sprite's (x, y) position is highlighted by a small black square.

Try changing the vertexes of the chain sprite in the code example to make the ball stay on the floor!

# 11-1

To use distance mode, provide the Sprite constructor an (x, y) position and an array of distance arrays. These arrays should contain \[x, y\] distances relative to the previous vertex. The (x, y) position will be the first vertex in the chain.

Distance mode is best for creating super long chains.

Try adding 5 distances to make the ground roll up and down on a rocky ground chain.

# 11-2

To use line mode, provide the Sprite constructor an (x,y) position and a list of line lengths and angles. Each angle is relative to the previous line's angle.

It's best to use line mode for small and/or symmetrical chains.

Note that the line mode chain's (x, y) position is located at the average of all its vertices, which may not be a point on the chain.

Try changing the lengths of these lines and their angles!

# 12-0

## Polygon Colliders

Regular polygons can be created by providing the Sprite constructor with a side length and the name of the polygon.

Here are the names you can use: triangle, square, pentagon, hexagon, septagon, octagon, enneagon, decagon, hendecagon, and dodecagon.

# 12-1

If the start and end of a chain is at the same point and the resulting shape is convex, it automatically becomes a polygon!

# 12-2

You can force a convex polygon to be a chain by setting `sprite.shape = 'chain'`

# 12-3

Any polygon or chain with a closed shape is center positioned.

# 12-4

Here's the code for making a regular star with five points.

Note that because the star is a concave shape it can't have a polygon collider.

# 12-5

Now you can see how the tumbler demo on the p5play homepage was made!

Closed chains are empty on the inside and they can act as a container for many smaller sprites.

# 12-6

Note that closed chain colliders aren't so good at being dynamic colliders.

This is a limitation of the Box2D physics engine that p5play uses. See the "Combo Colliders" page to learn how to create concave colliders from multiple convex colliders.

# 13-0

## Combo Colliders

By using the `addCollider` function you can add multiple colliders to a sprite. It supports the same input arguments as the Sprite constructor, except the first two parameters are x and y offsets from the sprite's position.

But only use this feature when it's really necessary for gameplay! Usually if something requires a lot of colliders, like the walls of a maze, you should just create multiple sprites, each with their own collider. Also, even if a sprite's image is complex, typically a box or circle will be just fine for physics interactions, especially for small sprites.

Yet sometimes, you will truly need to create a sprite with multiple colliders. For example, if you want to model a pinball flipper!

Note that adding a collider to a sprite will automatically recalculate the sprite's mass.

# 13-1

## Combo Sensors

Overlap sensors determine if a sprite overlaps with another sprite.

By default when an overlap checking method is used, and the sprite has no sensors, the `addDefaultSensors` function is used behind the scenes to create sensors for each of the sprite's colliders.

You can add additional sensors to a sprite by using the `addSensor` function.

# 14-0

## Custom Draw

Sometimes you won't be able to use pre-drawn animations to get the kind of visual effect you want for a sprite in motion.

Fortunately, you can customize the sprite's `draw` function to make it display anything you want!

Note that inside the sprite's draw function the center of the sprite is translated to position (0, 0).

This code example rotates the sprite's ellipse to the direction it's moving and makes the ellipse stretch in that direction proportional to its speed. Kind of complicated!

# 14-1

## Custom Update

A sprite's `update` function runs at the end of the q5 `draw` loop by default. It updates the sprite's animation (if it has one) and mouse event tracking.

Thanks to some behind the scenes magic, overriding the function will not replace the default behavior, but allows you to add to it.

# 15-0

## Movement Sequencing

These examples use a `Turtle` sprite which is green and shaped like a triangle for that classic turtle programming look. Unlike regular sprites, the turtle's direction is always the same as its rotation.

You can use the `await` keyword inside an `async` function to wait for a movement to finish before continuing with the next movement. This is useful for making a sprite move in a sequence.

The `delay` function can be used to wait for a specified number of milliseconds. 1000 milliseconds is equal to 1 second!

# 15-1

The `move`, `moveTo`, `rotate`, and `rotateTo` functions all return a `Promise` that resolves to true when the movement is finished.

But, if the sprite's movement is interrupted by a new movement or a collision that significantly changes the sprite's trajectory, the promise will resolve to false.

# 15-2

If you want a sprite to follow another sprite, you may be tempted to use `moveTo` repeatedly, without waiting for the sprite to reach its destination. But for better performance, try using the `angleTo` function, which gets the angle between a sprite and a position. This angle can be used to change the direction that the sprite moves in.

In this example, the q5 [`dist`](https://p5js.org/reference/p5/dist) function is used to calculate the distance between the player and its ally.
