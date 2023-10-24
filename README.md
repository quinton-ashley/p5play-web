# p5play-web

This repository contains the source code for p5play website hosted at <https://p5play.org>.

Use Google Chrome for the best experience, since it has the best HTML5 canvas performance.

Want to display your own mini p5.js or q5.js sketches on your website? Use [mie][] (mini editor), a package I created for doing just that!

## Contribute

Want to contribute? Take a look at the [p5play project planning page][]! There are many ways to contribute to the p5play project that don't require advanced programming skills.

For example, you can help by improving the documentation or creating tests for the library.

p5play aims to provide users with a well documented and easy to use API, but its implementation is complex and lacks comments explaining everything. I also had to take advantage of some obscure JS feature when developing p5play. The library is also quite large, with over 9000 lines of code. Fair warning, if you do want to contribute code to directly to p5play.js, you'll need to have advanced programming skills!

First, install Google Chrome, git, Visual Studio Code, bun, and npm.

Install this p5play-web repository using Git Bash for Windows or Terminal for macOS. First `cd` into the folder you want to install p5play-web in, then run:

```zsh
git clone https://github.com/quinton-ashley/p5play-web.git
```

`cd` into the p5play-web folder and install the development dependencies:

```zsh
bun i --dev
```

Use Visual Studio Code's "Live Server" extension to run the website locally.

Experiment with p5play by using the files in the `testing` folder.

Run Jest unit tests, located inside the `tests` folder, by running:

```zsh
jest tests
```

I have my p5play repositories organized like this on my computer. But it's only necessary for contributors to organize the repos like this if you want to use some of my npm scripts.

```
dev
├── ext
│   └── p5play-vscode
├── pkg
│   ├── p5play
│   ├── p5play-pro
│   └── p5play-types
└── web
		├── p5play-template
    └── p5play-web
```

## Licensing

See the [LICENSING.md][] file.

[licensing.md]: LICENSING.md
[p5play project planning page]: https://github.com/quinton-ashley/p5play/projects/1
[mie]: https://github.com/quinton-ashley/mie

## Release Checklist

- [ ] Manually edit the version number in `v3/p5play.js`
- [ ] Update the documentation, run `bun docs` in `p5play-web`
- [ ] Update type definitions, run `bun dist` in `p5play-types`
- [ ] Minify and distribute, run `bun dist` in `p5play-web`
- [ ] Run `bun v` (minor update) or `bun V` (major update) in `p5play-web` and `p5play`
- [ ] Run `npm publish` in `p5play`
