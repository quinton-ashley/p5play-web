let sprite1, sprite2, sprite3;

function setup() {
	new Canvas();
	world.gravity.y = 10;

	sprite1 = new Sprite(500, 100, 'static');
	sprite2 = new Sprite(500, 300);
	// sprite3 = new Sprite(0, 100);

	sprite1.addJoint(sprite2, 'revolute', { motorSpeed: 60 });
	// sprite1.addJoint(sprite3);
}

function draw() {
	clear();

	// updateSprites(1 / 240);
}
