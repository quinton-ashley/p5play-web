let player, blocks;
let gridSize = 32;

function setup() {
	new Canvas(384, 200);

	allSprites.tileSize = gridSize;
	allSprites.rotationLock = true;

	player = new Sprite(1, 1);
	player.color = 'red';

	blocks = new Group();
	new blocks.Sprite(4, 5);
	new blocks.Sprite(3, 2);
	new blocks.Sprite(6, 0);

	player.collides(blocks, (player, block) => {
		block.move(player.heading);
	});
	blocks.collides(blocks, (b, block) => {
		block.move(player.heading);
	});
}

function draw() {
	background(100);
	fill(100);
	for (let i = 0; i < width / gridSize; i++) {
		for (let j = 0; j < height / gridSize; j++) {
			rect(i * gridSize, j * gridSize, gridSize, gridSize);
		}
	}

	if (kb.presses('w')) {
		player.move('up');
	}
	if (kb.presses('s')) {
		player.move('down');
	}
	if (kb.presses('a')) {
		player.move('left');
	}
	if (kb.presses('d')) {
		player.move('right');
	}
}
