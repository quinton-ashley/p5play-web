let g0, g1, s2;

function setup() {
	createCanvas(200, 200);

	g0 = new Group();
	g0.shapeColor = 'blue';
	new g0.Sprite(100, 100, 20, 20);

	g1 = new Group();
	new g1.Sprite(40, 40, 10, 10);
	g1.shapeColor = 'red';

	s2 = new Sprite(40, 80, 10, 10);
	s2.shapeColor = 'green';

	g0.overlap(g1, () => {
		log('hi!');
	});

	g0.scale = 2;
	g1.scale = 2;
}

function draw() {
	clear();

	g0.moveTowards(mouse.x, mouse.y);
}
