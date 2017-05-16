---
layout: page
title: Examples
---

# workbox-sw

The [workbox-sw example](workbox-sw/) demonstrates a complete service worker
implementation, including precaching, routing, runtime caching, and cache
expiration. It's an in-depth exploration of everything you'd need to build a
production-ready service worker.

# Standalone Workbox Modules

As an alternative to using the full workbox-sw library, you can mix these
smaller, standalone modules into your existing service worker code.

<ul>
{% for example in site.examples %}
  {% if example.module and example.module != 'workbox-sw' %}
    <li>
      <a href="{{ example.url }}">{{ example.module }}</a>
      <p>{{ example.description | capitalize }}</p>
    </li>
  {% endif %}
{% endfor %}
</ul>

# Projects Using Workbox

{% include components/standalone-project.html
   name='iFixit PWA'
   description='A React-based web app using workbox-build in a gulp-based build process.'
   img-src='/images/third_party/ifixit.png'
   source='https://github.com/GoogleChrome/application-shell/tree/ifixit-pwa/ifixit-pwa'
   demo='https://ifixit-pwa.appspot.com/'
%}

{% include components/standalone-project.html
   name='React HN'
   description='A React-based web app using workbox-cli in an npm scripts-based build process.'
   img-src='/images/third_party/react-hn.png'
   source='https://github.com/insin/react-hn'
   demo='https://react-hn.appspot.com/'
%}
