---
tags: post
layout: post
title: emoji-java — The missing emoji library for Java
date: 2014-01-11
---

A few weeks ago, I released a first version of _emoji-java_ on maven central! The lightweight library helps you easily handle emojis in your code.

![Emojis](/assets/blog/20150111/emojis-line.png)

Find [the code on Github](https://github.com/vdurmont/emoji-java) and spread the world ;)

<!--more-->

Some quick examples:

### Convert a string with unicode emojis to an html representation

    String str = "An 😀awesome 😃string with a few 😉emojis!";
    String result = EmojiParser.parseToHtml(myString);
    System.out.println(myString);
    // Prints:
    // "An &#128512;awesome &#128515;string with a few &#128521;emojis!"

### Convert a string with aliases to unicode emojis

    String str = "An :grinning:awesome :smiley:string &#128516;with a few :wink:emojis!";
    String result = EmojiParser.parseToUnicode(myString);
    System.out.println(myString);
    // Prints:
    // "An 😀awesome 😃string 😄with a few 😉emojis!"

### Browse the emojis by tags

    List<Emoji> emojis = EmojiManager.getForTag("happy");
    // Iterate over the emojis!

The complete documentation is on [Github](https://github.com/vdurmont/emoji-java) an pull requests are welcome :)
