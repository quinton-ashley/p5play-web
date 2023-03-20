// Parse the URL to extract the id_token parameter
let params = location.search;
if (!params) params = '?' + location.hash.slice(1);
const urlParams = new URLSearchParams(params);
const idToken = urlParams.get('id_token');

if (idToken) {
	window.history.pushState(null, '', location.href.split(/[?#]/)[0]);
	let user = jwt_decode(idToken);
	console.log(user);

	// show section of page that requires authentication
	document.getElementById('noauth').style.display = 'none';
	document.getElementById('auth').style.display = 'block';

	// Set the user's name in the page
	document.getElementById('username').innerHTML = user.email;
}