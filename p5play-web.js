window.setup = () => {};
window.draw = () => {};

p5.prototype.registerMethod('init', async function p5PlayWebInit() {
	this._incrementPreload();

	let args = {};
	let url = location.href.split('?');
	if (url.length > 1) {
		let params = new URLSearchParams(url[1]);
		for (let pair of params.entries()) {
			args[pair[0]] = pair[1];
		}
	}

	let { host, user, title, sketch } = args;

	// redirect to the home page
	if (!user || (!title && !sketch)) {
		window.location.replace('home.html');
	}

	title ??= sketch;
	sketch ??= 'sketch';

	let src;
	if (!host || host == 'gh') {
		src = 'https://raw.githubusercontent.com/' + user + '/' + title + '/main/' + sketch + '.js';
	} else if (host == 'ghp') {
		src = `https://${user}.github.io/${title}/${sketch}.js`;
	}

	const script = document.createElement('script');
	file = await (await fetch(src)).text();
	script.innerHTML = 'log(`running: ' + src + '`);\n' + file;
	document.body.appendChild(script);
	await this.delay(100);
	this._decrementPreload();
});
