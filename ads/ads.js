// Parse the URL to extract the id_token parameter
const urlParams = new URLSearchParams(window.location.search);
const idToken = urlParams.get('id_token');

// Log the id_token to the console
console.log(idToken);

if (idToken) {
	let user = jwt_decode(idToken);
	console.log(user);
}
