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
		2: ['image', 'scale', 'debug'],
		3: ['vel / velocity', 'speed', 'direction', 'move', 'moveTo', 'moveTowards', 'angleTo'],
		5: ['collides', 'colliding', 'collided'],
		6: ['overlaps', 'overlapping', 'overlapped', 'layer', 'remove'],
		7: ['rotate', 'rotateTo', 'rotateTowards', 'rotationSpeed', 'offset'],
		9: ['bounciness', 'drag', 'friction', 'mass', 'rotationDrag', 'rotationLock'],
		10: ['applyForce', 'applyForceScaled', 'bearing', 'attractTo', 'applyTorque'],
		12: ['shape'],
		13: ['addCollider', 'addSensor'],
		14: ['draw', 'update'],
		15: ['angleTo'],
		'group.html?page=6': ['life'],
		'animation.html?page=2': ['mirror', 'ani', 'addAni'],
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
		4: ['SliderJoint']
	},
	'Camera.html': {
		0: ['x', 'y', 'moveTo'],
		1: ['zoom', 'zoomTo'],
		2: ['on', 'off']
	},
	'Canvas.html': {
		0: ['w', 'h', 'hw', 'hh', '"w:h"', '"fullscreen"'],
		1: ['"pixelated"'],
		2: ['resize']
	},
	'Tiles.html': {
		0: ['Tiles'],
		1: ['tileSize']
	},
	'World.html': {
		0: ['gravity', 'allowSleeping'],
		1: ['timeScale', 'physicsTime', 'realTime', 'autoStep', 'step'],
		2: ['velocityIterations', 'positionIterations']
	},
	'q5.js basics': {
		'https://p5js.org/reference/#/p5': [
			'let',
			'const',
			'===',
			'>=',
			'<',
			'<=',
			'if-else',
			'function',
			'return',
			'boolean',
			'string',
			'number',
			'object',
			'for',
			'while',
			'console',
			'random',
			'round',
			'sin',
			'cos',
			'max',
			'min',
			'dist'
		]
	},
	'q5.js environment': {
		'https://p5js.org/reference/#/p5': [
			'width',
			'height',
			'frameCount',
			'frameRate',
			'noLoop',
			'loadImage',
			'loadFont',
			'loadJSON',
			'storeItem',
			'getItem',
			'clearStorage',
			'fullscreen'
		]
	},
	'q5.js 2D': {
		'https://p5js.org/reference/#/p5': [
			'background',
			'clear',
			'color',
			'fill',
			'noFill',
			'stroke',
			'noStroke',
			'circle',
			'rect',
			'line',
			'image',
			'tint',
			'text',
			'textAlign',
			'textSize',
			'textFont'
		]
	},
	'q5.js sound': {
		'https://p5js.org/reference/#/p5': ['loadSound'],
		'https://p5js.org/reference/#/p5.SoundFile': ['play', 'stop', 'loop', 'setVolume', 'pan']
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
		refPage = 'https://p5js.org/reference';
		p5playRef = false;
	}

	let div = document.createElement('div');
	div.className = 'ref';
	if (className == 'Sprite') div.classList.add('full');
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
				a.href = url + '/' + topic;
				a.target = '_blank';
			}
			a.innerHTML = topic;
			links.push(a);
		}
	}

	// Step 1: Listen for Input Events
	const searchInput = document.getElementById('searchInput');
	const searchResults = document.getElementById('searchResults');
	const refsContainer = document.getElementById('refs');

	searchInput.addEventListener('input', function (event) {
		const searchTerm = event.target.value.toLowerCase();

		// filter results based on search
		filterReferences(searchTerm);
	});


	// filter the references on the page 
	function filterReferences(searchTerm) {
		const refsElements = refsContainer.querySelectorAll('.ref');

		refsElements.forEach(refElement => {
			const topics = refElement.querySelectorAll('a:not(h2 a)');
			let hasMatchingTopic = false;

			topics.forEach(topic => {
				if (topic.textContent.toLowerCase().includes(searchTerm)) {

					topic.style.display = 'block';
					hasMatchingTopic = true;
				} else {
					topic.style.display = 'none';
				}
			});

			refElement.style.display = hasMatchingTopic? 'block' : 'none';
		});
	}


	for (let link of links) {
		div.append(link);
	}
}

document.body.children[0].style.display = 'flex';
