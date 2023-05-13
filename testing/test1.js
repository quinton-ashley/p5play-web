let ghost;

function preload() {
	ghost = new Sprite(250, 100, 60, 140, 'd');
	ghost.addAni('fly', '../learn/assets/ghost_walk01.png', 3);
	ghost.addAni('idle', '../learn/assets/ghost_standing01.png', 7);
	ghost.debug = true;
}

function setup() {
	new Canvas(500, 200);

	let bin = netcode.spriteToBinary(ghost);
	log(bin);

	// ghost.remove();
	// ghost = null;

	ghost = netcode.binaryToSprite(bin);
	log(ghost);

	bin = netcode.spriteToBinary(ghost);
	log(bin);

	bin = netcode.spriteToBinary(ghost);
	log(bin);
}

function draw() {
	clear();
}
