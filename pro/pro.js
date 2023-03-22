// Parse the URL to extract the id_token parameter
(async () => {
	const log = console.log;

	// get the AWS Cognito id_token from the URL
	let params = location.search;
	if (!params) params = '?' + location.hash.slice(1);
	const urlParams = new URLSearchParams(params);
	const idToken = urlParams.get('id_token');

	window.idToken = idToken; // for debugging

	if (!idToken) return;

	// hide the token from the URL
	window.history.pushState(null, '', location.href.split(/[?#]/)[0]);

	let user = jwt_decode(idToken);
	log(user);

	// show section of page that requires authentication
	document.getElementById('noauth').style.display = 'none';
	document.getElementById('auth').style.display = 'block';

	// Set the user's name in the page
	document.getElementById('username').innerHTML = user.email;

	let apiUrl = 'https://ntaknarhb9.execute-api.us-west-2.amazonaws.com/prod';

	let userData = await (
		await fetch(apiUrl + '/getUserData', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${idToken}`
			}
		})
	).json();

	log(userData);
})();
