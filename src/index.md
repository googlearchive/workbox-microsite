---
layout: index
title: Welcome to Workbox
navigation_weight: 0
---

<style>
.index__install-options {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.index__install-option {
  display: flex;
  width: 0;
  flex: 1;

  justify-content: center;
  align-items: center;

  padding: 16px 32px;
}

.index__install-option img {
  width: 100%;
}

.index__install-webpack {
  background-color: black;
}

.index__install-gulp {
  background-color: #D04843;
    margin: 0 16px;
}

.index__install-gulp img {
  padding: 32px;
  box-sizing: border-box;
}

.index__install-npm {
  background-color: #2a333c;
}

</style>

# Installation

<div class="index__install-options">
  <div class="index__install-option index__install-webpack">
    <img src="/images/third_party/webpack-logo.svg" alt="Install Workbox's Webpack plugin" />
  </div>

  <div class="index__install-option index__install-gulp">
    <img src="/images/third_party/gulp-logo.svg" alt="Install Workbox to work with Gulp" />
  </div>

  <div class="index__install-option index__install-npm">
    <img src="/images/third_party/npm-logo.svg" alt="Install Workbox to work with NPM Scripts" />
  </div>
</div>

## Not using a build tool?

Install our command-line interface:

```
$ npm install workbox-cli --global

# Generate a service worker with some smart defaults
$ workbox generate:sw
```

## Want to work directly in your service worker?

We support that too with workbox-sw.

```
$ npm install workbox-sw --save
```

Then just reference the file from your service worker:

```
importScripts('/node_modules/workbox-sw/build/workbox-sw.vX.X.X.prod.js');
```

# Features

## Easy runtime caching

```
importScripts('/node_modules/workbox-sw/build/workbox-sw.vX.X.X.prod.js');

goog.swlib.precache([
  {
    url: '/index.html',
    revision: 'sdfsdflkhwernsdv32pijaasd',
  }, {
    url: '/styles/main.css',
    revision: 'sdfhxcvnaldkqqwesdvclknsd',
  }, {
    url: '/scripts/main.js',
    revision: 'asdxcvxcvoiyuqwebsdfiuhen',
  }
]);
```

## Powerful debugging support

TODO: Update this screenshot with latest.

![Example of Workbox Logging.](/images/workbox-logging.png)

## Comprehensive caching strategies

```
const networkFirst = swlib.strategies.networkFirst();
swlib.router.registerRoute('/schedule', networkFirst);
```

- Cache only
- Cache first falling back to network
- Network only
- Network first falling back to cache
- Cache with network update

## The next version of sw-precache & sw-toolbox

Workbox is a rethink of our previous service worker libraries with a focus
on modularity. It aims to reduce the friction with a better surface API,
while making the overall size of the library 20% smaller. Same great features,
easier to use and cross-browser compatible.
