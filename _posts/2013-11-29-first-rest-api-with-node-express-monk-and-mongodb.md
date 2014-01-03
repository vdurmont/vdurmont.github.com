---
layout: post
title: First REST API with Node, Express.js, Monk and MongoDB
---

One of my <a href="/2013/11/18/first-app-using-express-and-jade.html">previous posts</a> presented how to quickly build a Node-based webapp with a templating system. Today, let's use the same technology stack to build our first REST Web API.

In my job and my personal projects, I alternatively take the positions of frontend and backend developer. In order to separate the responsabilities of each part of the job, the best way is to define an interface. Providing a web API for a service enables us to plug in any frontend display (websites, mobile apps, etc.).

# Technologies

Here is a quick presentation of the technologies used in this post, do not hesitate to check them out:
* [Node.js](http://nodejs.org) is a platform built on top of Chrome javascript engine which provides a simple way to build javascript apps on the server side.
* [Express.js](http://expressjs.com) is a lightweigth and flexible framework providing an easy way to build node-based web applications.
* [MongoDB](http://www.mongodb.org/) is an open-source document database, the leading NoSQL database. Awesome to store JSON documents in a webapp.
* [Monk](https://github.com/LearnBoost/monk) is a tiny wrapper built on top of [MongoSkin]() which provides an abstraction layer to access a MongoDB from Node.

# Scenario

In this post, I will build a simple bug tracker. A bug will be defined as a title, a date of creation, a status and the name of the assignee. Here is an example:

{% gist 7664565 %}

We will then be able to create, read, update and delete bugs in the service.

# Set up our express app

To start with, create a `package.json` file with the following dependencies and launch `npm install`.

{% gist 7664483 %}

Start a MongoDB database ([download here](http://www.mongodb.org/)) with `mongod --dbpath /tmp`.

We will then create the main file for our webapp. Here are the endpoints which will be accessible:
* `GET /bugs`: returns the list of the bugs,
* `POST /bugs`: creates a bug,
* `GET /bugs/<id>`: returns the specified bug,
* `PUT /bugs/<id>`: updates and returns the specified bug,
* `DELETE /bugs/<id>`: deletes the specified bug

In order to keep our `app.js` file small and clear, we just declare the endpoints and write our business logic in `routes.js`.

{% gist 7664504 %}

The file `routes.js` contains all the business logic. It starts by importing a `config.json` file which contains the database information and establishes a connexion with the database by using Monk.

Then we execute the requests in the database to store, retrieve or remove the requested data.

{% gist 7664549 %}

{% gist 7664522 %}

Simply run `npm install && node app.js` and open a browser to [http://localhost:3333](http://localhost:3333). If you see an empty json array (`[]`), it's okay :)

If you want to test the service, use an HTTP Client (for example, the Google Chrome extension [XHR Poster](https://chrome.google.com/webstore/detail/xhr-poster/akdbimilobjkfhgamdhneckaifceicen) is perfect for testing an API).

# Going further

The API was really easy to set up! But there is a lot of remaining problems like:
* How to validate our models?
* How to handle the authentication?
* How to test my API?
* Etc.

<a href="http://github.com/vdurmont/express-monk-mongodb-example" class="btn btn-primary">Download the code of this example</a>