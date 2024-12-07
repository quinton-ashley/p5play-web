# 0-0

## Joints

A joint connects the physics colliders of two sprites, limiting their movement relative to each other.

Joint constructors accept two sprites as input. At least one of the sprites in a joint must have a dynamic physics collider.

Every sprite has a `sprite.joints` array, which contains all the joints it's currently connected to.

# 0-1

## GlueJoint

Do you like crafting in Legend of Zelda: Tears of the Kingdom? Then you'll love glue joints!

A `GlueJoint` is the simplest type of joint, it just glues two sprites together. The sprites don't have to be touching and they won't un-glue unless you remove the joint.

But wait, why use a glue joint instead of `sprite.addCollider`?

- each sprite can have its own physics properties
- each sprite can detect collisions separately
- removing a joint doesn't remove the sprites

Joints can be visually hidden by setting `joint.visible` to false or removed entirely by running the `joint.remove` function.

Try gluing and un-gluing the stick and ball sprite in the code example. If you want a challenge, throw the ball straight up in the air and try to stick it to the top of the stick!

# 1-0

## DistanceJoint

By default, a `DistanceJoint` is attached at the center of each sprite that it's connected to. To shift the joint's attachment points, edit its `offsetA` and `offsetB` vectors.

Adjusting the joint's `springiness` ratio changes the amount it can stretch and compress.

`0.0` = steel rod (default)  
`0.2` = stiff spring  
`0.4` = tight spring  
`0.6` = bouncy spring  
`0.8` = slinky  
`1.0` = bungee cord

You can also adjust the joints's `damping` ratio to change how quickly it loses vibrational energy.

Set `collideConnected` to true to make connected sprites collide with each other.

# 2-0

## WheelJoint

A `WheelJoint` connects a vehicle body to a wheel. Use wheel joints to create drive-able vehicles!

Every wheel joint has a motor, which can be enabled by setting the joint's `speed` to the desired motor speed, `maxPower` to a positive value, or `motorEnabled` to true.

Disabling a wheel joint motor is like putting a car in neutral, it causes the wheel to roll freely. The joint's speed must be set to zero for the wheel to brake.

By default, wheel joints have a `maxPower` of 1000, `springiness` of 0.1, `damping` of 0.7, and angle of attachment `angle` of 90 degrees.

Try driving the car in this example! Can you make it to the end of the road? Customize the car by changing the position of its wheels and the angle at which they're attached.

# 3-0

## HingeJoint

A `HingeJoint` enables one or two sprites to rotate around the same point.

To change the point of rotation edit the joint's `offsetA` or `offsetB` vector.

Hinge joints with a small `maxPower` and default `speed` of zero apply braking force to resist being moved.

Try clicking around this example to drop small boxes on the seesaw. How many boxes can you put on the seesaw before it tips?

# 4-0

## SliderJoint

A `SliderJoint` constrains the motion of two sprites to sliding
along a common axis, without rotation.

The joint's `range` determines how far apart the connected sprites can be from each other. Changing the joint's `angle` changes the direction the sprites can slide in.

By default the joint's motor is enabled with a `speed` of 0, so `maxPower` determines how much the joint can resist sliding.

Try dropping boxes on the scale by clicking with your mouse. How many boxes can you stack on the scale before it reaches its limit? Try changing its angle too.

# 5-0

## GrabberJoint

Grab sprites and move them with a max force towards a target position using a `GrabberJoint`.

Try clicking and dragging sprites around the canvas in this example.

Note the use of `world.getSpriteAt` to get the sprite at the mouse position, if any.

Continuously set the `target` property to move the sprite towards a target position. This can be any object with x and y properties.

Remove the joint to release the sprite that was grabbed.

Try changing `maxForce` from the default value of 1000.
