function showAuthContent() {
	let $ = (n) => document.getElementById(n);
	let usr = p5playAccount;
	$('account-type').innerHTML = usr.middle_name;
	$('username').innerHTML = usr.given_name.split(' ')[0];
}
