function checkIfValid() {
	let $ = (selector) => document.getElementById(selector);

	let enableLogin = true;

	let inp = $('class_id');
	if (inp.value.length == 5) {
		inp.classList.remove('not-valid');
		inp.classList.add('is-valid');
	} else {
		inp.classList.remove('is-valid');
		inp.classList.add('not-valid');
		enableLogin = false;
	}

	inp = $('student_id');
	if (inp.value.length > 0) {
		inp.classList.remove('not-valid');
		inp.classList.add('is-valid');
	} else {
		inp.classList.remove('is-valid');
		inp.classList.add('not-valid');
		enableLogin = false;
	}

	let btn = $('studentLogin');
	btn.disabled = !enableLogin;
}

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

	if (res.status != 200) {
		let msg = await res.text();
		return alert(msg);
	}

	let usr = await res.json();
	usr.classID = f.classID;
	usr.studentID = f.studentID;
	usr.type = 'Student';
	usr.exp = Math.round(Date.now() / 1000) + 2600000;
	localStorage.setItem('p5playAccount', JSON.stringify(usr));

	open('index.html', '_self');
}
