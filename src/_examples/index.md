---
layout: page
title: Examples
anchors: false
styles:
 - /styles/examples-index.css
---

This page contains examples for some of the Workbox modules.

Workbox is a set of small modules that can be used on their own, but we've
also combined the most common pieces into one module, `workbox-sw`. This module
supports precaching, routing of fetch events, runtime caching and more.

## Example of workbox-sw

The `workbox-sw` example demonstrates a complete service worker
implementation, demonstrating the common parts of the API. It's an in-depth
exploration of everything you'd need to build a production-ready service worker.

<a href="/examples/workbox-sw/" class="btn">View Example</a>

## Lower Level Modules

As an alternative to using the full `workbox-sw` library, you can use these
smaller, standalone modules in your service worker.

<ul class="example-index__lower-level-modules-list">
{% for example in site.examples %}
  {% if example.module and example.module != 'workbox-sw' %}
    <li>
      <h3>{{ example.module }}</h3>
      <p>{{ example.description | capitalize }}</p>
      <a href="{{ example.url }}" class="btn">View Example</a>
    </li>
  {% endif %}
{% endfor %}
</ul>

## Projects Using Workbox

Below are a list of example sites that are using the Workbox modules.

{% include components/example-project-using-workbox.html
   name='iFixit PWA'
   description='A React-based web app using workbox-build in a gulp-based build process.'
   img-src='/images/third_party/ifixit.png'
   source='https://github.com/GoogleChrome/application-shell/tree/ifixit-pwa/ifixit-pwa'
   demo='https://ifixit-pwa.appspot.com/'
%}

{% include components/example-project-using-workbox.html
   name='React HN'
   description='A React-based web app using workbox-cli in an npm scripts-based build process.'
   img-src='/images/third_party/react-hn.png'
   source='https://github.com/insin/react-hn'
   demo='https://react-hn.appspot.com/'
%}

{% include components/example-project-using-workbox.html
   name='Next.js HN'
   description='A Next.js-based web app using custom service worker generation in an npm scripts-based build process.'
   img-src='/images/third_party/next-js-hn.png'
   source='https://github.com/codebusking/next-hnpwa-guide-kit'
   demo='https://next-hnpwa.now.sh/'
%}

