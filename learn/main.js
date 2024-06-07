{
	let pref = localStorage.getItem('darkMode');
	pref ??= window.matchMedia('prefers-color-scheme: dark').matches ? 'dark' : 'light';

	document.body.className = pref;
}

function toggleDarkMode() {
	if (document.body.className == 'dark') {
		document.body.className = 'light';
	} else {
		document.body.className = 'dark';
	}
	if (typeof setEditorThemes != 'undefined') setEditorThemes();

	// Save the preference
	localStorage.setItem('darkMode', document.body.className);
}
