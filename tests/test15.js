// Credits to ZUN for the sound effects

//----------------------------------------------------------------------\\
//                              How to Play                             \\
//----------------------------------------------------------------------\\
// 1) Press the WASD or Arrow Keys to move you character                \\
// 2) Pick up yellow coins for score and pink hearts for extra lives    \\
// 3) Avoid the enemies (red shapes) as you try to reach the goal       \\
// 4) Reach the goal without dying to win!                              \\
//----------------------------------------------------------------------\\

let player, walls, coins, score, lives, goal, lifePickups, enemies, run;
let toggleX, toggleY, gameOver, moveDelay, finishDelay, visCheck;
let orbit1,
	orbit2,
	orbit1P = [0, 0],
	orbit2P = [0, 0];
const Delay = 30;
let itemSFX, deathSFX;

function preload() {
	player = new Sprite(25, 25, 50, 50);
	player.color = 'gray';
	player.rotationLock = true;

	// soundFormats('wav');
	// itemSFX = loadSound('item00');
	// deathSFX = loadSound('pldead00');
	// outputVolume(0.5);

	//outer walls
	walls = new Group();
	walls.color = (150, 150, 150);
	walls.layer = 0;
	let wallR = new walls.Sprite(-20, 400, 38, 1000, 'static');
	let wallL = new walls.Sprite(820, 400, 38, 1000, 'static');
	let wallU = new walls.Sprite(400, -20, 1000, 38, 'static');
	let wallD = new walls.Sprite(400, 620, 1000, 38, 'static');

	//coin pickups
	coins = new Group();
	coins.diameter = 15;
	coins.x = () => random(30, 370);
	coins.y = () => random(30, 370);
	coins.color = 'gold';
	player.overlaps(coins, collect);

	//life pickups
	lifePickups = new Group();
	lifePickups.diameter = 20;
	lifePickups.x = () => random(30, 370);
	lifePickups.y = () => random(30, 370);
	lifePickups.color = 'pink';
	player.overlaps(lifePickups, collectLife);

	//enemies
	enemies = new Group();
	enemies.color = 'red';
	enemies.overlaps(allSprites);
	enemies.x = () => random(140, 800);
	enemies.y = () => random(140, 600);
	player.overlaps(enemies, death);

	//orbit group #1
	orbit1P[0] = 200;
	orbit1P[1] = 300;
	orbit1 = new Group();
	orbit1.color = 'rgb(255,0,80)';
	orbit1.overlaps(allSprites);
	player.overlaps(orbit1, death);
	new orbit1.Sprite(orbit1P[0] - 130, orbit1P[1], 40);
	new orbit1.Sprite(orbit1P[0] + 130, orbit1P[1], 40);
	new orbit1.Sprite(orbit1P[0], orbit1P[1] - 130, 40);
	new orbit1.Sprite(orbit1P[0], orbit1P[1] + 130, 40);

	//orbit group #2
	orbit2P[0] = 600;
	orbit2P[1] = 300;
	orbit2 = new Group();
	orbit2.color = 'rgb(255,0,80)';
	orbit2.overlaps(allSprites);
	player.overlaps(orbit2, death);
	new orbit2.Sprite(orbit2P[0] - 130, orbit2P[1], 40);
	new orbit2.Sprite(orbit2P[0] + 130, orbit2P[1], 40);
	new orbit2.Sprite(orbit2P[0], orbit2P[1] - 130, 40);
	new orbit2.Sprite(orbit2P[0], orbit2P[1] + 130, 40);

	//goal
	goal = new Sprite(720, 520, 40);
	goal.color = 'lightgreen';
	goal.overlaps(allSprites);
	player.overlapping(goal, finish);

	//layering
	player.layer = 4;
	goal.layer = 2;
	coins.layer = 1;
	lifePickups.layer = 0;
	enemies.layer = 3;
}

function setup() {
	createCanvas(800, 600);
	textAlign(RIGHT);

	//chasing enemies
	new enemies.Sprite();
	new enemies.Sprite();
	new enemies.Sprite();
	new enemies.Sprite();
	new enemies.Sprite();

	//orbit group #1
	new coins.Sprite(orbit1P[0] - 30, orbit1P[1]);
	new coins.Sprite(orbit1P[0], orbit1P[1] - 30);
	new coins.Sprite(orbit1P[0] + 30, orbit1P[1]);
	new coins.Sprite(orbit1P[0], orbit1P[1] + 30);
	new lifePickups.Sprite(orbit1P[0], orbit1P[1]);

	//orbit group #2
	new coins.Sprite(orbit2P[0] - 30, orbit2P[1]);
	new coins.Sprite(orbit2P[0], orbit2P[1] - 30);
	new coins.Sprite(orbit2P[0] + 30, orbit2P[1]);
	new coins.Sprite(orbit2P[0], orbit2P[1] + 30);
	new lifePickups.Sprite(orbit2P[0], orbit2P[1]);

	//random pickups
	new coins.Sprite();
	new coins.Sprite();
	new coins.Sprite();
	new coins.Sprite();
	new lifePickups.Sprite();

	//goal
	goal.x = random(200, 800);
	goal.y = random(200, 600);

	toggleX = false;
	toggleY = false;
	gameOver = false;
	score = 0;
	lives = 1;
	moveDelay = Delay;
	finishDelay = Delay * 1.5;
	visCheck = true;
}

function draw() {
	background(245);
	if (run) {
		if (visCheck) allSprites.visible = true;
		PlayerMove();

		if (moveDelay != 0) {
			player.color = 'gray';
			moveDelay--;

			orbit1.speed = 0;
			orbit2.speed = 0;

			for (var s of enemies) {
				s.speed = 0;
			}
		} else {
			player.color = 'lightblue';

			orbit1.orbit(0.8);
			orbit2.orbit(-0.8);

			for (var s of enemies) {
				s.moveTo(player.x, player.y, 0.7);
			}
		}

		if (gameOver) {
			allSprites.visible = false;
			push();
			textAlign(CENTER);
			fill(0);
			textSize(25);
			text('Game Over...', width / 2, height / 2 - 15);
			text('Press Space To Restart', width / 2, height / 2 + 15);
			pop();

			if (kb.pressing(' ')) {
				enemies.removeAll();
				coins.removeAll();
				lifePickups.removeAll();

				player.x = 25;
				player.y = 25;
				player.visible = true;
				setup();
			}
		}

		push();
		textSize(18);
		text('Score: ' + score, width - 6, 18);
		text('Lives: ' + lives, width - 6, 37);
		pop();
	} else {
		push();
		textAlign(CENTER);
		fill(0);
		textSize(25);
		text('Press Space To Start The Game', width / 2, height / 2);
		pop();

		if (kb.pressing(' ')) run = true;
		allSprites.visible = false;
	}
}

function collect(player, item) {
	item.remove();
	score++;
	// itemSFX.play();
}
function collectLife(player, item) {
	item.remove();
	lives++;
	// itemSFX.play();
}

function finish() {
	visCheck = false;
	allSprites.visible = false;
	push();
	textAlign(CENTER);
	fill(0);
	textSize(25);
	text('A Winner Is You!', width / 2, height / 2 - 15);
	pop();

	moveDelay = Delay;
	if (finishDelay <= 0) {
		score += 5;
		Restart();
	}
	finishDelay--;
}

function death() {
	if (lives > 0) {
		lives--;
		Restart();
	} else {
		gameOver = true;
	}
	// deathSFX.play();
}

function Restart() {
	visCheck = true;
	player.x = 25;
	player.y = 25;
	finishDelay = Delay * 1.5;

	moveDelay = Delay;

	enemies.removeAll();
	coins.removeAll();
	lifePickups.removeAll();

	new enemies.Sprite();
	new enemies.Sprite();
	new enemies.Sprite();
	new enemies.Sprite();
	new enemies.Sprite();

	//orbit group #1
	new coins.Sprite(orbit1P[0] - 30, orbit1P[1]);
	new coins.Sprite(orbit1P[0], orbit1P[1] - 30);
	new coins.Sprite(orbit1P[0] + 30, orbit1P[1]);
	new coins.Sprite(orbit1P[0], orbit1P[1] + 30);
	new lifePickups.Sprite(orbit1P[0], orbit1P[1]);

	//orbit group #2
	new coins.Sprite(orbit2P[0] - 30, orbit2P[1]);
	new coins.Sprite(orbit2P[0], orbit2P[1] - 30);
	new coins.Sprite(orbit2P[0] + 30, orbit2P[1]);
	new coins.Sprite(orbit2P[0], orbit2P[1] + 30);
	new lifePickups.Sprite(orbit2P[0], orbit2P[1]);

	//goal
	goal.x = random(200, 800);
	goal.y = random(200, 600);
}

function killEnemy(trigger, enemy) {
	removeEnemy(enemy);
	score++;
}

function removeEnemy(target) {
	target.remove();
}

function PlayerMove() {
	//player
	//x-movement
	if (moveDelay == 0) {
		if ((kb.pressing('ArrowLeft') && !kb.pressing('ArrowRight')) || (kb.pressing('A') && !kb.pressing('D'))) {
			player.vel.x = -3;
			toggleX = false;
		} else if ((kb.pressing('ArrowRight') && !kb.pressing('ArrowLeft')) || (kb.pressing('D') && !kb.pressing('A'))) {
			player.vel.x = 3;
			toggleX = false;
		} else if ((!kb.pressing('ArrowLeft') && !kb.pressing('ArrowRight')) || (!kb.pressing('A') && !kb.pressing('D'))) {
			player.vel.x = 0;
			toggleX = false;
		} else if (!toggleX) {
			player.vel.x = 3;
			toggleX = true;
		} else {
			player.vel.x = -3;
			toggleX = true;
		}
		// Pressing the key for moving in the opposite direction of your current movement
		// causes the player to start moving in that other direction for smoother controls

		if ((kb.pressing('ArrowUp') && !kb.pressing('ArrowDown')) || (kb.pressing('W') && !kb.pressing('S'))) {
			player.vel.y = -3;
			toggleY = false;
		} else if ((kb.pressing('ArrowDown') && !kb.pressing('ArrowUp')) || (kb.pressing('S') && !kb.pressing('W'))) {
			player.vel.y = 3;
			toggleY = true;
		} else if ((!kb.pressing('ArrowUp') && !kb.pressing('ArrowDown')) || (!kb.pressing('W') && !kb.pressing('S'))) {
			player.vel.y = 0;
			toggleY = false;
		} else if (!toggleY) {
			player.vel.y = 3;
			toggleY = true;
		} else {
			player.vel.y = -3;
			toggleY = true;
		}
	} else {
		player.vel.x = 0;
		player.vel.y = 0;
	}
}
