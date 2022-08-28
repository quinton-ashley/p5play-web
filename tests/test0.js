let s0, s1, s2;

function setup() {
	createCanvas(200, 200);

	s0 = new Sprite(100, 100, 20, 20);
	s0.shapeColor = 'blue';
	s1 = new Sprite(40, 40, 10, 10);
	s1.shapeColor = 'red';
	s2 = new Sprite(40, 80, 10, 10);
	s2.shapeColor = 'green';

	s1.overlap(s0, () => {
		log('hi!');
	});

	s0.scale = 2;
	s1.scale = 2;
}

function draw() {
	clear();

	s0.moveTowards(mouse.x, mouse.y);
}
