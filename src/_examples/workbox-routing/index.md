---
layout: example
link_to_workbox_sw: true
module: workbox-routing
show_page_js: true
title: <a href="/examples/">Examples</a> > workbox-routing
description: makes it easy to handle network requests using the response strategy of your choice.
---

`{{ page.module }}` {{ page.description }}

<p>
  <button data-url="https://httpbin.org/bytes/1">Make a Cross-Origin Request</button>
  that's handled by an Express-style route that matches the domain.
</p>

<p>
  <button data-url="/manifest.json">Make a JSON Request</button> that's handled
  by an RegExp route that matches the <code>.json</code> extension.
</p>

<p>
  <button data-url="app.js">Make a Generic Request</button> that's
  handled by the router's default handler.
</p>

<p>
  <button data-url="https://fake-url-to-make-request.fail">Make a Failing Request</button>
  that's handled by the router's catch handler.
</p>
