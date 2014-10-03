---
layout: post
title: Userinfo.io Java & Javascript libraries
---

As I told you [a few days ago](http://vincent-durmont.com/2014/09/20/get-the-client-ip-address-and-location-with-javascript.html), I launched a new service called [userinfo.io](http://userinfo.io) that helps you get the geolocation information of your user in no time.

![Userinfo.io](/assets/img/userinfo-io-screenshot.png)

<!--more-->

I use the IP address and a lookup on several geodatabases to determine with the best accuracy possible:

* Your position (latitude/longitude)
* Your continent and country
* Your city (with postal code!)

# Awesome. How can I use it?

I just released 2 libraries in my favorite languages: [Java](https://github.com/vdurmont/userinfo-java) and [Javascript](https://github.com/vdurmont/userinfo-js)!

Both are lightweight and really simple to use. The 2 github projects I linked above provide examples to get started.

They are respectively available on [Maven Central](https://search.maven.org/#search%7Cga%7C1%7Cg%3A%22io.userinfo%22) (for the java guys) and [CDNJS](https://cdnjs.com/libraries/userinfo) (for the javascript guys).

# What's next?

First of all, if you integrate one of these libraries in your project, do not hesitate to [contact me](mailto:vdurmont@gmail.com?subject=userinfo.io), I'm always happy to see my work at use!

If you need support, I'll be there.

Then I'll try to update the website with the Java documentation (and an access to the REST API) and I'll continue working on improving the accuracy of the results :)

Check out the website: [http://userinfo.io](http://userinfo.io)
