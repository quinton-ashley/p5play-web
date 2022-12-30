let tumbler, x, y, sides, len, angle;

function setup() {
	new Canvas(800, 400);
	world.gravity.y = 10;

	x = width * 0.5;
	y = height * 0.5;
	sides = 5;
	len = height / sides;
	angle = 360 / sides;

	let s = [len, angle, len, -angle, len, angle, sides];
	tumbler = new Sprite(x, y, s, 'kinematic');
	tumbler.rotationSpeed = 0.5;

	allSprites.remove(tumbler);
}

function draw() {
	clear();
	text('Click to add items to the tumbler', 20, 20);

	push();
	strokeWeight(8);
	strokeJoin(ROUND);
	stroke('#ed225d');
	tumbler.draw();
	pop();

	allSprites.draw();
}

function dropSprite() {
	len = (height * random(0.1, 0.3)) / sides;
	let penta = new Sprite(mouse.x, mouse.y, [len, angle, sides]);
	penta.color = '#c0eeff';
}

function mousePressed() {
	dropSprite();
}
