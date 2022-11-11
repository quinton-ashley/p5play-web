// Controlling animations

let instructions = 'Click and hold anywhere on the screen to see different behaviors';
let circle, explode, sleep, glitch;

function preload() {
	sleep = loadAnimation('assets/asterisk_stretching0001.png', 8);

	circle = loadAni('assets/asterisk_circle0000.png', 8);

	// by default animations loop
	circle.looping = false;

	explode = loadAni('assets/asterisk_explode0001.png', 11);

	glitch = loadAni(
		'assets/asterisk.png',
		'assets/triangle.png',
		'assets/square.png',
		'assets/cloud.png',
		'assets/star.png',
		'assets/mess.png',
		'assets/monster.png'
	);
	// by default an animation plays
	glitch.playing = false;
}

function setup() {
	new Canvas(800, 300);
}

function draw() {
	background(255);
	text(instructions, 20, 20);

	// playing an pausing an animation
	if (mouse.pressing()) {
		sleep.play();
	} else {
		sleep.stop();
	}

	// makes a loop between the last few frames of the animation
	// goes from 7 to 11 and then back to 7
	if (explode.frame == explode.lastFrame) {
		explode.frame = 7;
	}

	// playing backward or forward toward a specific frame
	// returns to the initial frame if click and hold
	if (mouse.pressing()) {
		circle.goToFrame(0);
	} else {
		circle.goToFrame(circle.lastFrame);
	}

	animation(sleep, 100, 150);
	animation(explode, 300, 150);
	animation(glitch, 500, 150);
	animation(circle, 700, 150);
}

function mousePressed() {
	explode.frame = 0;

	// move ahead one frame
	glitch.nextFrame();
}
