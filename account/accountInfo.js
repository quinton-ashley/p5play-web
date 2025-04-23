let $ = (n) => document.getElementById(n.slice(1));

function showAuthContent() {
	let usr = p5playAccount;
	$('#account-type').textContent = usr.type;
	$('#account-id').textContent = usr.username;
	let name;
	if (usr.type == 'Student') {
		name = usr.classID + '-' + usr.studentID;
	} else {
		name = usr.full_name.split(' ')[0];
		loadUserData();
	}
	$('#username').textContent = name;
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

	let account = res;

	let el;
	el = $('#account-pro');
	if (account.pro) el.textContent = '✅ since ' + Date(account.pro);
	else el.textContent = '❌ No';
}
