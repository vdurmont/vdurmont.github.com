---
layout: post
title: How to create an AMD module?
---

When I was writing the javascript library for [userinfo.io](http://userinfo.io), I wanted anyone to be able to use it easily.

Most of the developers simply include the scripts in their pages:

    <script type="text/javascript" src="myscript.js"></script>

But when you are writing more important javascript projects, it is frequent to use a dependency mechanism such as [requirejs](http://requirejs.org/), which is based on the [AMD API](https://github.com/amdjs/amdjs-api/wiki/AMD).  
Instead of assigning your module to a global variable, you can define an AMD module which will be imported in the project under the name the developer will choose.

<!--more-->

Let's say that my module `Hello` has 2 methods: `print` and `hasPrint`.

    var Hello = function() {
      var done = false;
      return {
        print: function(name) {
          if (!name) {
            name = "World";
          }
          console.log("Hello "+name+"!");
          done = true;
        },
        hasPrint: function() {
          return done;
        }
      }
    };

I would use it this way:

    var h = new Hello();
    console.log(h.hasPrint()); // false
    h.print(); // Hello World!
    console.log(h.hasPrint()); // true
    h.print("Vincent"); // Hello Vincent!


To make it available as an AMD module, we just have to encapsulate the code in a define function:

    (function (root, factory) {
      if (typeof define === 'function' && define.amd) {
        define(factory);   // If we use a dependency mechanism, our method can be injected
      } else {
        root.Hello = factory();    // If we don't, let's fallback on a global variable
      }
    }(this, function() {
      return function() {
        var done = false;
        return {
          print: function(name) {
            if (!name) {
              name = "World";
            }
            console.log("Hello "+name+"!");
            done = true;
          },
          hasPrint: function() {
            return done;
          }
        }
      }
    }));

The usage stays really simple and the developper can choose to rename your module (here, I renamed Hello to Hi):

    requirejs.config({
      "paths": {
        "Hi": "./hello-amd"
      }
    });
    require(['Hi'], function(Hi) {
      var h = new Hi();
      console.log(h.hasPrint()); // false
      h.print(); // Hello World!
      console.log(h.hasPrint()); // true
      h.print("Vincent"); // Hello Vincent!
    });

By adding this tiny amount of code, you can now provide you library to those who use AMD which is priceless :)

You can find the full code of this example [on this gist](https://gist.github.com/vdurmont/518197dbe0714053e0ca).

You can find more information on the dedicated page of the [website of requirejs](http://requirejs.org/docs/whyamd.html).
