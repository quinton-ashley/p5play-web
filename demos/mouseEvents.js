//mouse states and mouse events on sprites
//click and hold the mouse button while overing on the sprites

let asterisk, ghost, draggedSprite;

function preload() {
	ghost = new Sprite(200, 200, 110);
	ghost.addAni('assets/ghost_spin0001.png', 3);

	asterisk = new Sprite(600, 200, 110);
	asterisk.addAni('assets/asterisk_normal0001.png', 3);
	asterisk.addAni('transform', 'assets/asterisk_circle0001.png', 8);
	asterisk.ani.frameDelay = 1;
	asterisk.ani.looping = false;
	asterisk.addAni('stretch', 'assets/asterisk_stretching0001.png', 8);
}

function setup() {
	new Canvas(800, 400);
}

function draw() {
	background(255);

	if (ghost.mouse.hovering()) ghost.rotation -= 5;

	// ghost becomes invisible if the left mouse button is
	// being pressed while hovering over it
	ghost.visible = !ghost.mouse.pressing();

	if (asterisk.mouse.presses()) {
		asterisk.ani = 'transform';
		asterisk.ani.play(0); // play the animation starting from frame 0
	}

	if (asterisk.mouse.dragging()) {
		log(mouse.x + asterisk.mouse.x, mouse.y + asterisk.mouse.y);
		asterisk.moveTowards(mouse.x + asterisk.mouse.x, mouse.y + asterisk.mouse.y, 1);
	}

	if (asterisk.mouse.released()) {
		asterisk.ani = ['transform', '!transform', 'default'];
	}

	if (asterisk.mouse.hovers()) {
		asterisk.ani = 'default';
	}

	if (asterisk.mouse.hovered()) {
		asterisk.ani = 'stretch';
	}
}
