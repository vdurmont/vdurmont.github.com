---
layout: post
title: Create a UTC dashboard clock widget on your mac
---

Since I moved to the US, I'm constantly checking the time it is around the world: sometimes in France to contact my friends, sometimes in New York where some coworkers are, etc. The thing I  need the most is the UTC time. All our database and deployment timestamps are UTC and I don't really enjoy the mental gymnastics I have to perform to get the right time :)

![My dashboard clock widgets](/assets/img/utc-clock-widget.png)

The Mac dashboard doesn't provide a UTC clock widget so I decided to create one!

<!--more-->

Open a Terminal on your Mac and go to the dashboard widgets directory:

    cd /Library/Widgets

Locate the "World Clock" widget and explore the package:

    cd World\ Clock.wdgt

Open the javascript file with your favorite editor:

    subl WorldClock.js

Locate the "Europe" line (should be around line 48) and add an entry for GMT/UTC:

    ...
    var Europe = [
      {city:'GMT/UTC', offset:0, timezone:'UTC', id:"2647937"},
      {city:'Amsterdam', offset:120, timezone:'Europe/Amsterdam', id:"2759794"},
    ...

Save the file and open the dashboard. Add a clock widget and you should now have the option for a GMT/UTC city :)

![UTC clock widget option](/assets/img/utc-clock-widget-option.png)
