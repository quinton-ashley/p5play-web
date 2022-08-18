let player, dots;

function setup() {
	createCanvas(500, 50);

	dots = new Group();
	dots.shapeColor = 'yellow';

	for (let i = 0; i < 26; i++) {
		new dots.Sprite(i * 20, 25, 10);
	}

	player = new Sprite(250, 25, 40);
	player.shapeColor = 'yellow';

	player.overlap(dots, collectDot);
}

function collectDot(player, dot) {
	dot.remove();
}

function draw() {
	clear();

	if (kb.a) player.vel.x = -3;
	else if (kb.d) player.vel.x = 3;
	else player.vel.x = 0;

	if (player.x < -50) player.x = 550;
	if (player.x > 550) player.x = -50;
}
