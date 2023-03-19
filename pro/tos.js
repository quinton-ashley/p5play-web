// load the tos from the markdown file
// and render it to the page
fetch('tos.md')
	.then((response) => response.text())
	.then((text) => {
		document.getElementById('tos').innerHTML = marked.parse(text);
	});
