# 0-0

## Input Devices

Here are the input devices available in p5play:

- `kb` / `keyboard` for the keyboard
- `mouse` for the mouse
- `contro` / `controllers` for game controllers
- `touches` for touch screen inputs

These input devices all use the same simple functions for getting the state of an input: `presses`, `pressing`, and `released`.

Input devices also store the state of all their inputs as properties. For example, `kb.space` stores how many frames the user has been pressing the space key. It gets reset when the user releases the input.

# 0-1

p5play makes it easy to trigger the same action via different input devices using [boolean logic](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR).

In the mini-example, the sprite turns green if you press the space key or click the mouse.

# 1-0

## Keyboard

`kb` tracks nearly every key on the keyboard, including 'enter', 'backspace', and 'control'.

Note that letter input is not case sensitive. To check if a user is pressing shift use: `kb.pressing('shift')`.

Since the WASD keys are commonly used to control the player character's movement, you can use the direction names 'up', 'down', 'left', and 'right' to detect WASD and arrow key presses.

Arrow keys can also be detected separately using 'arrowUp', 'arrowDown', 'arrowLeft', and 'arrowRight'.

In local two player games it's common for the second player to use the IJKL keys for movement. These keys can be referenced using 'up2', 'down2', 'left2', and 'right2'.

[Using a non-QWERTY keyboard?](https://github.com/quinton-ashley/p5play/wiki/FAQ#is-p5plays-kb-input-system-compatible-with-non-qwerty-keyboards)

# 2-0

## Mouse

The default mouse input is the 'left' button, a one finger click on trackpads. You can also use 'right' (two finger click) and 'center'.

`mouse.x` and `mouse.y` store the position of the mouse in the world, based on the camera's position.

`mouse.canvasPos` stores the absolute position of the mouse on the canvas.

`mouse.visible` is a boolean that determines whether the mouse is visible or not.

`mouse.cursor` can be set to a [cursor style](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor). The default is 'default', other options include 'grab', 'move', 'pointer', and 'wait'.

# 3-0

## Sprite Mouse

Sprites with physics colliders have their own mouse object for detecting mouse inputs on the sprite.
`sprite.mouse` objects are just like the `mouse` input object, except they have additional functions.

`hovers` and `hovering` detect when the user moves the mouse over a sprite.

`dragging` detects when the user clicks and holds a mouse button on the sprite while moving the mouse.

Note that `mouse.x` is the x position of the mouse on the canvas and `sprite.mouse.x` is the x position of the mouse relative to the sprite.

# 4-0

## Game Controllers

The `contro` object provides the input state of game controller buttons:

`a`, `b`, `x`, `y`, `l` (left bumper), `r` (right bumper), `lt` (left trigger), `rt` (right trigger), `up`, `down`, `left`, `right` (D-pad), `lsb` (left stick button), `rsb` (right stick button), `start`, and `select`

`contro.leftStick` and `contro.rightStick` represent the positions of the analog sticks as objects with x and y properties. These values range from -1 to 1, with 0 indicating the center position.

Some controllers have analog triggers, and their positions are stored as numbers ranging from 0 to 1 in `contro.leftTrigger` and `contro.rightTrigger`.

The `contro` object (aka `controllers`) is an array that contains all the connected game controllers detected by your web browser. Access connected controllers by index. For example, `contro[0]` and `contro[1]` are the first and second controllers. Through JS magic, `contro` can be used to get the input states of `contro[0]`.

# 4-1

Try it out! Connect a game controller and press any button on it for it to be detected by p5play.

➡️ [full demo](https://openprocessing.org/sketch/2120550)

# 5-0

## Touch

Every touch screen interaction generates a touch object that's added to the `touches` array.

Each touch has its own functions for detecting pressing and dragging input states.

`touch.x` and `touch.y` store the position of the touch in the world, based on the camera's position.

`touch.canvasPos` stores the absolute position of the touch on the canvas.

`touch.id` is a unique number that identifies the touch.

`touch.duration` stores how many frames the touch has been active.

The frame after a touch ends, its touch object is removed from the `touches` array. `touches[0]` is mapped to the `mouse`.

In the touches demo, tap the screen to create boxes and drag to throw them around!
