let player, gems;

function setup() {
	createCanvas(160, 456);

	gems = new Group();
	gems.diameter = 10;
	gems.x = () => random(0, width);
	gems.y = () => random(0, height);
	gems.amount = 20;

	player = new Sprite();

	// player.overlapping(gems, collect);
}

// function collect(player, gem) {
// 	player.shapeColor = gem.shapeColor;
// }

function draw() {
	clear();
	if (player.overlapping(gems)) {
		player.shapeColor = '#f00';
	} else {
		player.shapeColor = '#0f0';
	}
	player.moveTowards(mouse.x, mouse.y);
}
