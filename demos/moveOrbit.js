let blocks, dots, bounds;

function setup() {
	new Canvas(800, 800);

	blocks = new Group();
	blocks.color = 'yellow';
	blocks.rotationLock = true;

	let sym = 360 / 6;
	for (let i = 0; i < 160; i++) {
		let angle = sym * i - i * 2;
		let dist = 360 - i * 2;
		let x = sin(angle) * dist + 400;
		let y = cos(angle) * dist + 400;
		let h = 30 - i * 0.14;
		let block = new blocks.Sprite(x, y, 10, h);
		block.rotation = angle;
	}
}

function draw() {
	clear();

	// BUG!
	// blocks.moveTowards(mouse.x, mouse.y);
	blocks.orbit(0.5);
}
