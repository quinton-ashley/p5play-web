## spriteArt

```js
let img = spriteArt(txt, scale, palette);
```

Returns the p5.js image object created.

- `txt` should be a string that only contains valid color letters and newlines
- `scale` (optional) scale of the image
- `palette` (optional) a color palette object that overrides the default QuintOS color palette

Here's the c64's color palette for example of proper palette formatting:

```js
{
  ' ': '',
  '.': '',
  k: '#000000', // blacK
  d: '#626252', // Dark-gray
  m: '#898989', // Mid-gray
  l: '#adadad', // Light-gray
  w: '#ffffff', // White
  c: '#cb7e75', // Coral
  r: '#9f4e44', // Red
  n: '#6d5412', // browN
  o: '#a1683c', // Orange
  y: '#c9d487', // Yellow
  e: '#9ae29b', // light grEEn
  g: '#5cab5e', // Green
  t: '#6abfc6', // Teal
  b: '#50459b', // Blue
  i: '#887ecb', // Indigo
  p: '#a057a3' // Purple
}
```

## colorPal

```js
colorPal(c, palette);
```

Returns a hex color string to use with p5.js functions like background, fill, and stroke.

- `c` is the color letter
- `palette` (optional) defaults to the system's default palette

## keyIsDown

```js
keyIsDown(keyName);
```

Checks if a key is being held.

- `keyName` a string containing the simple name of the key

'Alt', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'CapsLock', 'Clear', 'Control', 'Delete', 'Escape', 'Insert', 'PageDown', 'PageUp', 'Shift', 'Tab'

## play

```js
await play(sound);
```

Plays a p5.sound object. Returns a Promise which is fulfilled when the sound finishes playing.
