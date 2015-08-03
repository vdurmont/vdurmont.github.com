---
layout: post
title: Angular ng-repeat with Bootstrap grid
---

[Angular](https://angularjs.org/) and [Bootstrap](http://getbootstrap.com/) are 2 of my favorite frontend tools that I often use combined with the awesome [angular-ui](https://angular-ui.github.io/bootstrap/).

One of the main features of Bootstrap is its [grid system](http://getbootstrap.com/css/#grid). Basically, the screen is divided in 12 columns and you can use the built-in css classes to organize your layout.

The basic usage of this grid is to use a `row` and to nest the `cols` inside. But when you want to use it in combination with a `ng-repeat` (without knowing the collection length), it can get hairy!

<!--more-->

## Static example

Here is a static example with a list of devices that will be displayed as a mosaic on the page:

    <!-- FIRST ROW -->
    <div class="row">
      <div class="col-md-4">
        iPhone 1st gen
      </div>
      <div class="col-md-4">
        iPhone 3G
      </div>
      <div class="col-md-4">
        iPhone 3GS
      </div>
    </div>

    <!-- SECOND ROW -->
    <div class="row">
      <div class="col-md-4">
        iPhone 4
      </div>
      <div class="col-md-4">
        iPhone 4S
      </div>
      <div class="col-md-4">
        iPhone 5
      </div>
    </div>

Everything works well: each row has 3 * 4 = 12 columns. The output looks like this:

![Output 1](/assets/img/20150805/angular-ngrepeat-bootstrap-grid-1.png)

## Enters `ng-repeat`

Now let's introduce some dynamism. The angular controller will have a list of the devices and the html has to display them.

The first try would be to use ng-repeat directly:

<!-- FIRST ROW -->
<div class="row">
  <div class="col-md-4" ng-repeat="device in devices">
    {{ device.name }}
  </div>
</div>

http://stackoverflow.com/a/25838091/2015239
