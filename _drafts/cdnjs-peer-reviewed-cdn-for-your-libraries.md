---
layout: post
title: CDNJS — Peer reviewed CDN for your javascript libraries
---

When I build a web app, I try to always import the libraries I use from a CDN.

The CDNs (or Content Delivery Network) are large distributed systems of servers deployed all over the world that will serve content to end-users with high availability and high performance.

Moreover, if you use a popular library, there is a great probability that your user went to another website that uses it. If this other website also use the same CDN, your end-user will already have the library in his browser cache and the loading time will be greatly reduced.

CDNs are great for the most trending libraries: jQuery, Bootstrap, underscorejs, etc. But what about all the others?

<!--more-->

There is a solution! [CDNJS](http://cdnjs.com).

CDNJS works like any other CDN but anyone can add a library on it. You just have to fork their [Github repository](https://github.com/cdnjs/cdnjs), add your library, open a pull request and BOOM! your library is available to the entire world :)

For example, I just added [userinfo-js](https://github.com/vdurmont/userinfo-js), the javascript wrapper for [userinfo.io](http://userinfo.io) on CDNJS.

Here are the files I added:

    userinfo/
        1.0.0/
            userinfo.min.js
        package.json

You just have to define a few things in your [package.json](https://github.com/vdurmont/cdnjs/blob/master/ajax/libs/userinfo/package.json), like:

* Name and description
* Current version
* Authors and contributors
* Auto-update information (basically a link to your Github repository)
* License
* Etc.

I really think that's an awesome initiative: it enables any developer to find the javascript libraries he needs in seconds and the peer-reviewed system works like a charm!

If you write javascript, you should try it!
