---
layout: example
link_to_workbox_sw: true
module: workbox-broadcast-cache-update
show_page_js: true
title: <a href="/examples/">Examples</a> > workbox-broadcast-cache-update
description: uses the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API">BroadcastChannel API</a> to let you know when two responses are different.
---

`{{ page.module }}` {{ page.description }}

The most common use case would be to have a service worker compare a previously
cached response with a response from the network, so that you can let pages know
that updated data was received.

Note that the comparison is done via one or more headers, not response bodies,
for efficieny's sake. Also note that cross-origin responses using the
[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)
protocol only expose a subset of response headers. The remote server needs to
explicitly whitelist headers by setting
[Access-Control-Allow-Headers](https://fetch.spec.whatwg.org/#http-access-control-allow-headers)
or the headers won't be visible on the CORS response.

<p>
  <button data-url="test.txt">Request test.txt</button>, which will trigger a
  BroadcastChannel API message whenever the <code>Date:</code>
  header differs from the <code>Date:</code> in the cached entry.
</p>
