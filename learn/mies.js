if (typeof window.mies == 'undefined') window.mies = [];
else window.mies = Object.assign([], window.mies);
mies.lang ??= {
	javascript: {
		play: function (code) {}
	}
};
mies.bases = {};

ace.config.set('basePath', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.9.5/');
ace.config.loadModule('ace/ext/language_tools', function () {
	class MiniEditor {
		constructor(script) {
			this.id = mies.length;
			this.lang = script.type.slice(9) || 'javascript';

			let code = script.innerHTML.trim();

			let attrs = script.getAttributeNames();
			let baseIdx = attrs.findIndex((v) => v.startsWith('base-'));
			if (baseIdx != -1) {
				let baseKey = attrs[baseIdx].split('-')[1];
				mies.bases[baseKey] = code.slice(0, code.lastIndexOf('}'));
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
			mini.className = 'mies ' + this.lang;
			if (props.horiz) mini.className += ' horiz';
			else mini.className += ' vert';
			mini.id = 'mies-' + this.id;
			mini.style = script.style.cssText;
			script.after(mini);
			this.elem = mini;

			let title = document.createElement('div');
			title.className = 'mies-title';
			let logo = document.createElement('div');
			logo.className = 'mies-logo';
			title.append(logo);
			let span = document.createElement('span');
			span.innerHTML += props.name || props.title || 'sketch';
			title.append(span);
			mini.append(title);

			if (props['editor-btn']) {
				let editBtn = document.createElement('button');
				editBtn.className = 'mies-edit';
				editBtn.innerHTML = '{ }';
				editBtn.onclick = () => {
					this.toggleEditor();
				};
				title.append(editBtn);
			}

			let playBtn = document.createElement('button');
			playBtn.className = 'mies-play';
			playBtn.onclick = () => this.play();
			title.append(playBtn);

			let main = document.createElement('div');
			main.className = 'mies-main';
			mini.append(main);

			let preview = document.createElement('div');
			preview.id = 'mies-preview-' + this.id;
			preview.className = 'mies-preview';
			main.append(preview);
			this.previewElem = preview;

			let ed = document.createElement('div');
			ed.id = 'mies-editor-' + this.id;
			ed.className = 'mies-editor';
			ed.innerHTML = code;
			main.append(ed);
			this.editorElem = ed;

			let editor = ace.edit('mies-editor-' + this.id);
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
							callback(null, mies.lang[this.lang].completions || []);
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
			mies.lang[this.lang].remove.call(this);
			let code = this.editor.getValue().trim();
			this.player = mies.lang[this.lang].play.call(this, code);
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
			mies.lang[this.lang].remove.call(this);
			this.editor.destroy();
			this.editor.container.remove();
			this.elem.remove();
		}
	}

	mies.loadMinis = function (elem) {
		elem = elem || document;
		let scripts = [...elem.getElementsByTagName('script')];
		for (let script of scripts) {
			if (script.type.includes('text/mie')) {
				mies.push(new MiniEditor(script));
			}
		}
	};

	Object.defineProperty(mies, 'theme', {
		get: () => mies._theme,
		set: (theme) => {
			if (theme == 'dark') {
				for (let mini of mies) {
					mini.editor.setTheme('ace/theme/dracula');
				}
			} else {
				for (let mini of mies) {
					mini.editor.setTheme('ace/theme/xcode');
				}
			}
			mies._theme = theme;
		}
	});

	if (mies.autoLoad !== false) mies.autoLoad = true;
	if (mies.autoLoad) mies.loadMinis();

	if (mies.ready) mies.ready();
});
