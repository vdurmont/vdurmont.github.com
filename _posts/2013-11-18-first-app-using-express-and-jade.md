---
layout: post
title: Your first app with Node.js, Express.js and Jade
date: 2013-11-18 18:41:00
---

At Ubleam, I often need to prototype small webapps for our clients. The goal is to create a specific product in the shortest possible period of time in order to test the market on a feature.

I choose not to integrate those apps directly in our main API because it would require too much work to meet the quality of service I expect: response times, stress tests, graphic integration in our services, etc. I prefer to build small and flexible apps and invest time and efforts to integrate them when we feel the market is ready.

I often develop those apps on a Node.js base because it's an easy way to get tangible results in a very short time. In this post, I will show you how to set up a basic webapp using Node.js, Express.js and Jade.

<!--more-->

# Technologies

Let's start with a quick presentation of the technologies used in this post:
* [Node.js](http://nodejs.org) is a platform built on top of Chrome javascript engine which provides a simple way to build javascript apps on the server side.
* [Express.js](http://expressjs.com) is a lightweigth and flexible framework providing an easy way to build node-based web applications.
* [Jade](http://jade-lang.com/) is a template engine built for node for producing XML/HTML files. It provides an indentation-based clean and readable syntax, along with a few helpers and filters.

# Requirements

In order to make the following code work, you must have installed `node` and `npm` on your computer.

# Set up a basic express app

To start with, create a `package.json` file. It describes your app and its dependencies:

{% gist 7360258 %}

Then create your main javascript file `app.js`. After importing express, this file creates an app and listens to get requests on the path `/`. We also give the possibility to provide a `name` query parameter in order to personalize our response.

{% gist 7360435 %}



Simply run `npm install && node app.js` and open a browser to [http://localhost:3333](http://localhost:3333).

![Hello World screenshot](/assets/img/express-jade-first-app-screenshot_step1.png)

You can also try with a parameter [http://localhost:3333?name=Vincent](http://localhost:3333?name=Vincent).

![Hello Vincent screenshot](/assets/img/express-jade-first-app-screenshot_step1_bis.png)

# Add Jade template engine

The previous page is quite awesome but we can do better ;)  
Imagine that the parameter is a database id and that the page would entirely change its content according to the given id.
We could write HTML in the response but our code would quickly become ugly. That's when Jade rescues us!

Jade provides us a really simple way to write our HTML page template and to inject an object with our variables.

Let's add Jade to our dependencies:
{% gist 7360992 %}

(Don't forget to run `npm install` to update the dependencies!)

We can now update our `app.js` file to indicate that express has now to use jade as a template engine.

We also render a different page according to the presence or the lack of the `name` parameter.

{% gist 7361496 %}

We created 3 jade files in the `views` directory. `layout.jade` contains the common structure and styles of the app. `world.jade` and `user.jade` extend the layout and define a specific content.

{% gist 7361513 %}

{% gist 7361516 %}

{% gist 7361534 %}

You will now get the following page:

For [http://localhost:3333](http://localhost:3333):

![Hello World screenshot 2](/assets/img/express-jade-first-app-screenshot_step2.png)

For [http://localhost:3333?name=Vincent](http://localhost:3333?name=Vincent)

![Hello Vincent screenshot 2](/assets/img/express-jade-first-app-screenshot_step2_bis.png)

# Going further

As you can see, setting up a webapp using node, express and jade is really quick and easy. From this point, it is possible to create a website to test any web feature you may have to experiment.

Obviously, this post described a really basic example. There is so much more to see and I would start with:
* Diving a little deeper in Jade syntax,
* Getting a look at Stylus which is the Jade equivalent for CSS
* Adding database support to our express app
* Handling the errors in express
* Etc.

<a href="http://github.com/vdurmont/express-jade-example" class="btn btn-primary">Download the code of this example</a>