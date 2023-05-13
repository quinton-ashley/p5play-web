let blocker, catcher, items;

function setup() {
	new Canvas(500, 800);
	world.gravity.y = 5;

	// netcode.connect('ws://localhost:8080');
	// netcode.player = 1;

	blocker = new Sprite(250, 100, 40, 'k');
	blocker.color = 'green';

	catcher = new Sprite(250, 600, 80, 'k');
	catcher.color = 'blue';

	items = new Group();
	items.color = 'orange';
	items.customProp = 'hello';

	catcher.overlaps(items, (a, item) => {
		item.remove();
	});
}

function draw() {
	clear();

	if (frameCount % 30 == 0) {
		new items.Sprite(random(0, canvas.w), -100, 15, 15);
	}

	blocker.moveTowards(inputs[0].mouse);

	catcher.moveTowards(inputs[1]?.mouse);

	items.cull(200);

	// let bin = netcode.spriteToBinary(blocker);
	// log(bin);
}
