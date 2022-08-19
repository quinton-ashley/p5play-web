let args = {};
{
	let params = new URLSearchParams(location.href.split('?')[1]);
	for (let pair of params.entries()) {
		args[pair[0]] = pair[1];
	}
}

let examples = {
	Sprites: {
		sprite: 'creation',
		sprite2: 'appearance',
		sprite3: 'change animation',
		sprites_with_sheet: 'Sprite Sheets',
		sprite4: 'movements',
		sprite5: 'access and deletion',
		sprite6: 'lifespan and visibility',
		sprite7: 'depth and drawing order',
		sprite8: 'groups',
		sprite9: 'custom draw function'
	},
	Animation: {
		animation: 'creation',
		animation_sprite_sheet: 'sprite sheet',
		animation2: 'control'
	},
	Collisions: {
		collisions: 'overlap, collide, displace',
		collisions2: 'group collisions and events',
		collisions3: 'custom colliders',
		collisions4: 'bouncing',
		collisions5: 'point and pixel overlap',
		culling: 'Culling offscreen sprites'
	},
	'User Input': {
		mouseEvents: 'Mouse events on sprites',
		keyPresses: 'Keyboard and mouse input'
	},
	Advanced: {
		camera: 'Using the virtual camera',
		mouseCamera: 'Mouse events on sprites with camera',
		extends: 'Extending the Sprite class'
	},
	Games: {
		pong: 'Pong',
		asteroids: 'Asteroids',
		breakout: 'Breakout',
		flappyBird: 'Flappy Bird'
	}
};

let ih = '';
for (let category in examples) {
	ih += `<div><h4>${category}</h4>`;
	for (let name in examples[category]) {
		let description = examples[category][name];
		ih += `
<a class="dropdown-item" role="menuitem" href="index.html?fileName=${name}.js">${description}</a>
`;
	}
	ih += `</div>`;
}
let ul = document.getElementById('examples');
ul.innerHTML += ih;

let originalCode;

$(async () => {
	let file = args.fileName || 'animation.js';
	originalCode = `console.log('running ${file}');\n\n`;
	originalCode += await (await fetch(file)).text();
	startMain();
	console.log('example loaded');
	editor.setValue(originalCode, -1);
	playEditor();
});

function reset() {
	editor.setValue(originalCode, -1);
	playEditor();
}

function run() {
	playEditor();
}
