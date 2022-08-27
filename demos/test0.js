//Variables
let melon, melonIMG, melonRunner, melonCollided;
let JJ, Bingo, YoYo, TomTom, Dad, Mom;
let clouds, cloudIMG, ground, invGround, groundIMG;

function setup() {
	createCanvas(400, 600);

	melon = createSprite(50, 160, 20, 50);
	melon.addImage('assets/asterisk_circle0000.png');
	melon.scale = 0.2;

	ground = createSprite(200, 220, 400, 20);
	ground.addImage('assets/small_platform0001.png');
	ground.x = ground.width / 2;
	ground.velocityX = -4;
	ground.scale = 0.4;

	invGround = createSprite(200, 220, 400, 10);
	invGround.visible = false;
	melon.collide(invGround);
}

function draw() {
	background('skyblue');

	if (kb.pressed('up') && melon.y >= 10) {
		melon = melon.y - 50;
	}

	//+0.8 Gravity
	if (melon.y <= 200) {
		melon.y = melon.y + 0.8;
	}

	if (ground.x < 0) {
		ground.x = ground.width / 2;
	}

	melon.depth = ground.depth;
	melon.depth += 1;
}
