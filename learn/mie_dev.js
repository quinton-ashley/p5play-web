if (typeof window.mie == 'undefined') window.mie = [];
else window.mie = Object.assign([], window.mie);
mie.lang ??= {
	javascript: {
		play: function (code) {}
	}
};
mie.bases = {};

mie.onload = () => {
	class MiniEditor {
		constructor(script) {
			this.id = mie.length;
			this.lang = script.type.slice(9) || 'javascript';

			let code = script.innerHTML.trim();

			let attrs = script.getAttributeNames();
			let baseIdx = attrs.findIndex((v) => v.startsWith('base-'));
			if (baseIdx != -1) {
				let baseKey = attrs[baseIdx].split('-')[1];
				mie.bases[baseKey] = code.slice(0, code.lastIndexOf('}'));
			}
			let props = {};
			for (let prop of attrs) {
				props[prop] = script.getAttribute(prop) || true;
			}

			let lines = props.lines || 0;
			if (!lines) {
				for (let c of code) {
					if (c == '\n') lines++;
				}
				lines++;
			}

			this.base = props.base;

			let mini = document.createElement('div');
			mini.className = 'mie ' + this.lang;
			if (props.horiz) mini.className += ' horiz';
			else mini.className += ' vert';
			mini.id = 'mie-' + this.id;
			mini.style = script.style.cssText;
			script.after(mini);
			this.elem = mini;

			let title = document.createElement('div');
			title.className = 'mie-title';
			let logo = document.createElement('div');
			logo.className = 'mie-logo';
			title.append(logo);
			let span = document.createElement('span');
			span.innerHTML += props.name || props.title || 'sketch';
			title.append(span);
			mini.append(title);

			if (props['editor-btn']) {
				let editBtn = document.createElement('button');
				editBtn.className = 'mie-edit';
				editBtn.innerHTML = '{ }';
				editBtn.onclick = () => {
					this.toggleEditor();
				};
				title.append(editBtn);
			}

			let playBtn = document.createElement('button');
			playBtn.className = 'mie-play';
			playBtn.title = 'replay';
			playBtn.onclick = () => this.play();
			title.append(playBtn);

			let main = document.createElement('div');
			main.className = 'mie-main';
			mini.append(main);

			let preview = document.createElement('div');
			preview.id = 'mie-preview-' + this.id;
			preview.className = 'mie-preview';
			main.append(preview);
			this.previewElem = preview;

			if (mie.editorEnabled) {
				let ed = document.createElement('div');
				ed.id = 'mie-editor-' + this.id;
				ed.className = 'mie-editor';
				ed.innerHTML = code;
				main.append(ed);
				this.editorElem = ed;

				let editor = ace.edit('mie-editor-' + this.id);
				editor.setOptions({
					minLines: 1,
					maxLines: lines,
					// fontSize: '14px',
					showFoldWidgets: false,
					showGutter: props.gutter || false,
					tabSize: 2,
					enableBasicAutocompletion: [
						{
							getCompletions: (editor, session, pos, prefix, callback) => {
								// note, won't fire if caret is at a word that does not have these letters
								callback(null, mie.lang[this.lang].completions || []);
							}
						}
					],
					enableLiveAutocompletion: true
				});
				editor.session.on('changeMode', function (e, session) {
					if ('ace/mode/javascript' === session.getMode().$id) {
						if (!!session.$worker) {
							session.$worker.send('setOptions', [
								{
									esversion: 11,
									esnext: false
								}
							]);
						}
					}
				});
				editor.session.setMode('ace/mode/javascript');

				editor.setTheme('ace/theme/xcode');
				editor.session.setUseWrapMode(true);
				editor.renderer.setShowPrintMargin(false);

				this.editor = editor;
				this.sketch = null;

				if (props['hide-editor']) {
					this.hideEditor();
				}
			} else {
				this.code = code;
			}

			this.play();

			if (props.hide || props.hidden) {
				mini.style.display = 'none';
			}

			/* auto reload after the specified amount of seconds */
			if (props.reload) {
				(async () => {
					while (props.reload) {
						await new Promise((r) => setTimeout(r, props.reload * 1000));
						this.play();
					}
				})();
			}
		}

		play() {
			mie.lang[this.lang].remove.call(this);
			let code = this.code || this.editor.getValue().trim();
			this.player = mie.lang[this.lang].play.call(this, code);
		}

		toggleEditor() {
			if (this.editorElem.style.display == 'none') {
				this.showEditor();
			} else {
				this.hideEditor();
			}
		}

		showEditor() {
			let ed = this.editorElem;
			let pr = this.previewElem;
			ed.style.display = 'block';
			pr.style.width = 'unset';
			this.editor.focus();
		}

		hideEditor() {
			let ed = this.editorElem;
			let pr = this.previewElem;
			pr.style.width = '100%';
			ed.style.display = 'none';
		}

		remove() {
			mie.lang[this.lang].remove.call(this);
			this.editor.destroy();
			this.editor.container.remove();
			this.elem.remove();
		}
	}

	mie.loadMinis = function (elem) {
		elem = elem || document;
		let scripts = [...elem.getElementsByTagName('script')];
		for (let script of scripts) {
			if (script.type.includes('text/mie')) {
				mie.push(new MiniEditor(script));
			}
		}
	};

	Object.defineProperty(mie, 'theme', {
		get: () => mie._theme,
		set: (theme) => {
			if (theme == 'dark') {
				for (let mini of mie) {
					mini.editor.setTheme('ace/theme/dracula');
				}
			} else {
				for (let mini of mie) {
					mini.editor.setTheme('ace/theme/xcode');
				}
			}
			mie._theme = theme;
		}
	});

	if (mie.autoLoad !== false) mie.autoLoad = true;
	if (mie.autoLoad) mie.loadMinis();

	if (mie.ready) mie.ready();
};

if (typeof window.ace != 'undefined') {
	mie.editorEnabled = true;
	ace.config.set('basePath', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.9.5/');
	ace.config.loadModule('ace/ext/language_tools', mie.onload);
} else {
	console.log('mie will run without the ace editor, which was not loaded.');
	mie.onload();
}
