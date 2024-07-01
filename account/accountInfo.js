function showAuthContent() {
	let $ = (n) => document.getElementById(n);
	let usr = p5playAccount;
	$('account-type').innerHTML = usr.type;
	$('username').innerHTML = usr.full_name.split(' ')[0];
}
