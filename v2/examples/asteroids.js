// Asteroids clone

let bullets, asteroids, ship, shipImage, bulletImage, particleImage, gameOverFrame;
let MARGIN = 40;

function preload() {
	// it's best to load images in the p5.js preload function
	bulletImage = loadImage('assets/asteroids_bullet.png');
	shipImage = loadImage('assets/asteroids_ship0001.png');
	particleImage = loadImage('assets/asteroids_particle.png');
	asteroidImages = [];
	for (let i = 0; i < 3; i++) {
		asteroidImages.push(loadImage('assets/asteroid' + i + '.png'));
	}
}

function setup() {
	createCanvas(800, 600);
	startNewGame();
}

function startNewGame() {
	ship = createSprite(width / 2, height / 2);
	ship.maxSpeed = 6;
	ship.friction = 0.02;
	ship.setCollider('circle', 0, 0, 20);
	ship.addImage('normal', shipImage);
	ship.addAnimation('thrust', 'assets/asteroids_ship0002.png', 'assets/asteroids_ship0007.png');

	lasers = new Group();

	asteroids = new Group();
	for (let i = 0; i < 8; i++) {
		let ang = random(360);
		let px = width / 2 + 1000 * cos(radians(ang));
		let py = height / 2 + 1000 * sin(radians(ang));
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
		if (s.position.x < -MARGIN) s.position.x = width + MARGIN;
		if (s.position.x > width + MARGIN) s.position.x = -MARGIN;
		if (s.position.y < -MARGIN) s.position.y = height + MARGIN;
		if (s.position.y > height + MARGIN) s.position.y = -MARGIN;
	}

	asteroids.overlap(lasers, asteroidHit);

	asteroids.overlap(ship, () => {
		text('Game Over!', width / 2, height / 2);
		if (!gameOverFrame) {
			spriteUpdate = false;
			gameOverFrame = frameCount;
		}
		if (frameCount >= gameOverFrame + 60) {
			allSprites.removeSprites();
			startNewGame();
			spriteUpdate = true;
		}
	});

	if (keyDown('a')) ship.rotation -= 4;
	if (keyDown('d')) ship.rotation += 4;
	if (keyDown('w')) {
		ship.addSpeed(0.2, ship.rotation);
		ship.changeAnimation('thrust');
	} else {
		ship.changeAnimation('normal');
	}

	if (keyWentDown('k')) {
		let bullet = createSprite(ship.position.x, ship.position.y);
		bullet.addImage(bulletImage);
		bullet.setSpeed(10 + ship.getSpeed(), ship.rotation);
		bullet.life = 30;
		lasers.add(bullet);
	}

	if (!asteroids.length) text('You won!', width / 2, height / 2);

	drawSprites();
}

class Asteroid extends Sprite {
	constructor(type, x, y) {
		super(x, y); // call the Sprite constructor
	}
}

function createAsteroid(type, x, y) {
	let a = createSprite(x, y);
	let imgNum = round(random(0, 2));
	a.addImage(asteroidImages[imgNum]);
	a.setSpeed(2.5 - type / 2, random(360));
	a.rotationSpeed = 0.5;
	//a.debug = true; // uncomment to see the colliders
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
