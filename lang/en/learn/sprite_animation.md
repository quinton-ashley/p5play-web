# 0-0

## How to load animations

An animation is a series of images that are displayed one after the other at a fast enough rate to give the appearance of motion.

The `loadAni` function has a three different modes: sequence, list, and sprite sheet.

In this mini example, the cloud breathing animation is loaded using a numbered sequence of images given the path to the first image and the index of the last image in the sequence.

The `animation` function is similar to the p5.js `image` function. Use it in the p5.js draw function to display an animation at a position.

# 0-1

In this mini example the `loadAnimation` function is given a list of images.

The `ani.frameDelay` property defines how many frames an image in the animation is displayed before the next image is displayed. The default is 4. Higher values make the animation play slower. A frame delay of 1 would make the animation play as fast as possible.

Try it out! Try changing the frameDelay in this mini-example.

# 0-2

This mini example loads an animation from a sprite sheet, which is a single image that contains all the frames of an animation. Take a look at the sprite sheet in this sketch which is displayed just so you can see what one looks like.

In sprite sheet mode, an atlas object can be used to specify the size of each frame and how many frames of animation there are.

If you really need to use an animation when your program starts, you should load it in the p5.js preload function instead of setup.

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

Next, use the `addAnimations` / `addAnis` function. They accept an object that uses animation names as keys and sprite sheet atlases as values.

Using an atlas object is way easier than manually specifying the coordinates of every frame!

Atlas objects can have the following properties:

`x`, `y`, `pos`, `w`/`width`, `h`/`height`, `size`/`frameSize`, `row`, `col`, `frames`/`frameCount`, `delay`/`frameDelay`, and `rotation`.

In the "hero" example the size of the hero sprite is set to 32x32 pixels in the `Sprite` constructor. That size is used as a multiplier to the row value given.

Click this link to see the full [questKid](assets/questKid.png) sprite sheet used in the example.

If you'd like to truly appreciate how good p5play is, try comparing the code from my example to [this Phaser demo](https://labs.phaser.io/view.html?src=src/animation/create%20animation%20from%20sprite%20sheet.js). Ha!

I recommend making every frame in an animation the same size and putting them in order from left to right. If not you'll need to manually specify the position of each frame, which can be done using an array of coordinates instead of an atlas object.

# 4-1

## anis

Every sprite and group has an `animations` / `anis` object that stores its animations. The keys are animation names and values are animation objects. It works like groups do, utilizing soft and dynamic inheritance.

The `ani.offset` property is used to adjust the position of an animation relative to the sprite's position.

When `sprite.pixelPerfect` is set to true, the sprite will be drawn at integer coordinates, while retaining the precise position of its collider. This is useful for pixel art games!

# 5-0

## Animation Sequencing

`sprite.changeAni` can be accept an animation object, animation name, or array of animation names that will be played in sequence.

By default if looping is enabled, the last animation in the sequence will be looped. To loop the entire sequence, use `'**'` as the last animation name. If instead you want the sequence to stop at the end, use `';;'` as the last animation name.

This example shows how the hero character can be moved around the screen using WASD or the arrow keys!

# 6-0

## Advanced Animation Sequencing

`sprite.changeAni` is an async function, you can use it to wait for animations to finish playing.

Example coming soon!
