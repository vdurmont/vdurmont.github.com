---
tags: post
layout: post
title: Compile your Markdown with Grunt
date: 2014-04-07
---

These days, I spend a lot of time writing documentation and procedures in order to share my knowledge of Ubleam's system and help the team handling the servers when my contract will be over.

I decided to use **markdown** since I think the syntax is really easy to learn (anyone will be able to edit my work) and it compiles to HTML (providing a good way to visualize the content).

The drawback is that even if a lot of text editors handle the markdown compilation, I would have to make sure that my HTML files were updated each time I made a modification in a markdown.

Then I discovered [grunt-markdown](https://github.com/treasonx/grunt-markdown).

<!--more-->

_grunt-markdown_ is a lightweight [Grunt](http://gruntjs.com/) module that enables you to compile markdown to HTML.

My file structure looks like it:

```bash
./
  Gruntfile.js
  package.json
  file1.md
  file2.md
  file3.md
  ...
  html/
    file1.html
    file2.html
    file3.html
    ...
```

The `package.json` is:

```json
{
  "name": "mydocumentation",
  "private": true,
  "version": "0.0.1",
  "description": "My documentation.",
  "author": "Vincent DURMONT <vdurmont@gmail.com>",
  "devDependencies": {
    "grunt": "0.4.4",
    "grunt-markdown": "0.5.0"
  }
}
```

Don't forget to run `npm install` in order to retrieve the dependencies.

Then, I simply defined a task in the `Gruntfile.js`:

```js
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    markdown: {
      all: {
        files: [
          {
            expand: true,
            src: "./*.md",
            dest: "html/",
            ext: ".html",
          },
        ],
      },
    },
  });

  grunt.loadNpmTasks("grunt-markdown");
  grunt.registerTask("default", ["markdown:all"]);
};
```

Finally, a simple:

```bash
grunt
```

in the root directory will generate all my HTML files. Easy!

Check out [grunt-markdown on Github](https://github.com/treasonx/grunt-markdown).
