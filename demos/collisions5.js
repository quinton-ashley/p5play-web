let triangle, cloud, platform;

function preload() {
	world.gravity.y = 10; // vertical gravity of 10

	triangle = new Sprite(300, 150, [88, -120, 3]);
	triangle.addAni('assets/triangle.png');
	triangle.layer = 10;

	cloud = new Sprite(500, 150, 50);
	cloud.addAni('assets/cloud_breathing0001.png', 9);
	cloud.addAni('transformed', 'assets/asterisk_normal0001.png', 3);

	platform = new Sprite(400, 300, 300, 100, 'static');
	platform.addAni('assets/platform.png');
}

function setup() {
	new Canvas(800, 400);
}

function draw() {
	background(255);

	//if no arrow input set velocity to 0
	triangle.vel.x = 0;

	if (kb.pressing(LEFT_ARROW)) triangle.vel.x = -5;
	if (kb.pressing(RIGHT_ARROW)) triangle.vel.x = 5;

	//instead of checking the colliders or bounding box overlaps
	//I can just check a point against a collider
	// if (cloud.overlapPoint(triangle.position.x, triangle.position.y)) {
	// 	cloud.changeAnimation('transformed');
	// }

	//Or check a point against the pixels of a sprite animation or image
	//if the bottom of the triangle is not overlapping with the non transparent pixels
	//of the platform make it fall
	// if (platform.overlapPixel(triangle.position.x, triangle.position.y + 30) == false) {
	// 	triangle.velocity.y += GRAVITY;
	// }

	//if the bottom of the triangle is overlapping the non transparent pixels
	//of the platform move it up one pixel until it doesn't overlap anymore
	// while (platform.overlapPixel(triangle.position.x, triangle.position.y + 30)) {
	// 	triangle.position.y--;
	// 	triangle.velocity.y = 0;
	// }

	allSprites.debug = mouse.pressing();
}
