# 0-0

## Tiles

For the original Super Mario Bros. lead developer, Shigeru Miyamoto, and level designer, Takashi Tezuka, [used graph paper to plot out the levels](https://www.youtube.com/watch?v=DLoRd6_a1CI) and then had their team of programmers type the coordinates of every sprite in the game. That's a lot of work!

Fortunately for you, in p5play the `Tiles` constructor can make sprites on a grid based on the positions of characters in a string!

The first input parameter is a string or array of strings, each line or string in the array representing a row of tiles.

The second and third input parameters are the x and y coordinates of the top left (first) tile in the tiles grid.

The fourth and fifth input parameters are the width and height respectively of each tile and any spacing you might want to add between tiles.

## Try it out!

Try editing the "P5" brick layout.

Note that spaces " " or periods "." are used to indicate that no sprites should be made at that position on the tiles grid. In this example, the "=" character is used for `bricks`.

# 1-0

## Tile coordinates

You can change the pixel value that coordinate positions represent from the default of 1 by setting `sprite.tileSize` or `group.tileSize`.

If tile size is 8, then an x/y position of 1 represents 8 pixels, 2 represents 16 pixels, 3 represents 24 pixels, etc. It can make loading animations easier!

In this mini-example, moving a sprite 1 tile causes it to move 32 pixels. Grid lines are drawn to visually illustrate the tile size.

With just two collision rules, the player can push around the blocks and blocks can push each other. Although this example would benefit from input buffering to ensure the player completes a move before starting another.
