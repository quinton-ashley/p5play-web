let player, players, obstacles, nodes, lines, goals, startTimer;

let dark = 0;
let light = 220;

// night mode
dark = 220;
light = 0;

let shouldConnectLines = true;

function setup() {
	createCanvas('16:9'); // create the largest 16:9 canvas possible

	world.gravity.y = 10;

	obstacles = new Group();
	obstacles.collider = 'static';
	obstacles.shapeColor = dark;
	obstacles.w = width * 0.02;
	obstacles.h = height * 0.12;

	goals = new Group();
	goals.collider = 'static';
	goals.shapeColor = 'green';
	goals.diameter = width * 0.016;

	p5play.chainOrigin = 'start';
	p5play.chainPoints = 'absolute';
	lines = new Group();
	lines.collider = 'static';
	lines.friction = 0;
	lines.life = 200;

	nodes = new Group();
	nodes.collider = 'none';
	nodes.diameter = width * 0.006;
	nodes.life = 200;

	players = new Group();
	players.collider = 'static';
	players.diameter = width * 0.016;
	players.shapeColor = 200;

	players.collide(obstacles, reset);

	players.overlap(goals, (player, goal) => {
		goal.remove();
		if (!goals.length) win();
	});

	startNewGame();
}

function startNewGame() {
	let start, end;
	while (
		!start ||
		end[1] < start[1] ||
		((10 * end[0] - 10 * start[0]) ** 2 + (10 * end[1] - 10 * start[1]) ** 2) / 10 < 8 ||
		abs(end[0] - start[0]) < 0.5
	) {
		start = [random(0.05, 0.95), random(0.05, 0.15)];
		end = [random(0.06, 0.95), random(0.06, 0.95)];
	}

	players.x = () => start[0] * width;
	players.y = () => start[1] * height;

	goals.coords = [];

	{
		let x = random(min(start[0], end[0]) + 0.05, max(start[0], end[0]) - 0.05);
		let y = random(0.05, 0.95);
		goals.coords.push([x * width, y * height]);
	}

	goals.coords.push([end[0] * width, end[1] * height]);

	for (let i = 0; i < 10; i++) {
		let x = random(min(start[0], end[0]) + 0.05, max(start[0], end[0]) - 0.05);
		let y = random(0.05, 0.95);
		new obstacles.Sprite(x * width, y * height);
	}

	reset();
}

function reset() {
	players.remove();
	lines.remove();
	nodes.remove();
	goals.remove();

	player = new players.Sprite();

	for (let coord of goals.coords) {
		new goals.Sprite(coord[0], coord[1]);
	}

	startTimer = 200;
}

function draw() {
	background(light);
	fill(dark);
	stroke(dark);

	startTimer--;

	if (startTimer > 0) {
		player.shapeColor = startTimer + 100;
	} else {
		player.collider = 'dynamic';
	}

	if (player.y - player.h * 2 > height) {
		reset();
	}

	if (mouse.pressed('left')) {
		let lastNode;
		if (nodes.length) lastNode = nodes[nodes.length - 1];
		if (!nodes.length || !(lastNode.x == mouse.x && lastNode.y == mouse.y)) {
			new nodes.Sprite(mouse.x, mouse.y);
			if (nodes.length > 1 && shouldConnectLines) {
				let coords = [[lastNode.x, lastNode.y]];
				new lines.Sprite(mouse.x, mouse.y, coords);
			}
			shouldConnectLines = true;
		}
	}
	if (kb.pressed(' ') || mouse.pressed('right')) {
		shouldConnectLines = false;
	}
	if (kb.pressed('f')) {
		lines.remove();
		nodes.remove();
	}
}

function win() {
	allSprites.remove();
	startNewGame();
}
