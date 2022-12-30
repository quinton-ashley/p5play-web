// mouse events on sprites while using the camera
// rollover sprites to trigger mouse events

let s1, s2;

function setup() {
	new Canvas(800, 400);

	s1 = new Sprite(width / 2, height / 2, 100, 100);

	s2 = new Sprite(30, 30, 20, 20);
}

function draw() {
	background(255);

	camera.on();

	// camera pans left and right
	camera.x = sin(frameCount) * 300 + 400;

	if (s1.mouse.hovering()) {
		s1.color = '#ff0000';
	} else {
		s1.color = '#224477';
	}

	if (s1.mouse.presses()) {
		s1.rotation += 10;
	}
	if (s1.mouse.presses('right')) {
		s1.rotation -= 10;
	}

	s1.draw();

	camera.off();

	// camera is off - this sprite is drawn in the screen space like a UI

	if (s2.mouse.hovering()) {
		s2.color = '#ff0000';
	} else {
		s2.color = '#224477';
	}

	if (s2.mouse.presses()) {
		s2.rotation += 10;
	}
	if (s2.mouse.presses('right')) {
		s2.rotation -= 10;
	}

	s2.draw();
}
