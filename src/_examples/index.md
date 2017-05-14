---
layout: page
title: Examples
---

# Examples of Workbox Modules

<ul>
{% for example in site.examples %}
  {% if example.module %}
    <li><a href="{{ example.url }}">{{ example.module }}</a></li>
  {% endif %}
{% endfor %}
</ul>

# Standalone Projects

These projects are using Workbox for their service worker:

- iFixit PWA (`gulp`-based build process)
[[source](https://github.com/GoogleChrome/application-shell/tree/ifixit-pwa/ifixit-pwa)]
[[demo](https://ifixit-pwa.appspot.com/)]
- React HN (`npm scripts`-based build process)
[[source](https://github.com/insin/react-hn/tree/sw-helpers)]
