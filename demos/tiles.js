let world, player, tileSize, logo;
let gridSize = 32;

function setup() {
	createCanvas(384, 200);

	allSprites.tileSize = 32;
	allSprites.rotationLock = true;

	player = new Sprite(1, 1);

	new Sprite(4, 5);
	new Sprite(3, 2);
	new Sprite(6, 0);
}

function draw() {
	background(100);
	fill(100);
	for (let i = 0; i < width / gridSize; i++) {
		for (let j = 0; j < height / gridSize; j++) {
			rect(i * gridSize, j * gridSize, gridSize, gridSize);
		}
	}
}

function keyPressed() {
	if (key == 'w') {
		player.move('up');
	}
	if (key == 's') {
		player.move('down');
	}
	if (key == 'a') {
		player.move('left');
	}
	if (key == 'd') {
		player.move('right');
	}
}

function mousePressed() {
	console.log(getSpriteAt(mouse.x, mouse.y));
}
