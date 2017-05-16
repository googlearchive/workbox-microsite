---
layout: example
link_to_workbox_sw: true
module: workbox-cache-expiration
show_page_js: true
title: <a href="/examples/">Examples</a> > workbox-cache-expiration
description: takes care of expiring cached entries based on the maximum number or age of entries.
---

`{{ page.module }}` {{ page.description }}

When a maximum number of entries is given, the expiration performed using a
least-recently used policy.

Responses fetched in this example are stored in a cache that imposes a
maximum size of 2, and a maximum age of 10 seconds.

<button data-url="file1.txt">Request file1.txt</button>
<button data-url="file2.txt">Request file2.txt</button>
<button data-url="file3.txt">Request file3.txt</button>
<button data-url="file4.txt">Request file4.txt</button>
