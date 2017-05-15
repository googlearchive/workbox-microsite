---
layout: page
title: Examples
---

# Examples of Workbox Modules

<ul>
{% for example in site.examples %}
  {% if example.module %}
    <li>
      <a href="{{ example.url }}">{{ example.module }}</a>
      <p>{{ example.description | capitalize }}</p>
    </li>
  {% endif %}
{% endfor %}
</ul>

# Standalone Projects

These projects are using Workbox for their service worker:

{% include components/standalone-project.html
   name='iFixit PWA'
   description='A React-based web app using <code>workbox-build</code> in a <code>gulp</code>-based build process.'
   img-src='/images/third_party/ifixit.png'
   source='https://github.com/GoogleChrome/application-shell/tree/ifixit-pwa/ifixit-pwa'
   demo='https://ifixit-pwa.appspot.com/'
%}

{% include components/standalone-project.html
   name='React HN'
   description='A React-based web app using <code>workbox-cli</code> in an <code>npm scripts</code>-based build process.'
   img-src='/images/third_party/react-hn.png'
   source='https://github.com/insin/react-hn/tree/sw-helpers'
%}
