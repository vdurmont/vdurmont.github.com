---
layout: post
title: Give some love to your documentation
---

An API is a machine-to-machine interface which enables our applications to interact with each other. But it is also an interface for the developers that will connect those applications.

That's a good reason to spend some time working on your documentation.

As a developer, I want the documentation of the APIs I use to be crystal clear, easy to understand and straight-to-the-point. I think that you may have built the better API in the world, if your documentation is poor, unexplicit or hideous (yes, design matters), nobody will ever use it.

Here are some thoughts about how to create a developer-friendly documentation that will boost the interest (and the revenues!) of your API.

<!--more-->

# Easy to find

When a documentation is hidden in a PDF file (or worse, a .docx!) or when you have to sign up before reading it, the developer has to make an effort to find it. Most of us will give up and look for an easier solution: if I find obstacles before starting any integration, there is a great probability that my work will be harder with your product!

I suggest that you just use HTML and add a page to your company's website. If your documentation is really big, you can also create a devcenter (like [Twitter](https://dev.twitter.com/) or [Facebook](https://developers.facebook.com/)).

# Searching the doc

When I integrate an API, I often have specific needs and I want to be able to find the answers quickly. There are 2 common methods that enables a user to quickly search your doc:

- Providing a search engine (e.g. [Facebook](https://developers.facebook.com/))
- Building a one-page reference that enables a simple &#8984;+F (e.g. [Stripe](https://stripe.com/docs/api), see below)

![Stripe on-page doc](/assets/blog/20140103/api-doc-stripe-onepage.png)

# Structure: Overview, quickstart, guides and reference

There are thousands of ways of structuring your documentation. I found one structure that seems convenient and that helps the developer in any step of the integration.

## Overview

The overview has to give a general picture of your API. You can describe your architecure, explain which are the different components of your system and introduce your developer's ecosystem to the reader.

You may also add global information such as:

- How to authenticate?
- How to handle the errors?
- How do you manage the versioning?
- Etc.

## Quickstart

When a developer tries to integrate a new system, he has a lot to learn in a short period of time. This may generate a great stress so it is your job to help him getting results as quickly as possible.

A good solution is to make a quick list of the main things that the developer will have to do to be up and running. Getting quick results will reassure him and encourage him to go further in the integration.

For example, [Paymill](https://www.paymill.com/en-gb/documentation-3/) provides a great example of [quickstart](https://www.paymill.com/en-gb/documentation-3/) on its documentation homepage.

![Paymill quickstart](/assets/blog/20140103/api-doc-paymill-quickstart.png)

## Guides

There are operations that will be done by the majority of your users. It can be interesting to provide them with some guides that will help them to implement those common features.

Stripe is a good example with its [subscription guide](https://stripe.com/docs/subscriptions). It enables the developer to follow a step-by-step tutorial and implement easily this important feature in his website.

## Reference

The reference contains the full list of your objects and methods. It is the boring part but it is absolutely necessary: if you want the developers to build creative apps on top of your API, you have to let them freely use any feature you offer.

# An example is worth more than a long speech

It is important that you explain in details how to use each method of the API. We often have a lot of optional parameters that may be useful to some of your users but reading [that kind of table](/assets/blog/20140103/api-doc-facebook-table.png) is really boring. Most of the time we just need to use the basic request so the best way of understanding is reading an example.

And don't forget that when a developer learns your API, he is most likely already overwhelmed by the information so do not force him to learn a new language: write your example in [the most commonly used languages](http://adambard.com/blog/top-github-languages-for-2013-so-far/).

I like how Paymill enables you to switch your language via a vertical tab in its devcenter.

![Paymill](/assets/blog/20140103/api-doc-paymill-language-switch.png)

# Do not forget the edge cases

When you write your reference documentation, *DO NOT FORGET THE EDGE CASES*! You have to document the errors, the special values and anything that may make your API incomprehensible for an external developer.

What's more frustrating than getting an *"Unknown error"* message?

# Make it fun!

Well, let's face it, reading the documentation is *booooooooring* in most cases. So do not hesitate to make it fun! Use cool names for your variables instead of the classic *foo*, *bar* and *baz*. Insert fun code snippets and error messages.

This is not always easy nor possible but that may prevent your reader from falling asleep :)
