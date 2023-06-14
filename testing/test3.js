function setup() {
	new Canvas(400, 900);
	world.gravity.y = 10;

	s = new Sprite(200, 0);
	s.debug = true;
}

function draw() {
	background(0);

	// s.applyForce((mouse.x - s.x) * 0.01, (mouse.y - s.y) * 0.01);
	s.applyForce(cos(frameCount), sin(frameCount));

	// if (kb.presses('left')) {
	// 	s.applyForce(-100, 0);
	// }

	// if (kb.presses('left')) {
	// 	s.move(5, 'left', 5);
	// }
	// if (kb.presses('right')) {
	// 	s.move(5, 'right', 5);
	// }

	// s.moveTowards(mouse);

	// s.applyForce(cos(frameCount), sin(frameCount));

	if (mouse.pressing()) {
		s.applyForce(0, -20);
	}

	log(round(s.vel.y));
}
