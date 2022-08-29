let player, gems;

function setup() {
	createCanvas(160, 456);

	gems = new Group();
	gems.diameter = 10;
	gems.x = () => random(0, width);
	gems.y = () => random(0, height);
	gems.amount = 80;

	player = new Sprite();

	player.overlap(gems, collect);
}

function collect(player, gem) {
	gem.remove();
}

function draw() {
	clear();
	player.moveTowards(mouse.x, mouse.y);
}
