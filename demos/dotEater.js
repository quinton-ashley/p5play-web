let player, dots;

function setup() {
	new Canvas(500, 50);

	dots = new Group();
	dots.color = 'yellow';

	for (let i = 0; i < 26; i++) {
		new dots.Sprite(i * 20, 25, 10);
	}

	player = new Sprite(250, 25, 5);
	player.color = 'yellow';
	player.draw = () => {
		let v = round(sin(frameCount * 15)) * 30 + 30;
		arc(0, 0, 40, 40, v, 360 - v, PIE);
	};

	player.overlap(dots, collectDot);
	player.vel.x = 3;
}

function collectDot(player, dot) {
	dot.remove();
}

function draw() {
	clear();

	if (kb.pressing('left')) {
		player.vel.x = -3;
		player.mirror.x = true;
	} else if (kb.pressing('right')) {
		player.vel.x = 3;
		player.mirror.x = false;
	}

	// teleport the player
	if (player.x < -50) player.x = 550;
	if (player.x > 550) player.x = -50;
}
