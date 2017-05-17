---
layout: example
link_to_workbox_sw: true
module: workbox-runtime-caching
show_page_js: true
title: <a href="/examples/">Examples</a> > workbox-runtime-caching
description: implements common cache strategies, and provides hooks to extend the default behaviors.
---

`{{ page.module }}` {{ page.description }}

The strategies offered correspond to those listed in the
[offline cookbook](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/),
and that article can help you choose which strategies are appropriate for your
different types of requests.

You can see the library in action by making requests for random response data
using different strategies. Try disabling your network and see how they handle
situations in which a network request fails.

<button data-url="https://httpbin.org/bytes/1?strategy=networkOnly">Network Only</button>
<button data-url="https://httpbin.org/bytes/1?strategy=networkFirst">Network First</button>
<button data-url="https://httpbin.org/bytes/1?strategy=cacheOnly">Cache Only</button>
<button data-url="https://httpbin.org/bytes/1?strategy=cacheFirst">Cache First</button>
<button data-url="https://httpbin.org/bytes/1?strategy=staleWhileRevalidate">Stale While Revalidate</button>
<button data-url="https://httpbin.org/bytes/1?strategy=custom">Custom Handler</button>
