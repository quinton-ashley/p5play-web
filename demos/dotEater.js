let player, dots;

function setup() {
	createCanvas(500, 50);

	dots = new Group();
	dots.shapeColor = 'yellow';

	for (let i = 0; i < 26; i++) {
		new dots.Sprite(i * 20, 25, 10);
	}

	player = new Sprite(250, 25, 5);
	player.shapeColor = 'yellow';
	player.draw = () => {
		let v = round(sin(frameCount * 15)) * 30 + 30;
		arc(0, 0, 40, 40, v, 360 - v, PIE);
	};

	player.overlap(dots, collectDot);
}

function collectDot(player, dot) {
	dot.remove();
}

function draw() {
	clear();

	// move the player left/right with your keyboard
	if (kb.pressing('a')) {
		player.vel.x = -3;
		player.mirror.x = true;
	} else if (kb.pressing('d')) {
		player.vel.x = 3;
		player.mirror.x = false;
	} else player.vel.x = 0;

	// teleport the player
	if (player.x < -50) player.x = 550;
	if (player.x > 550) player.x = -50;
}
