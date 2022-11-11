// virtual camera
// move the mouse around
// the sprite follows the mouse but appears at the center of the sketch
// because the camera is following it

let ghost;
let bg;
let frame;
// the scene is twice the size of the canvas
let SCENE_W = 1600;
let SCENE_H = 800;

function preload() {
	allSprites.collider = 'none';

	ghost = new Sprite(400, 200, 50, 100);

	ghost.addAni('floating', 'assets/ghost_standing0001.png', 7);
	ghost.ani.offset.y = 18;

	ghost.addAni('moving', 'assets/ghost_walk0001.png', 4);

	bg = new Group();
	bg.addAni('rock0', 'assets/rocks0.png');
	bg.addAni('rock1', 'assets/rocks1.png');
	bg.addAni('rock2', 'assets/rocks2.png');

	frame = loadImage('assets/frame.png');
}

function setup() {
	new Canvas(800, 400);

	// create some background for visual reference
	for (let i = 0; i < 80; i++) {
		// create a sprite and add the 3 animations
		let rock = new bg.Sprite(random(-width, SCENE_W + width), random(-height, SCENE_H + height));
		// cycles through rocks 0 1 2
		rock.ani = 'rock' + (i % 3);
	}
}

function draw() {
	background(255);

	// turn the camera on
	camera.on();

	// mouse trailer, the speed is inversely proportional to the mouse distance
	ghost.vel.x = (mouse.x - ghost.x) / 20;
	ghost.vel.y = (mouse.y - ghost.y) / 20;

	if (abs(ghost.vel.x) > 2) {
		ghost.ani = 'moving';
	} else {
		ghost.ani = 'floating';
	}
	if (ghost.vel.x < 0) {
		ghost.mirror.x = true;
	} else {
		ghost.mirror.x = false;
	}

	// a camera is created automatically at the beginning

	// .5 zoom is zooming out (50% of the normal size)
	if (mouse.pressing()) camera.zoom = 0.5;
	else camera.zoom = 1;

	// set the camera position to the ghost position
	camera.x = ghost.x;
	camera.y = ghost.y;

	// limit the ghost movements
	if (ghost.x < 0) ghost.x = 0;
	if (ghost.y < 0) ghost.y = 0;
	if (ghost.x > SCENE_W) ghost.x = SCENE_W;
	if (ghost.y > SCENE_H) ghost.y = SCENE_H;

	// draw the scene
	// rocks first
	bg.draw();

	stroke(100);
	strokeWeight(10);
	noFill();
	rect(-ghost.hw, ghost.hh, SCENE_W + ghost.w, SCENE_H + ghost.hh);

	// shadow using p5 drawing
	noStroke();
	fill(0, 0, 0, 20);
	// shadow
	ellipse(ghost.x, ghost.y + 90, 80, 30);
	// character on the top
	ghost.draw();

	// you can turn on and off the camera at any point in draw to restore
	// the normal drawing coordinates, the frame will be drawn at 0,0
	// try to see what happens if you don't turn it off
	camera.off();

	image(frame, 0, 0);
}
