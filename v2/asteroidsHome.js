//asteroid clone (core mechanics only)
//arrow keys to move + x to shoot

let bullets;
let asteroids;
let ship;
let shipImage, bulletImage, particleImage;
let MARGIN = 40;

function setup() {
	let canv = createCanvas(windowWidth, windowHeight);
	canv.parent('bgCanvas');

	bulletImage = loadImage('images/asteroids_bullet.png');
	shipImage = loadImage('images/asteroids_ship0001.png');
	particleImage = loadImage('images/asteroids_particle.png');

	ship = createSprite(width / 2, height / 2);
	ship.maxSpeed = 6;
	ship.friction = 0.02;
	ship.setCollider('circle', 0, 0, 20);

	ship.addImage('normal', shipImage);
	ship.addAnimation('thrust', 'images/asteroids_ship0002.png', 'images/asteroids_ship0007.png');

	asteroids = new Group();
	bullets = new Group();

	for (let i = 0; i < 8; i++) {
		let ang = random(360);
		let px = width / 2 + 1000 * cos(radians(ang));
		let py = height / 2 + 1000 * sin(radians(ang));
		createAsteroid(3, px, py);
	}
}

function draw() {
	//background(0);
	clear();
	fill(254, 190, 190);
	textAlign(RIGHT);
	textSize(12);
	text('W + A + D keys to move. K to shoot', width - 30, 30);

	for (let i = 0; i < allSprites.length; i++) {
		let s = allSprites[i];
		if (s.position.x < -MARGIN) s.position.x = width + MARGIN;
		if (s.position.x > width + MARGIN) s.position.x = -MARGIN;
		if (s.position.y < -MARGIN) s.position.y = height + MARGIN;
		if (s.position.y > height + MARGIN) s.position.y = -MARGIN;
	}

	asteroids.overlap(bullets, asteroidHit);

	ship.bounce(asteroids);

	if (keyDown('A')) ship.rotation -= 4;
	if (keyDown('D')) ship.rotation += 4;
	if (keyDown('W')) {
		ship.addSpeed(0.2, ship.rotation);
		ship.changeAnimation('thrust');
	} else ship.changeAnimation('normal');

	if (keyWentDown('k')) {
		let bullet = createSprite(ship.position.x, ship.position.y);
		bullet.addImage(bulletImage);
		bullet.setSpeed(10 + ship.getSpeed(), ship.rotation);
		bullet.life = 30;
		bullets.add(bullet);
	}

	drawSprites();
}

function createAsteroid(type, x, y) {
	let a = createSprite(x, y);
	let img = loadImage('images/asteroid' + floor(random(0, 3)) + '.png');
	a.addImage(img);
	a.setSpeed(2.5 - type / 2, random(360));
	a.rotationSpeed = 0.5;
	//a.debug = true;
	a.type = type;

	if (type == 2) a.scale = 0.6;
	if (type == 1) a.scale = 0.3;

	a.mass = 2 + a.scale;
	a.setCollider('circle', 0, 0, 50);
	asteroids.add(a);
	return a;
}

function asteroidHit(asteroid, bullet) {
	let newType = asteroid.type - 1;

	if (newType > 0) {
		createAsteroid(newType, asteroid.position.x, asteroid.position.y);
		createAsteroid(newType, asteroid.position.x, asteroid.position.y);
	}

	for (let i = 0; i < 10; i++) {
		let p = createSprite(bullet.position.x, bullet.position.y);
		p.addImage(particleImage);
		p.setSpeed(random(3, 5), random(360));
		p.friction = 0.05;
		p.life = 15;
	}

	bullet.remove();
	asteroid.remove();
}
