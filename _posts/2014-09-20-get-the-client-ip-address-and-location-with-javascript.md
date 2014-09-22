---
layout: post
title: Get the client IP address and location with Javascript
---

In one of my projects, I needed a reliable way to get a visitor's IP address and his location in Javascript, without a server. There is a wonderful [thread](http://stackoverflow.com/questions/391979/get-client-ip-using-just-javascript) on StackOverflow which gives a lot of solutions but when I tried them, they were either not working (400/500 errors) or not returning the data I needed.

So I decided it would be fun to write a small webservice to do just that: [http://userinfo.io](http://userinfo.io).

<!--more-->

It's really simple to use: get the library from [Github](http://github.com/vdurmont/userinfo-js), insert it in your code and call the method:

    UserInfo.getInfo(function(data, err) {
        if (err) {
            // Do something with the error
        } else {
            // Do something with the data
        }
    });

Check it out on [Github](http://github.com/vdurmont/userinfo-js) and do not hesitate to send me your remarks!
