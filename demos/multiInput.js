// keyboard events
// capturing key presses and mouse buttons once
// press x and z or mouse left and right

let asterisk, ghost, platform;

function setup() {
	new Canvas(800, 400);
	world.gravity.y = 10;

	ghost = new Sprite(600, 200, 'kinematic');
	ghost.addAni('assets/ghost_spin0001.png', 3);

	asterisk = new Sprite(200, 200, 64);
	asterisk.addAni('assets/asterisk_normal0001.png', 3);
	asterisk.addAni('stretch', 'assets/asterisk_stretching0001.png', 8);

	asterisk.jump = function () {
		asterisk.ani = 'stretch';
		asterisk.ani.rewind();
		asterisk.vel.y = -5;
	};

	platform = new Sprite(200, 300, 'static');
	platform.addAni('assets/small_platform0001.png', 3);
}

function draw() {
	background(255);

	fill(200);
	textAlign(CENTER);
	text('Press x and z', width / 2, 20);

	if (asterisk.collides(platform)) {
		asterisk.ani = 'default';
	}

	if (kb.presses('x') || mouse.presses('left')) {
		asterisk.jump();
	}

	if (kb.pressing('z') || mouse.pressing('right')) {
		ghost.rotationSpeed = 4;
	}

	if (kb.holding('z') || mouse.holding('right')) {
		ghost.rotationSpeed = -7;
	}

	if (kb.released('z') || mouse.released('right')) {
		ghost.rotationSpeed = 0;
	}
}
