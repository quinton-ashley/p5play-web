function showAuthContent() {
	let $ = (n) => document.getElementById(n);
	let usr = p5playAccount;
	$('account-type').innerHTML = usr.type;
	$('username').innerHTML = usr.full_name.split(' ')[0];

	loadUserData();
}

async function loadUserData() {
	const idToken = localStorage.getItem('idToken');

	let apiUrl = 'https://ntaknarhb9.execute-api.us-west-2.amazonaws.com/prod/p5play-server';
	let res = await (
		await fetch(apiUrl + '?req=getUserData', {
			method: 'GET',
			headers: {
				Authorization: idToken,
				'Content-Type': 'application/json'
			}
		})
	).json();

	console.log(res);
}
