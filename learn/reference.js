let refs = {
	'Sprite.html': {
		0: [
			'x',
			'y',
			'pos / position',
			'w / width',
			'h / height',
			'd / diameter',
			'r / radius',
			'rotation',
			'color',
			'textColor',
			'textSize',
			'visible'
		],
		1: ['collider', 'dynamic', 'kinematic', 'static'],
		2: ['direction', 'move', 'moveTo', 'moveTowards', 'speed', 'vel / velocity'],
		3: ['img / image'],
		4: []
	}
};

let refsDiv = document.getElementById('refs');

for (let refPage in refs) {
	let ref = refs[refPage];
	let className = refPage.split('.')[0];
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

	links.sort((a, b) => {
		let aText = a.innerHTML;
		let bText = b.innerHTML;
		if (aText < bText) {
			return -1;
		} else if (aText > bText) {
			return 1;
		} else {
			return 0;
		}
	});

	for (let link of links) {
		div.append(link);
	}
}
