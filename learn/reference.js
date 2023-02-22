let refs = {
	'Sprite.html': {
		0: [
			'x',
			'y',
			'w / width',
			'h / height',
			'd / diameter',
			'r / radius',
			'pos / position',
			'rotation',
			'color / fill',
			'stroke',
			'text',
			'textColor',
			'textSize',
			'visible'
		],
		1: ['collider', 'dynamic', 'kinematic', 'static'],
		2: ['move', 'moveTo', 'moveTowards', 'speed', 'direction', 'vel / velocity'],
		3: ['img / image', 'scale', 'debug'],
		5: ['collides', 'colliding', 'collided'],
		6: ['overlap', 'overlapping', 'overlapped', 'layer'],
		7: ['rotate', 'rotateTo', 'rotateTowards', 'rotationSpeed'],
		9: ['bounciness', 'friction', 'density', 'drag', 'mass', 'rotationDrag', 'rotationLock'],
		11: ['shape'],
		12: ['draw', 'update'],
		'sprite_animation.html?page=2': ['ani / animation', 'addAni / addAnimation', 'mirror'],
		'tiles.html?page=0': ['tile'],
		'tiles.html?page=1': ['tileSize'],
		'advanced.html?page=1': ['allowSleeping', 'sleeping'],
		'input_devices.html?page=3': ['mouse']
	},
	'Group.html': {
		0: ['sprite properties', 'GroupSprite', 'move functions'],
		1: ['collide functions', 'amount', 'arrow setters'],
		2: ['overlap functions', 'remove'],
		3: ['allSprites'],
		5: ['removeAll', 'SubGroup'],
		'advanced.html?page=1': ['autoCull', 'cull']
	},
	'Sprite_Animation.html': {
		0: ['animation', 'loadAni / loadAnimation', 'frameDelay'],
		1: ['play', 'stop', 'rewind', 'loop', 'noLoop', 'frame', 'nextFrame', 'previousFrame', 'scale']
	},
	'Input_Devices.html': {
		0: ['mouse', 'kb / keyboard', 'contro / controllers', 'presses', 'pressing', 'holds', 'holding', 'held', 'released']
	},
	'Camera.html': {
		0: ['x', 'y'],
		1: ['zoom', 'on', 'off', 'mouse']
	},
	Canvas: {
		'advanced.html?page=0': ['"w:h" aspect ratio', '"pixelated" preset']
	},
	World: {
		'sprite.html?page=1': ['gravity'],
		'advanced.html?page=1': ['allowSleeping']
	}
};

let refsDiv = document.getElementById('refs');

for (let refPage in refs) {
	let ref = refs[refPage];
	let className = refPage.split('.')[0];
	if (className == 'Sprite_Animation') className = 'SpriteAnimation';
	if (className == 'Input_Devices') className = 'Input';
	if (className == 'Canvas' || className == 'World') refPage = 'advanced.html';
	refPage = refPage.toLowerCase();

	let div = document.createElement('div');
	let heading = document.createElement('a');
	heading.href = refPage;
	heading.innerHTML = '<h2>' + className + '</h2>';
	div.append(heading);
	refsDiv.append(div);

	let links = [];
	for (let pageNum in ref) {
		let url;
		if (pageNum.length <= 2) {
			url = refPage + '?page=' + pageNum;
		} else {
			url = pageNum;
		}
		let topics = ref[pageNum];
		for (let topic of topics) {
			let a = document.createElement('a');
			a.href = url;
			a.innerHTML = topic;
			links.push(a);
		}
	}

	// if (className == 'Sprite') {
	// 	links = [
	// 		...links.slice(0, 4),
	// 		...links.slice(4).sort((a, b) => {
	// 			let aText = a.innerHTML;
	// 			let bText = b.innerHTML;
	// 			if (aText < bText) {
	// 				return -1;
	// 			} else if (aText > bText) {
	// 				return 1;
	// 			} else {
	// 				return 0;
	// 			}
	// 		})
	// 	];
	// }

	for (let link of links) {
		div.append(link);
	}
}
