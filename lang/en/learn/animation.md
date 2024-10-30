# 0-0

## How to load animations

An animation is a series of images that are displayed one after the other at a fast enough rate to give the appearance of motion.

The `loadAni`/`loadAnimation` function has three different modes: sequence, list, and sprite sheet.

In this code example, the cloud breathing animation is loaded using a numbered sequence of images given the path to the first image and the index of the last image in the sequence.

The `animation` function is similar to the q5.js `image` function. Use it inside the draw loop to display an animation at a position.

# 0-1

The `loadAni` function can also be provided a list of images.

The `ani.frameDelay` property defines how many frames an image in the animation is displayed before the next image is displayed. The default is 4. Higher values make the animation play slower. A frame delay of 1 would make the animation play as fast as possible.

Try changing the frame delay in this code example!

# 0-2

A sprite sheet is a single image that contains all the frames of an animation. `ani.spriteSheet` is displayed in the sketch so you can see what one looks like.

In sprite sheet mode, `loadAni` accepts an "atlas" [JS object](https://p5js.org/reference/p5/Object) that specifies the size of each frame and how many frames of animation there are.

This easy way to load animations requires that every frame in your sprite sheet is the same size, grid aligned, and in order from left to right, top to bottom.

# 0-3

If you want an animation to only uses specific frames from the sprite sheet, set the "frames" property of the atlas object to an array of frame indexes.

# 0-4

Another way to use `loadAni` in sprite sheet mode, is to provide an array of frame locators, arrays that specify the position and size of a frame.

When creating sprite sheets consider the tradeoff between the image space efficiency gained by tightly packing irregular sized frames together, versus the ease of loading a grid aligned sprite sheet.

Note that the animations in these examples are being lazy loaded in setup. If you really need to use an animation when your program starts, load it in the q5.js preload function instead.

# 1-0

## Animating

p5play gives you total control over your animations.

Try using your keyboard to test out some of the different ways to control animations!

# 2-0

## Sprites with Animations

The `sprite.addAni` function can add an animation to a sprite. It can also load the animation, just like `loadAni`. As an optional first input parameter, you can provide a name for the animation.

Try pressing the left mouse button. When
`sprite.debug` property is set to true you can
see the sprite's physics body collider.

# 2-1

## Control a Sprite's Animation

Use the `sprite.changeAni` function to change a sprite's animation, this function accepts an animation object or the name of a previously loaded animation.

`sprite.ani` stores the sprite's current animation, which enables access to its properties and functions like `play` and `stop`.

The `sprite.mirror` vector can be used to flip the sprite
horizontally or vertically.

Try pressing left and right to make the ghost move.

Try pressing the space bar to stop the animation.

# 3-0

## Groups with Animations

If an animation is added to a group, new group sprites will receive a copy of that animation.

Note that in this mini-example if you put splats too close together they'll move apart until their colliders are no longer overlapping. The size of the collider is taken from the size of the animation.

Try clicking the mouse to add new splats!

# 4-0

## Sprite Sheets with Multiple Animations

To load multiple animations from the same sprite sheet image, first set the `spriteSheet` property of the sprite or group.

Next, use the `addAnimations` / `addAnis` function, which accepts an object that uses animation names as keys and atlas objects as values.

In the "hero" example the size of the hero sprite is set to 32x32 pixels in the `Sprite` constructor. The sprite's size is used as a multiplier to row and col (column) values.

The `ani.offset` property is used to adjust the position of an animation relative to the sprite's position.

Click this link to see the full [questKid](/learn/assets/questKid.webp) sprite sheet used in the example.

# 4-1

## anis

Every sprite and group has an `animations` / `anis` object that stores its animations. The keys are animation names and values are animation objects. It works like groups do, utilizing soft and dynamic inheritance.

When `sprite.pixelPerfect` is set to true, the sprite will be drawn at integer coordinates, while retaining the precise position of its collider. This is useful for pixel art games!

# 5-0

## Animation Sequencing

`sprite.changeAni` can accept an animation object, animation name, or array of animation names that will be played in sequence.

By default if looping is enabled, the last animation in the sequence will be looped. To loop the entire sequence, use `'**'` as the last animation name. If instead you want the sequence to stop at the end, use `';;'` as the last animation name.

This code example shows how the hero character can be moved around the screen using WASD or the arrow keys!

# 6-0

## Advanced Animation Sequencing

`sprite.changeAni` is an async function, you can use it to wait for animations to finish playing. It's particularly useful for scripted animation sequences for [NPCs](https://en.wikipedia.org/wiki/Non-player_character).

In this code example, the hero character is practicing their sword wielding skills.
