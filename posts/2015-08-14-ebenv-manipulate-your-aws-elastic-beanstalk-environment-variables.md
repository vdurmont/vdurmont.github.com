---
tags: post
layout: post
title: ebenv — Manipulate your AWS ElasticBeanstalk environment variables
date: 2015-08-14
---

Recently, I used AWS ElasticBeanstalk a lot to deploy a few applications and it is always a pain to configure all the environment variables I need to run my applications.

To solve this problem, I published a small application that enables you to manipulate your environment directly from your configuration files: **[ebenv](https://github.com/vdurmont/ebenv)**.

<!--more-->

On one of my most recent projects, here is the type of configuration file I use:

```txt
myproject.aws.access_key=AAAAAAAAAAAAAAAAAAAA
myproject.aws.secret_key=AAAAAAAAAAAAAAAAAAAA

myproject.db.password=AAAAAAAAAAAAAAAAAAAA
myproject.db.show_sql=false
myproject.db.type=MYSQL
myproject.db.url=jdbc:mysql://localhost:3306/myproject
myproject.db.username=root

myproject.files.bucket=/tmp/myprojectfiles
myproject.files.type=LOCAL

myproject.github.client_id=AAAAAAAAAAAAAAAAAAAA
myproject.github.client_secret=AAAAAAAAAAAAAAAAAAAA

myproject.mandrill.enabled=true
myproject.mandrill.api_key=AAAAAAAAAAAAAAAAAAAA

myproject.url.api=http://localhost:9997
myproject.url.static=http://localhost:9998
myproject.url.website=http://localhost:9999

# 30 minutes
myproject.worker.user.delay=1800000
```

Everytime I set up a new environment I have to use the web interface to add the variables one by one. That's a lot of copy/paste. Probably a job for a robot ;)

The [ElasticBeanstalk client](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html) enables us to define the environment variables with a command:

```bash
eb setenv keyA=valA keyB=valB keyC=valC
```

It is still too long to write this command line and that is why I created **[ebenv](https://github.com/vdurmont/ebenv)**.

### Installation

Simple one-liner ;)

```bash
npm install -g ebenv
```

### Export AWS config to a file

```bash
ebenv export myfile.json
ebenv export myfile.yml
ebenv export myfile.properties
ebenv export --format=json myfile
```

### Write a file to the AWS config

```bash
ebenv import myfile.json
ebenv import myfile.yml
ebenv import myfile.properties
ebenv import --format=json myfile
```

Try it out!

<a class="btn btn-primary" href="https://github.com/vdurmont/ebenv">Github repo: vdurmont/ebenv</a>
