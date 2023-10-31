let projects = [
	{
		title: 'Red Remover',
		author: '@Nirmay',
		url: 'https://thegamebox.ca/redremover.html',
		size: 1
	},
	// {
	// 	title: 'Into the Mines',
	// 	author: '@Tezumies',
	// 	url: 'https://tezumie.github.io/into-the-mines/',
	// 	size: 1
	// },
	{
		title: 'Desert Golfing',
		author: '@mtrc',
		url: 'https://editor.p5js.org/mtrc/sketches/Zc9cjBS3R',
		size: 1
	},
	{
		title: 'Break Those Blocks',
		author: '@moonflower2022',
		url: 'https://moonflower2022.github.io/break-those-blocks/',
		size: 1
	},
	{
		title: 'Fruit 2048',
		author: '@arissazh',
		url: 'https://arissazh.github.io/final-project/',
		size: 1
	},
	{
		title: 'Puzzling Magnetism Recharged',
		author: '@kevin98799',
		url: 'https://kevin98799.itch.io/puzzling-magnetism-recharged'
	},
	{
		title: 'Forrest Life',
		author: '@Axiom',
		url: 'https://quinton-ashley.github.io/Squirrel/Code/index.html'
	},
	{
		title: 'The Lake House',
		author: '@Axiom',
		url: 'https://quinton-ashley.github.io/TheLakeHouse/Code/index.html'
	},
	{
		title: 'Lily Leap',
		author: '@AmaniZungu',
		url: 'https://quintos.org/?user=AmaniZungu&game=LilyLeap&v=4'
	},
	{
		title: 'Sun Warrior',
		author: '@andyjshaw000',
		url: 'https://andyjshaw000.github.io/Final438/'
	}
];

let largeCardsPerCol = 2;

let assets = 'https://quinton-ashley.github.io/p5play-assets/play/';

let cols = document.getElementsByClassName('col');

for (let i = 0; i < projects.length; i++) {
	let proj = projects[i];

	proj.id = proj.title.toLowerCase().replace(/ /g, '_');
	let imgUrl = assets + proj.id + '.jpg'; // images must be jpg
	let vidUrl = assets + proj.id + '.mp4'; // videos must be mp4

	let card = document.createElement('div');
	card.classList.add('card');
	card.dataset.vidUrl = vidUrl;
	if (proj.size == 1) card.classList.add('card-lg');
	card.innerHTML = `
<a class="thumbnail" href="${proj.url}" target="_blank">
	<img src="${imgUrl}" alt="${proj.title} image">
</a>
<div class="info">
	<p class="title">${proj.title}</p>
	<p class="author">by ${proj.author}</p>
</div>`;

	card.thumbnail = card.querySelector('.thumbnail');
	card.thumbnailImg = card.querySelector('.thumbnail img');

	if (proj.size == 1) {
		if (i % largeCardsPerCol == 0) cols[0].append(card);
		else cols[2].append(card);
	} else {
		cols[1].append(card);
	}

	card.addEventListener('mouseenter', () => {
		const cardWidth = card.offsetWidth;
		const thumbnailHeight = card.thumbnailImg.offsetHeight;
		card.thumbnail.style.height = thumbnailHeight;

		card.thumbnailImg.style.display = 'none';

		if (!card.vid) {
			let vid = document.createElement('video');
			vid.src = card.dataset.vidUrl;
			vid.poster = card.thumbnailImg.src;
			vid.muted = true;
			vid.autoplay = true;
			vid.loop = true;
			card.thumbnail.append(vid);
			card.vid = vid;
		}

		card.vid.width = cardWidth;
		card.vid.style.display = 'block';
		card.vid.play();
	});

	card.addEventListener('mouseleave', () => {
		card.thumbnailImg.style.display = 'block';

		if (card.vid) {
			card.vid.pause();
			card.vid.style.display = 'none';
		}
	});
}
