---
tags: post
layout: post
title: Environment configuration with Angular and Grunt
date: 2015-08-02
---

When I write an Angular application, I usually create a _constant_ [module](https://docs.angularjs.org/api/ng/type/angular.Module) to store my environment variables:

```js
angular.module("myApp").constant("Config", {
  API_URL: "http://localhost:8080/",
  GITHUB_CLIENT_ID: "xxxxxxxxxxxxxxx",
  ...
});
```

I can then inject my config anywhere in the application and use those variables.

These variables can change based on where the app is deployed and I needed a simple way to define several environments. Since I use [Grunt](http://gruntjs.com/) to build, test and deploy my javascript apps, I wanted to find something that would be seamlessly integrated in my build process.

<!--more-->

In this post I will give you an easy way to achieve this, using [grunt-replace](https://github.com/outaTiME/grunt-replace).

## Angular constant module

Modify the values by putting `@@` followed by the key name.

```js
angular.module("myApp").constant("Config", {
  API_URL: "@@API_URL",
  GITHUB_CLIENT_ID: "@@GITHUB_CLIENT_ID",
  ...
});
```

## Create a config file for each environment

For example, if I have a `development` and a `production` environment:

**./src/config/development.json**

```js
{
  API_URL: "http://localhost:8080/",
  GITHUB_CLIENT_ID: "xxxxxxxxxxxxxxx",
  ...
}
```

**./src/config/production.json**

```js
{
  API_URL: "http://api.myapp.com/",
  GITHUB_CLIENT_ID: "yyyyyyyyyyyyyyy",
  ...
}
```

## Add `grunt-replace` to your Gruntfile

Here are the interesting parts of the `Gruntfile.js`:

```js
module.exports = function (grunt) {
  // Method used to generate a config environment
  var getConfig = function (configName) {
    return {
      options: {
        patterns: [{
          json: grunt.file.readJSON("./src/config/" + configName + ".json")
        }]
      },
      files: [{
        expand: true,
        flatten: true,
        // Here "dist/js/app.min.js" is a minified script with my whole application
        src: ["dist/js/app.min.js"],
        dest: "dist/js/"
      }]
    };
  };

  grunt.initConfig({
    // Config...

    // Replace the configuration according to the profile
    replace: {
      development: getConfig("development"),
      production: getConfig("production")
    },

    // Config...
  });

  // Load the NPM tasks
  grunt.loadNpmTasks("grunt-replace");
  // ...

  // Register your tasks
  grunt.registerTask("default", [..., "replace:development", ...]);
  grunt.registerTask("production", [..., "replace:production", ...]);
};
```

## Run!

When you will run `grunt`, the `replace:development` task will be used and all your keys will be replaced by the values in `development.json`. The same will happen for `replace:production` or any other profile you will have defined.
