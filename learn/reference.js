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
		1: ['collider'],
		2: ['image', 'debug', 'opacity'],
		3: ['vel / velocity', 'speed', 'direction', 'move', 'moveTo', 'moveTowards', 'angleTo'],
		5: ['collides', 'colliding', 'collided'],
		6: ['overlaps', 'overlapping', 'overlapped', 'layer', 'remove'],
		7: ['rotate', 'rotateTo', 'rotateTowards', 'rotationSpeed', 'offset'],
		8: ['scale'],
		9: ['bounciness', 'drag', 'friction', 'mass', 'rotationDrag', 'rotationLock'],
		10: ['applyForce', 'applyForceScaled', 'bearing', 'attractTo', 'applyTorque'],
		12: ['shape'],
		13: ['addCollider', 'addSensor'],
		14: ['draw', 'update'],
		15: ['angleTo'],
		'group.html?page=6': ['life'],
		'animation.html?page=2': ['ani', 'addAni'],
		'animation.html?page=4': ['anis', 'addAnis', 'pixelPerfect', 'spriteSheet'],
		'tiles.html?page=0': ['tile'],
		'tiles.html?page=1': ['tileSize'],
		'world.html?page=0': ['allowSleeping', 'sleeping'],
		'input.html?page=3': ['mouse']
	},
	'Group.html': {
		0: ['GroupSprite', 'move'],
		1: ['amount', '=>'],
		2: ['collides', 'overlaps'],
		3: ['allSprites'],
		5: ['remove', 'removeAll', 'SubGroup'],
		6: ['autoCull', 'cull'],
		7: ['autoDraw', 'autoUpdate']
	},
	'Animation.html': {
		0: ['animation', 'loadAni / loadAnimation', 'frameDelay'],
		1: ['play', 'stop', 'rewind', 'loop', 'noLoop', 'frame', 'nextFrame', 'previousFrame', 'scale'],
		4: ['offset']
	},
	'Input.html': {
		0: ['presses', 'pressing', 'released', 'mouse', 'kb / keyboard'],
		4: ['contros / controllers', 'contro'],
		5: ['touches']
	},
	'Joints.html': {
		0: ['GlueJoint'],
		1: ['DistanceJoint'],
		2: ['WheelJoint'],
		3: ['HingeJoint'],
		4: ['SliderJoint'],
		5: ['GrabberJoint']
	},
	'Camera.html': {
		0: ['x', 'y', 'moveTo'],
		1: ['zoom', 'zoomTo'],
		2: ['on', 'off']
	},
	'Canvas.html': {
		0: ['w', 'h', 'hw', 'hh'],
		1: ['displayMode'],
		2: ['resize']
	},
	'Tiles.html': {
		0: ['Tiles']
	},
	'World.html': {
		0: ['gravity', 'allowSleeping'],
		1: ['timeScale', 'physicsUpdate', 'realTime', 'physicsTime'],
		3: ['getSpritesAt', 'getSpriteAt'],
		4: ['rayCastAll', 'rayCast']
	},
	'q5.js basics': {
		'https://p5js.org/reference/p5/': [
			'let',
			'if',
			'function',
			'while',
			'Boolean',
			'String',
			'Number',
			'Array',
			'for',
			'random',
			'sin',
			'cos',
			'max',
			'min',
			'dist'
		]
	},
	'q5.js environment': {
		'https://q5js.org/learn/#': [
			'log',
			'preload',
			'setup',
			'draw',
			'postProcess',
			'width',
			'height',
			'frameCount',
			'frameRate',
			'noLoop',
			'loadJSON',
			'storeItem',
			'getItem',
			'fullscreen'
		]
	},
	'q5.js drawing': {
		'https://q5js.org/learn/#': [
			'background',
			'clear',
			'color',
			'fill',
			'noFill',
			'stroke',
			'noStroke',
			'shadow',
			'circle',
			'rect',
			'line',
			'loadImage',
			'image',
			'tint',
			'opacity',
			'loadFont',
			'text',
			'textAlign',
			'textSize',
			'loadSound'
		]
	}
};

let refsDiv = document.getElementById('refs');

for (let refPage in refs) {
	let ref = refs[refPage];
	let className = refPage;
	let p5playRef = true;
	if (className.slice(0, 2) != 'q5') {
		className = className.split('.')[0];
		if (className == 'Sprite_Animation') className = 'Animation';
		if (className == 'Input_Devices') className = 'Input';
		refPage = refPage.toLowerCase();
	} else {
		if (className == 'q5.js basics') className = 'JavaScript basics';
		refPage = 'https://q5js.org/learn';
		p5playRef = false;
	}

	let div = document.createElement('div');
	div.className = 'ref';
	if (className == 'Sprite' || className == 'JavaScript basics') div.classList.add('full');
	let heading = document.createElement('h2');
	heading.innerHTML = `<a href="${refPage}">${className}</a>`;
	div.append(heading);
	refsDiv.children[refsDiv.children.length - 3].insertAdjacentElement('afterend', div);

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
			if (p5playRef) {
				a.href = url;
			} else {
				a.href = url + topic;
				a.target = '_blank';
			}
			a.innerHTML = topic;
			links.push(a);
		}
	}

	// Step 1: Listen for Input Events
	const searchInput = document.getElementById('searchInput');
	const refsContainer = document.getElementById('refs');

	searchInput.addEventListener('input', function (event) {
		const searchTerm = event.target.value.toLowerCase();

		// filter results based on search
		filterReferences(searchTerm);
	});

	// filter the references on the page
	function filterReferences(searchTerm) {
		const refsElements = refsContainer.querySelectorAll('.ref');

		for (let refElement of refsElements) {
			const topics = refElement.querySelectorAll('a:not(h2 a)');
			let hasMatchingTopic = false;

			for (let topic of topics) {
				if (topic.textContent.toLowerCase().includes(searchTerm)) {
					topic.style.display = 'flex';
					hasMatchingTopic = true;
				} else {
					topic.style.display = 'none';
				}
			}

			refElement.style.display = hasMatchingTopic ? 'flex' : 'none';
		}
	}

	for (let link of links) {
		div.append(link);
	}
}

document.body.children[0].style.display = 'flex';
