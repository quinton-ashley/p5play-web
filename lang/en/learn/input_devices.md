# 0-0

## Input Devices

Here are the input devices available in p5play:

- `kb` or `keyboard` for the keyboard
- `mouse` for the mouse
- `contro` or `controllers` for game controllers

These input devices all use the same simple functions for getting the state of an input: `presses`, `pressing`, and `released`.

They also store the state of all their inputs as properties. For example, `kb.space` stores how many frames the user has been pressing the space key. It gets reset when the user releases the input.

# 1-0

## Keyboard

In PC games the WASD keys are commonly used to control the player character's movement. In p5play you can use the direction names 'up', 'down', 'left', and 'right' to detect WASD key and arrow key presses.

If you want to use WASD and the arrow keys seperately you can use these key names to detect arrow key presses: 'ArrowUp', 'ArrowDown', 'ArrowLeft' and 'ArrowRight'.
Using the IJKL keys for movement is common to support left handed players or second players in local two player games. These keys can be referenced using: 'up2', 'down2', 'left2', and 'right2'.
Some keyboards don't start with QWERTY on the top row. p5play maps other keyboard layouts to the standard English QWERTY layout. For example, the WASD keys for French AZERTY keyboard users are ZQSD. This can be disabled by setting `p5play.standardizeKeyboard` to false. [More info](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)

# 2-0

## Multi-Input

This mini-sketch shows how one action can be performed by either pressing the space key or clicking the mouse. The default mouse input is 'left' for the left mouse button or normal click.

# 3-0

## Sprite Mouse

Sprites with physics colliders have their own mouse object for detecting mouse inputs on the sprite.
`sprite.mouse` objects are just like the `mouse` input object, except they have additional functions.

`hovers` and `hovering` detect when the user moves the mouse over a sprite.

`dragging` detects when the user clicks and holds a mouse button on the sprite while moving the mouse.
Note that `mouse.x` is the x position of the mouse on the canvas and `sprite.mouse.x` is the x position of the mouse relative to the sprite.

# 4-0

## Game Controllers

The `contro` or `controllers` object provides the input state of game controller buttons:

"a", "b", "x", "y", "l" (left bumper), "r" (right bumper), "lt" (left trigger), "rt" (right trigger), "up", "down", "left", "right" (dpad), "start", and "select"

It also provides the `x` and `y` axis positions of the analog sticks: `leftStick` and `rightStick`. The axis values range between -1 and 1, where 0 is the center.

The `contro` object is also an array that contains all the connected game controllers detected by your web browser. Access connected controllers by index. For example, `contro[0]` and `contro[1]` are the first and second controllers. By default `contro` references `contro[0]`.

Try it out! Press any button on your connected game controller for it to be detected by p5play.

# 5-0

## Touch

Example coming soon!
