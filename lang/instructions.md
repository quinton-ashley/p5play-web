# p5play-web translation

## Introduction

First time translating a website? No problem! This guide will walk you through the process.

In the `lang` folder, you'll find a folder for each language that p5play-web has been translated into. These folders use two letter [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) language codes. For example, the folder for English is called `en`.

Inside the `lang/en` folder, you'll find two types of files: `json` and `md`.

The `md` files are markdown files. [Markdown](https://www.markdownguide.org/) is a simple way to format text. For p5play-web, I used markdown to write whole paragraphs, like you can see on the home page and "Learn" reference pages. There are several `md` files in each language folder, one for each page of the website.

`json` (JavaScript Object Notation) files are used to store structured data. For p5play-web, a single `json` file for each language provides translations for all the short form text on the website, such as button labels or error messages.

## How to translate

You can edit `md` and `json` files in any text editor, but I recommend using Visual Studio Code.

Take a look at the `lang/en/index.md` file. The first line contains

```md
# 0
```

In markdown, a single hash `#` is used for h1 headers (the biggest headers in HTML), but for p5play-web translation it indicates a section of the page that the following markdown text belongs to. Each section of markdown ends with another line that starts with a single hash `#`. To better understand how this markdown sectioning works, compare the `lang/en/index.md` file to the homepage of `p5play.org`.

## Testing your translation

If you'd like to test your translation, you'll need to use the `main/build.js` nodejs script.

nodejs let's you run JavaScript code outside of a browser, in the terminal (also called the command line). You can install nodejs from [nodejs.org](https://nodejs.org/en/

The `main/build.js` script uses nodejs to read the `json` and `md` files in the `lang` directory and generate the HTML files for the website.

On macOS the default terminal is called "Terminal" and is located in the Utilities folder inside the Applications folder. On Windows, the default terminal is called "Command Prompt" and is located in the Accessories folder inside the Start Menu.

Open `p5play-web` directory in your terminal. Then, run the following command:

```bash
node main/build.js [languageCode]
```

Use the same language code that you did for the folder name in the `lang` directory. For example, to build the Spanish translation, you would run:

```
node main/build.js es
```
