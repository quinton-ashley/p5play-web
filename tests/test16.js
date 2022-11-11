let smiley;

function setup() {
	createCanvas(500, 120);
	let str = `
	..yyyyyy
	.yybyybyy
	yyyyyyyyyy
	yybyyyybyy
	.yybbbbyy
	..yyyyyy`;

	smiley = new Sprite();
	smiley.img = spriteArt(str, 16);
}

function draw() {
	clear();
}
