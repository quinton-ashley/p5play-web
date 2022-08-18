let icon;

function preload() {
	icon = loadImage('assets/quintos_logo.png');
}

function setup() {
	createCanvas(800, 400);

	new Sprite(icon, 100, 100);
}

function draw() {
	background(100);
}
