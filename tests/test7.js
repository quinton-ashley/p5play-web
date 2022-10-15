let ball, floor;

function setup() {
	createCanvas(242, 200);
	world.gravity.y = 10;

	ball = new Sprite();
	ball.diameter = 50;
	ball.y = 30;

	floor = new Sprite();
	floor.collider = 'kinematic';
	floor.y = 190;
	floor.w = 400;
	floor.h = 5;
}

function draw() {
	clear();
	if (kb.presses('x')) {
		floor.w = mouse.x;
	}
	if (kb.presses('r')) {
		floor.rotation += 2;
	}
}
