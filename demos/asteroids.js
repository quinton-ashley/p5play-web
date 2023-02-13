// Asteroids clone

let asteroids, ship, lasers, particles, gameOverFrame;
let MARGIN = 40;

function preload() {
	ship = new Sprite(0, 0, 20);
	ship.addImg('assets/asteroids_ship0001.png');
	ship.addAni('thrust', 'assets/asteroids_ship0002.png', 7);
	ship.rotationDrag = 1;

	lasers = new Group();
	lasers.addImg('assets/asteroids_bullet.png');

	particles = new Group();
	particles.addImg('assets/asteroids_particle.png');

	asteroids = new Group();
	for (let i = 0; i < 3; i++) {
		asteroids.addImg('a' + i, 'assets/asteroid' + i + '.png');
	}
}

function setup() {
	new Canvas(800, 800);

	ship.overlaps(lasers);
	asteroids.collides(lasers, asteroidHit);
	asteroids.overlaps(ship, gameOver);

	startNewGame();
}

function startNewGame() {
	ship.x = width / 2;
	ship.y = height / 2;

	for (let i = 0; i < 8; i++) {
		let ang = random(360);
		let px = width / 2 + 1000 * cos(ang);
		let py = height / 2 + 1000 * sin(ang);
		createAsteroid(3, px, py);
	}
	gameOverFrame = 0;
}

function draw() {
	background(0);
	fill(255);
	textAlign(CENTER);
	text('Controls: WAS Keys + K to shoot', width / 2, 20);

	for (let s of allSprites) {
		if (s.x < -MARGIN) s.x = width + MARGIN;
		if (s.x > width + MARGIN) s.x = -MARGIN;
		if (s.y < -MARGIN) s.y = height + MARGIN;
		if (s.y > height + MARGIN) s.y = -MARGIN;
	}

	if (kb.pressing('left')) ship.rotation -= 5;
	if (kb.pressing('right')) ship.rotation += 5;
	if (kb.pressing('up')) {
		ship.addSpeed(0.2, ship.rotation);
		ship.ani = 'thrust';
	} else {
		ship.ani = 'default';
	}

	if (kb.presses('k')) {
		let laser = new lasers.Sprite(ship.x, ship.y);
		laser.direction = ship.rotation;
		laser.speed = ship.speed + 10;
		laser.life = 30;
	}

	if (!asteroids.length) text('You won!', width / 2, height / 2);

	allSprites.debug = mouse.pressing();
}

function createAsteroid(type, x, y) {
	let a = new asteroids.Sprite(x, y, 90);
	let imgNum = round(random(0, 2));
	a.ani = 'a' + imgNum;
	a.direction = random(360);
	a.speed = 2.5 - type / 2;
	a.rotationSpeed = random(-1, 1);
	//a.debug = true; // uncomment to see the colliders
	a.type = type;
	if (type == 2) a.scale = 0.6;
	if (type == 1) a.scale = 0.3;
	a.mass = 2 + 0.3 * type;
	return a;
}

function asteroidHit(asteroid, bullet) {
	let newType = asteroid.type - 1;

	if (newType > 0) {
		createAsteroid(newType, asteroid.x, asteroid.y);
		createAsteroid(newType, asteroid.x, asteroid.y);
	}
	for (let i = 0; i < 10; i++) {
		// bullet shards particle effect
		let p = new particles.Sprite(bullet.x, bullet.y);
		p.direction = random(360);
		p.speed = random(3, 5);
		p.life = 15;
	}
	bullet.remove();
	asteroid.remove();
}

function gameOver() {
	text('Game Over!', width / 2, height / 2);

	if (frameCount >= gameOverFrame + 60) {
		asteroids.removeAll();
		lasers.removeAll();
		startNewGame();
	}

	if (!gameOverFrame) {
		gameOverFrame = frameCount;
	} else {
		updateSprites();
	}
}
