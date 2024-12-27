# 0-0

## Tiles

The `Tiles` constructor creates sprites based on the positions of "tile" characters in a string. It accepts:

- a string or array of strings, each line or string in the array representing a row of tiles
- x and y coordinates of the first (top left) tile
- horizontal and vertical spacing between tiles

Note that spaces or periods are used to indicate that no sprites should be made at that position on the tiles grid.

The constructor returns a `Group` that contains all the sprites it created. Use `group.removeAll()` to remove all the sprites from this group before resetting a level or loading a new one.

# 0-1

## Try it!

Try editing the tile layout in this example, the "=" character is used for `bricks`.

# 0-2

Wanna break some bricks? [➡️ breakout demo](https://openprocessing.org/sketch/1867957).

# 0-3

## Did you know?

The developers of Super Mario Bros. [used graph paper to plot out levels](https://www.youtube.com/watch?v=DLoRd6_a1CI) and then had their team of programmers type the coordinates of every sprite in the game. That's a lot of work!

Check out this [➡️ platformer demo](https://openprocessing.org/sketch/1869796) that uses `Tiles` to create a level.
