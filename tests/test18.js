let block, floor;

function setup() {
	let can = new Canvas(60, 342);
	log(can);
	world.gravity.y = 10;

	block = new Sprite(30, 30);
	floor = new Sprite(30, 300, 60, 5, 'static');
}

function draw() {
	clear();
	if (block.collided(floor)) {
		floor.collider = 'dynamic';
	}
}
