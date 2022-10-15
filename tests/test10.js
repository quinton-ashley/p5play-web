let player, pillar;

function setup() {
	createCanvas(60, 480);
	world.gravity.y = 10;

	pillar = new Sprite(30, 480, 30, 720, 'static');

	player = new Sprite(30, 0, 50);

	player.collides(pillar, () => {
		if (player.vel.y < -0.9) pillar.h -= 52;
		log(pillar.h);
	});
}

function draw() {
	clear();
	if (mouse.presses()) player.vel.y = -5;
	// if (player.collides(pillar)) {
	// 	if (player.vel.y < -0.9) pillar.h -= 52;
	// }
}
