let player, pillar;

function setup() {
	createCanvas(60, 362);
	world.gravity.y = 10;

	pillar = new Sprite(30, 362, 30, 500, 'static');
	player = new Sprite(30, 0, 50);
	player.bounciness = 0.4;
}

function draw() {
	clear();

	if (mouse.presses()) player.vel.y = -5;
	else if (player.collided(pillar)) {
		pillar.h -= 52;
	}
}
