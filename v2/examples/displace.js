let boxes, cursor;

function setup() {
	createCanvas(800, 400);

	boxes = new Group();

	for (let i = 0; i < 3; i++) {
		let box = new Sprite(random(width), random(height), 40, 40);
		box.fixedRotation = true;
		box.draw = () => {
			fill(0);
			rect(0, 0, 40, 40);
			fill(255);
			text(i, 10, 10);
		};
		box.drag = box.mass;
		boxes.add(box);
	}
	cursor = 0;
}

function draw() {
	background(220);

	text(cursor, 10, 20);

	boxes[cursor].moveTowards(mouseX, mouseY, 0.1);

	boxes.cull(0, (box) => {
		if (box == boxes[cursor]) return;
		box.moveTo(width * 0.5, height * 0.5);
	});

	drawSprites();
}

function mousePressed() {
	cursor = cursor >= boxes.length - 1 ? 0 : cursor + 1;
}
