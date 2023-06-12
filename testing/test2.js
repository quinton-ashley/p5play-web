let blocker, catcher, items, time;

let turn = 0;
let score0 = 0;
let score1 = 0;

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
		if (turn == 0) score0++;
		else score1++;
		item.remove();
	});

	textSize(48);

	startGame();
}

async function startGame() {
	for (let round = 0; round <= 1; round++) {
		// item spawner
		for (time = 30; time > 0; time--) {
			await delay(1000);
			new items.Sprite(random(0, canvas.w), -100, 15, 15);
		}

		if (turn == 0) turn = 1;
		else turn = 0;
	}
}

function draw() {
	clear();

	fill(200);
	text(time, 10, 40);

	if (turn == 0) {
		// player 0's turn!
		text(score0, 400, 40);
		blocker.moveTowards(inputs[0].mouse);
		catcher.moveTowards(inputs[1]?.mouse);
	} else {
		// player 1's turn!
		text(score1, 400, 40);
		blocker.moveTowards(inputs[1]?.mouse);
		catcher.moveTowards(inputs[0].mouse);
	}

	items.cull(200);

	// let bin = netcode.spriteToBinary(blocker);
	// log(bin);
}
