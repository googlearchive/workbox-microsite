---
layout: index
title: Welcome to Workbox
styles:
 - /styles/index.css
---
<div class="index__install-section" markdown="1">

<div class="content-sizing" markdown="1">

# Overview

Workbox is a collection of libraries and build tools that make it easy to
store your website's files locally, on your users' devices. Consider Workbox if
you want to:

* Make your site work offline.
* Improve load performance on repeat-visits. Even if you don't want to go
  fully-offline, you can use Workbox to store and serve common files locally,
  rather than from the network.

[Learn more](/overview.html)

# Get Started

## Choose your build tool to get started:

<div class="index__install-options">
  <a href="./get-started/webpack.html" class="index__install-option index__install-webpack">
    <img src="/images/third_party/webpack-logo.svg" alt="Install Workbox's Webpack plugin" />
  </a>

  <a href="./get-started/gulp.html" class="index__install-option index__install-gulp">
    <img src="/images/third_party/gulp-logo.svg" alt="Install Workbox to work with Gulp" />
  </a>

  <a href="./get-started/npm-script.html" class="index__install-option index__install-npm">
    <img src="/images/third_party/npm-logo.svg" alt="Install Workbox to work with NPM Scripts" />
  </a>
</div>

## Not using a build tool?

Install our command-line interface:

</div>

```bash
$ npm install workbox-cli --global

# Generate a service worker with some smart defaults
$ workbox-cli generate:sw
```

<div class="content-sizing" markdown="1">
## Want to work directly in your service worker?

We support that too with workbox-sw.
</div>

```bash
$ npm install --save workbox-sw
```

<div class="content-sizing" markdown="1">
Then reference the file from your service worker:
</div>

```javascript
importScripts('/node_modules/workbox-sw/build/workbox-sw.vX.X.X.prod.js');
```

</div>

<div class="content-sizing content-padding" markdown="1">
# Features

<div class="index__features" markdown="1">
<div class="index__features-left-section" markdown="1">
## Easy precaching

```javascript
importScripts('/node_modules/workbox-sw/build/workbox-sw.vX.X.X.prod.js');

const workboxSW = new WorkboxSW();
workboxSW.precache([
  {
    url: '/index.html',
    revision: 'bb121c',
  }, {
    url: '/styles/main.css',
    revision: 'acd123',
  }, {
    url: '/scripts/main.js',
    revision: 'a32caa',
  }
]);
```

## Powerful debugging support
![Example of Workbox Logging.](/images/workbox-logging.png)

</div>

<div class="index__features-right-section" markdown="1">
## Comprehensive caching strategies

```javascript
const workboxSW = new WorkboxSW();
const networkFirst = workboxSW.strategies.networkFirst();
workboxSW.router.registerRoute('/schedule', networkFirst);
```

<div class="index_strategy-list" markdown="1">
- Cache only
- Network only
- Cache first, falling back to network
- Network first, falling back to cache
- Cache, with network update
</div>
## The next version of sw-precache & sw-toolbox

Workbox is a rethink of our previous service worker libraries with a focus
on modularity. It aims to reduce friction with a unified interface, while
keeping the overall library size small. Same great features, easier to use
and cross-browser compatible.

</div>
</div>
</div>
