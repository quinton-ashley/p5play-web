let boxes, cursor;

function setup() {
	new Canvas(800, 400);

	boxes = new Group();
	boxes.w = 40;
	boxes.h = 40;
	boxes.rotationDrag = 1;

	for (let i = 0; i < 3; i++) {
		let box = new boxes.Sprite(random(width), random(height));
		box.draw = () => {
			fill(0);
			rect(0, 0, 40, 40);
			fill(255);
			text(i, 10, 10);
		};
		box.drag = box.mass;
	}
	cursor = 0;
}

function draw() {
	background(220);

	text('Controlling box #' + cursor + '. Click the mouse to change!', 10, 20);

	boxes[cursor].moveTowards(mouse);

	boxes.cull(0, (box) => {
		if (box == boxes[cursor]) return;
		box.moveTo(width * 0.5, height * 0.5);
	});

	if (mouse.presses()) {
		cursor = cursor >= boxes.length - 1 ? 0 : cursor + 1;
	}
}
