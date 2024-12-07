# p5play-web

This repository contains the source code for p5play website hosted at <https://p5play.org>.

Use Google Chrome for the best experience, since it has the best HTML5 canvas performance.

Want to display your own mini p5.js or q5.js sketches on your website? Use [mie][] (mini editor), a package I created for doing just that!

## Contribute

Want to contribute? Take a look at the [p5play project planning page][]! There are many ways to contribute to the p5play project that don't require advanced programming skills.

For example, you can help by improving the documentation, [translations][], or creating tests for the library.

p5play aims to provide users with a well documented and easy to use API, but its implementation is complex and lacks comments explaining everything. I also had to take advantage of some obscure JS feature when developing p5play. The library is also quite large, with over 9000 lines of code. Fair warning, if you do want to contribute code to directly to p5play.js, you'll need to have advanced programming skills!

First, install Google Chrome, git, Visual Studio Code, bun or nodejs, and npm.

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

p5play software is multi-licensed for use under the p5play Personal License, p5play Educational License, and p5play Professional License.

Typical use of p5play by educators and commercial game developers requires a proprietary license. See the [Pro][] and [Teach][] pages for more information.

q5.js is LGPLv3 licensed. The Ace editor is BSD-3-Clause licensed. planck and marked are MIT licensed.

The example code and non-logo images shown in the mini editors on the p5play website are public domain works licensed under the CC0 license. You are free to copy and modify them for use in your own projects without attribution.

Everything else in this repository, "p5play-web", is owned by Quinton Ashley, all rights reserved. This content and its source is publicly available, but you may not copy the content to a greater extent than fair use allows.

## Credits

### Videos

Homepage:

https://www.pexels.com/video/a-smiling-young-man-sitting-on-the-floor-playing-video-games-12715397/

Pro:

reel0
https://www.pexels.com/video/close-up-video-of-people-playing-video-games-8127934/

reel1
https://www.pexels.com/video/young-woman-winning-a-computer-game-8128413/

reel2
https://www.pexels.com/video/a-man-using-smartphone-7252631/

reel3
https://www.pexels.com/video/freelance-courses-online-courses-4443250/

reel4
https://www.pexels.com/video/person-typing-in-a-keyboard-9070659/

reel5
https://www.pexels.com/video/girl-internet-computer-teenager-4498282/

Teach:

reel0
https://www.pexels.com/video/students-working-on-a-laptop-in-a-classroom-5200028/

reel1
https://www.pexels.com/video/teacher-and-students-together-looking-at-laptop-5200029/

reel2
https://www.pexels.com/video/man-using-laptop-in-classroom-9198421/

reel3
https://www.pexels.com/video/two-women-doing-some-school-works-5530408/

reel4
https://www.pexels.com/video/skater-girl-meeting-with-her-friends-5200356/

### Icons

[Certificate icons created by Freepik - Flaticon](https://www.flaticon.com/free-icon/certificate_3135807)

[Interactive Textbook icons created by Freepik - Flaticon](https://www.flaticon.com/free-icon/online-learning_2949758)

[Game Design icons created by wanicon - Flaticon](https://www.flaticon.com/free-icon/game_3938651)

[Teaching icons created by Eucalyp - Flaticon](https://www.flaticon.com/free-icon/lecture_2643368)

[School icons created by Freepik - Flaticon](https://www.flaticon.com/free-icon/school_2602414)

[Mobile-game icons created by Rabit Jes - Flaticon](https://www.flaticon.com/free-icon/mobile-game_4519176)

[Game Controller icons created by Freepik - Flaticon](https://www.flaticon.com/free-icon/game-control_6875330)

[Developer icons created by Becris - Flaticon](https://www.flaticon.com/free-icon/developer_5966282)

[Control Design icons created by Pixelmeetup - Flaticon](https://www.flaticon.com/free-icon/visuals_1792271)

## Release Checklist

- [ ] Manually edit the version number in `p5play-web/v3/p5play.js`
- [ ] Update the documentation, run `bun docs` in `p5play-web`
- [ ] Update type definitions, run `bun types` in `p5play-web`
- [ ] Minify and distribute, run `bun dist` in `p5play-web`
- [ ] Run `bun v` (minor update) or `bun V` (major update) in `p5play-web` and `p5play`
- [ ] Run `npm publish` in `p5play`

[licensing.md]: LICENSING.md
[p5play project planning page]: https://github.com/users/quinton-ashley/projects/5
[mie]: https://github.com/quinton-ashley/mie
[translations]: /lang/instructions.md
[Pro]: https://p5play.org/pro/
[Teach]: https://p5play.org/teach/
