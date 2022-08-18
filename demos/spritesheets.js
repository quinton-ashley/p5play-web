// Creating sprite using sprite sheets for animation

let mouse_moved = false;
let touch_started = false;
let tiles, explosion, player;

function preload() {
	width = 800;
	height = 400;

	world.gravity.y = 10;

	// Create the Player sprite and add it's animations
	player = new Sprite(70, 200, 70, 94);
	player.spriteSheet = loadImage('assets/player_spritesheet.png');
	player.addImg('walk', [
		[0, 0],
		[71, 0],
		[142, 0],
		[0, 95],
		[71, 95],
		[142, 95],
		[213, 0],
		[284, 0],
		[213, 95],
		[355, 0],
		[284, 95]
	]);
	player.addImg('stand', [284, 95]);
	player.addAni('jump', [
		[66, 190],
		[422, 95]
	]);
	player.ani.frameDelay = 16;
	player.ani.looping = false;

	player.layer = 2;
	player.rotationLock = true;
	player.autoResetAnimations = true;

	loadJSON('assets/tiles.json', (tileFrames) => {
		// Load tiles sprite sheet from frames array once frames array is ready
		tiles = new Group();
		tiles.collider = 'static';
		tiles.layer = 1;
		tiles.w = 70;
		tiles.h = 70;
		tiles.spriteSheet = loadImage('assets/tiles_spritesheet.png');
		// Load the frame data for the tiles
		tiles.addAnis(tileFrames);
		// Draw the ground tiles
		for (let i = 0; i < 10; i++) {
			if (i % 2 == 0) continue;
			new tiles.Sprite('castle', i * 70, 365);
		}

		// Draw the sign tiles
		new tiles.Sprite('signExit', 630, 295, 'none');
		new tiles.Sprite('signRight', 210, 295, 'none');
	});
}

function setup() {
	createCanvas(800, 400);

	// makes the sprite's collider smaller
	player.w = 20;
}

function draw() {
	background(0);

	if (player.ani.name == 'jump' && player.ani.frame != 0 && player.y > 280) {
		player.ani = 'walk';
	}

	if (keyIsDown('a')) {
		player.vel.x = -2;
	} else if (keyIsDown('d')) {
		player.vel.x = 2;
	} else {
		player.vel.x = 0;
	}

	if (player.ani.name == 'walk' && abs(player.vel.x) < 0.1 && (player.ani.frame == 11 || player.ani.frame == 6)) {
		player.ani = 'stand';
	}

	allSprites.debug = mouse.pressing();
}

function keyPressed() {
	if (key == 'a') {
		player.ani = 'walk';
		player.mirror.x = true;
	} else if (key == 'd') {
		player.ani = 'walk';
		player.mirror.x = false;
	}
	if (key == 'w') {
		player.ani = 'jump';
	}

	if (key == 'w' && player.y > 200) {
		player.vel.y = -3;
	} else if (key == 's') {
		player.vel.y = 3;
	}
}
