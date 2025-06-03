// https://www.npmjs.com/package/jwt-decode

function b64DecodeUnicode(str) {
	return decodeURIComponent(
		atob(str).replace(/(.)/g, (m, p) => {
			let code = p.charCodeAt(0).toString(16).toUpperCase();
			if (code.length < 2) {
				code = '0' + code;
			}
			return '%' + code;
		})
	);
}
function base64UrlDecode(str) {
	let output = str.replace(/-/g, '+').replace(/_/g, '/');
	switch (output.length % 4) {
		case 0:
			break;
		case 2:
			output += '==';
			break;
		case 3:
			output += '=';
			break;
		default:
			throw 'base64 string is not of the correct length';
	}
	try {
		return b64DecodeUnicode(output);
	} catch (err) {
		return atob(output);
	}
}
function jwtDecode(token, options) {
	if (typeof token !== 'string') {
		throw 'Invalid token specified: must be a string';
	}
	options || (options = {});
	const pos = options.header === true ? 0 : 1;
	const part = token.split('.')[pos];
	if (typeof part !== 'string') {
		throw `Invalid token specified: missing part #${pos + 1}`;
	}
	let decoded;
	try {
		decoded = base64UrlDecode(part);
	} catch (e) {
		throw `Invalid token specified: invalid base64 for part #${pos + 1} (${e.message})`;
	}
	try {
		return JSON.parse(decoded);
	} catch (e) {
		throw `Invalid token specified: invalid json for part #${pos + 1} (${e.message})`;
	}
}

// Parse the URL to extract the id_token parameter
(async () => {
	{
		let acc = localStorage.getItem('p5playAccount');
		if (acc) window.p5playAccount = JSON.parse(acc);
	}

	// if the user is trying to access the account page
	// and the token is expired, force the user to login again
	// otherwise they can access the page with an expired token
	let expired;
	if (window.p5playAccount) {
		let now = Date.now() / 1000;
		expired = (location.pathname.includes('account') && p5playAccount.tokenExp < now) || p5playAccount.exp < now;
	}

	// check if there's no token
	// expired tokens are accepted so users don't have to login again
	// unless the user is trying to access the account page
	if (!window.p5playAccount || expired) {
		// tries to get the token from the URL
		let params = location.search;
		if (!params) params = '?' + location.hash.slice(1);
		const urlParams = new URLSearchParams(params);
		let idToken = urlParams.get('id_token');

		let usr;
		if (idToken) {
			try {
				usr = jwtDecode(idToken);
			} catch (e) {
				console.error(e);
				idToken = null;
			}
		}

		// if there's no token, display the unauthorized section of the page
		if (!idToken) {
			let els = document.getElementsByClassName('unauth');
			for (let el of els) el.style.display = 'block';
			if (window.showUnauthContent) await showUnauthContent();
			return;
		}

		// hide the token from the URL
		window.history.pushState(null, '', location.href.split(/[?#]/)[0]);

		// save the token in local storage
		localStorage.setItem('idToken', idToken);

		window.p5playAccount = {
			birthdate: usr.birthdate,
			company: usr.family_name,
			country: usr.address?.formatted,
			email: usr.email,
			tokenExp: usr.exp,
			exp: usr.exp + 13500000,
			full_name: usr.given_name,
			username: usr['cognito:username'],
			type: usr.middle_name,
			locale: usr.locale
		};

		localStorage.setItem('p5playAccount', JSON.stringify(p5playAccount));
	}

	let els = document.getElementsByClassName('unauth');
	for (let el of els) el.style.display = 'none';
	els = document.getElementsByClassName('auth');
	for (let el of els) el.style.display = 'block';

	// populate section of page that requires authentication
	if (window.showAuthContent) await showAuthContent();
})();
