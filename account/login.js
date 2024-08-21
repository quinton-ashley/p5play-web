async function onStudentLogin(evt) {
	evt.preventDefault();

	const f = Object.fromEntries(new FormData(evt.target).entries());

	let apiUrl = 'https://ntaknarhb9.execute-api.us-west-2.amazonaws.com/prod/p5play-public';
	let reqParams = `?req=studentLogin&classID=${f.classID}&studentID=${f.studentID}`;
	let res = await fetch(apiUrl + reqParams, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (res.status >= 400) {
		alert('Invalid class ID or student ID. Try typing it again or ask your teacher for help.');
		return;
	}

	let data = await res.json();
	data.type = 'Student';
	localStorage.setItem('p5playAccount', data);

	open('account');
}
