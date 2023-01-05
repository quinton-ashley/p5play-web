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
			'color',
			'text',
			'textColor',
			'textSize',
			'visible'
		],
		1: ['collider', 'dynamic', 'kinematic', 'static'],
		2: ['direction', 'move', 'moveTo', 'moveTowards', 'speed', 'vel / velocity'],
		3: ['img / image'],
		5: ['collides', 'colliding', 'collided'],
		6: ['layer', 'overlap', 'overlapping', 'overlapped'],
		7: ['rotate', 'rotateTo', 'rotateTowards', 'rotationSpeed'],
		11: ['shape'],
		12: ['draw', 'update']
	},
	'Group.html': {
		0: ['sprite properties', 'GroupSprite', 'move functions'],
		1: ['collide functions', 'amount', 'arrow setters'],
		2: ['overlap functions', 'remove'],
		3: ['allSprites'],
		5: ['removeAll', 'SubGroup']
	},
	'Sprite_Animation.html': {
		0: ['animation', 'loadAnimation', 'frameDelay'],
		1: ['play', 'stop', 'rewind', 'loop', 'noLoop', 'frame', 'nextFrame', 'previousFrame', 'scale']
	},
	'Input_Devices.html': {
		0: ['mouse', 'kb / keyboard', 'contro', 'presses', 'pressing', 'holds', 'holding', 'held', 'released']
	},
	'Tiles.html': {
		0: ['tile'],
		1: ['tileSize']
	},
	'Camera.html': {
		0: ['x', 'y'],
		1: ['zoom', 'on', 'off', 'mouse']
	}
};

let refsDiv = document.getElementById('refs');

for (let refPage in refs) {
	let ref = refs[refPage];
	let className = refPage.split('.')[0];
	if (className == 'Sprite_Animation') className = 'Animation';
	if (className == 'Input_Devices') className = 'Input';
	refPage = refPage.toLowerCase();

	let div = document.createElement('div');
	let heading = document.createElement('a');
	heading.href = refPage;
	heading.innerHTML = '<h2>' + className + '</h2>';
	div.append(heading);
	refsDiv.append(div);

	let links = [];
	for (let pageNum in ref) {
		let url = refPage + '?page=' + pageNum;
		let topics = ref[pageNum];
		for (let topic of topics) {
			let a = document.createElement('a');
			a.href = url;
			a.innerHTML = topic;
			links.push(a);
		}
	}

	if (className == 'Sprite') {
		links = [
			...links.slice(0, 4),
			...links.slice(4).sort((a, b) => {
				let aText = a.innerHTML;
				let bText = b.innerHTML;
				if (aText < bText) {
					return -1;
				} else if (aText > bText) {
					return 1;
				} else {
					return 0;
				}
			})
		];
	}

	for (let link of links) {
		div.append(link);
	}
}
