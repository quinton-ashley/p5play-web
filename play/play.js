let projects = [
	{
		title: 'Red Remover',
		author: '@Nirmay',
		url: 'https://thegamebox.ca/redremover.html',
		size: 1,
		video: true
	},
	{
		title: 'Gun Gaem',
		author: '@coding398',
		url: 'https://gungame-aus.coding398.dev/',
		size: 1,
		video: true
	},
	{
		title: 'Into the Mines',
		author: '@Tezumies',
		url: 'https://tezumie.github.io/into-the-mines/',
		size: 1
	},
	{
		title: 'Skull Knight',
		author: '@pannawit0',
		url: 'https://pannawit0.github.io/SkullKnight/',
		size: 1
	},
	{
		title: 'Fruit 2048',
		author: '@arissazh',
		url: 'https://arissazh.github.io/final-project/',
		size: 1,
		video: true
	},
	{
		title: 'Desert Golfing',
		author: '@mtrc',
		url: 'https://editor.p5js.org/mtrc/sketches/Zc9cjBS3R',
		size: 1,
		video: true
	},
	{
		title: 'Puzzling Magnetism Recharged',
		author: '@kevin98799',
		url: 'https://kevin98799.itch.io/puzzling-magnetism-recharged',
		video: true
	},
	{
		title: 'Forrest Life',
		author: '@Axiom',
		url: 'https://quinton-ashley.github.io/Squirrel/Code/index.html',
		video: true
	},
	{
		title: 'The Lake House',
		author: '@Axiom',
		url: 'https://quinton-ashley.github.io/TheLakeHouse/Code/index.html',
		video: true
	},
	{
		title: 'Lily Leap',
		author: '@AmaniZungu',
		url: 'https://quinton-ashley.github.io/quintos/?user=AmaniZungu&game=LilyLeap&v=4'
	},
	{
		title: 'Dodeca Done',
		author: '@coding398',
		url: 'https://store.steampowered.com/app/2754840/Dodecadone/'
	},
	{
		title: 'Break Those Blocks',
		author: '@moonflower2022',
		url: 'https://moonflower2022.github.io/break-those-blocks/',
		video: true
	},
	{
		title: 'Sun Warrior',
		author: '@andyjshaw000',
		url: 'https://andyjshaw000.github.io/Final438/'
	},
	{
		title: 'Save the Mushrooms',
		author: '@chickenandwafflesequalsyes',
		url: 'https://openprocessing.org/sketch/1995592'
	}
];

let largeCardsCount = 0;
let smallCardsCount = 0;

let assets = 'https://quinton-ashley.github.io/p5play-assets/play/';

let cols = document.getElementsByClassName('col');

for (let i = 0; i < projects.length; i++) {
	let proj = projects[i];

	proj.id = proj.title.toLowerCase().replace(/ /g, '_');
	let imgUrl = assets + proj.id + '.webp'; // images must be webp

	let card = document.createElement('div');
	card.classList.add('card');

	if (proj.video) {
		let vidUrl = assets + proj.id + '.mp4'; // videos must be mp4
		card.dataset.vidUrl = vidUrl;
	}

	if (proj.size == 1) card.classList.add('card-lg');
	card.innerHTML = `
<div class="info info-top">
	<p class="title">${proj.title}</p>
</div>
<a class="thumbnail" href="${proj.url}" target="_blank">
	<img src="${imgUrl}" alt="${proj.title} image">
</a>
<div class="info info-bottom">
	<p class="author">by ${proj.author}</p>
</div>`;

	card.thumbnail = card.querySelector('.thumbnail');
	card.thumbnailImg = card.querySelector('.thumbnail img');
	card.info0 = card.querySelector('.info-top');
	card.info1 = card.querySelector('.info-bottom');

	if (proj.size == 1) {
		if (largeCardsCount % 2 == 0) cols[0].append(card);
		else cols[4].append(card);
		largeCardsCount++;
	} else {
		if (smallCardsCount % 2 == 0) cols[2].append(card);
		else cols[3].append(card);
		smallCardsCount++;
	}

	function playVid(card) {
		card.thumbnailImg.style.display = 'none';
		card.vid.width = card.offsetWidth;
		card.vid.style.display = 'block';
		card.vid.play();
	}

	card.addEventListener('mouseenter', () => {
		const thumbnailHeight = card.thumbnailImg.offsetHeight;
		card.thumbnail.style.height = thumbnailHeight + 'px';

		card.info0.style.display = 'flex';
		card.info1.style.display = 'flex';

		if (!card.vid && !card.dataset.vidUrl) return;

		if (!card.vid) {
			let vid = document.createElement('video');
			card.vid = vid;
			vid.src = card.dataset.vidUrl;
			vid.poster = card.thumbnailImg.src;
			vid.muted = true;
			vid.autoplay = true;
			vid.loop = true;
			card.thumbnail.append(vid);
			vid.addEventListener('canplay', () => {
				playVid(card);
			});
		} else playVid(card);
	});

	card.addEventListener('mouseleave', () => {
		card.info0.style.display = 'none';
		card.info1.style.display = 'none';

		if (card.vid) {
			card.thumbnailImg.style.display = 'block';
			card.vid.pause();
			card.vid.style.display = 'none';
		}
	});
}

document.addEventListener('DOMContentLoaded', function () {
	let mwp = document.getElementById('made_with_p5play');
	let images = mwp.querySelectorAll('img');
	let cur = 0;
	mwp.addEventListener('click', () => {
		images[cur].style.display = 'none';
		cur = (cur + 1) % images.length;
		images[cur].style.display = 'block';
	});
});
