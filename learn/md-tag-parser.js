{
	let tags = document.getElementsByTagName('script');

	for (let tag of tags) {
		if (tag.type != 'text/md') continue;
		let md = document.createElement('md');
		md.innerHTML = marked.parse(tag.innerHTML || 'error');
		tag.after(md);
	}
}
