async function onStudentLogin(evt) {
	evt.preventDefault();

	let apiUrl = 'https://ntaknarhb9.execute-api.us-west-2.amazonaws.com/prod/p5play-public';
	let res = await fetch(apiUrl + '?req=studentLogin', {
		method: 'GET',
		headers: {
			Authorization: idToken,
			'Content-Type': 'application/json'
		}
	});

	if (res.statusCode >= 400) {
		alert('Invalid class ID or student ID. Try typing it again or ask your teacher for help.');
		return;
	}

	let data = await res.json();
	localStorage.userData = data;

	open('account');
}
