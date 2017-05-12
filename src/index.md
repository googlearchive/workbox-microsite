---
layout: index
title: Welcome to Workbox
navigation_weight: 0
styles:
 - /styles/index.css
---
<div class="index__install-section" markdown="1">

<div class="content-sizing" markdown="1">

# Get Started

## Choose your build tool to get started:

<div class="index__install-options">
  <a href="./get-started/webpack" class="index__install-option index__install-webpack">
    <img src="/images/third_party/webpack-logo.svg" alt="Install Workbox's Webpack plugin" />
  </a>

  <a href="./get-started/gulp" class="index__install-option index__install-gulp">
    <img src="/images/third_party/gulp-logo.svg" alt="Install Workbox to work with Gulp" />
  </a>

  <a href="./get-started/npm-script" class="index__install-option index__install-npm">
    <img src="/images/third_party/npm-logo.svg" alt="Install Workbox to work with NPM Scripts" />
  </a>
</div>

## Not using a build tool?

Install our command-line interface:

</div>

{% highlight bash %}
$ npm install workbox-cli --global

# Generate a service worker with some smart defaults
$ workbox generate:sw
{% endhighlight %}

<div class="content-sizing" markdown="1">
## Want to work directly in your service worker?

We support that too with workbox-sw.
</div>

{% highlight bash %}
$ npm install workbox-sw --save
{% endhighlight %}

<div class="content-sizing" markdown="1">
Then just reference the file from your service worker:
</div>

{% highlight javascript %}
importScripts('/node_modules/workbox-sw/build/workbox-sw.vX.X.X.prod.js');
{% endhighlight %}

</div>

<div class="content-sizing content-padding" markdown="1">
# Features

<div class="index__features" markdown="1">
<div class="index__features-left-section" markdown="1">
## Easy precaching

{% highlight javascript %}
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
{% endhighlight %}

## Powerful debugging support
![Example of Workbox Logging.](/images/workbox-logging.png)

</div>

<div class="index__features-right-section" markdown="1">
## Comprehensive caching strategies

{% highlight javascript %}
const networkFirst = swlib.strategies.networkFirst();
swlib.router.registerRoute('/schedule', networkFirst);
{% endhighlight %}

<div class="index_strategy-list" markdown="1">
- Cache only
- Network only
- Cache first falling back to network
- Network first falling back to cache
- Cache with network update
</div>
## The next version of sw-precache & sw-toolbox

Workbox is a rethink of our previous service worker libraries with a focus
on modularity. It aims to reduce the friction with a better surface API,
while making the overall size of the library 20% smaller. Same great features,
easier to use and cross-browser compatible.

</div>
</div>
</div>
