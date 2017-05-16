---
layout: page
title: How Tos
---

# How Tos

How to solve particular problems that you might run into.

<ul>
{% for how_to in site.how_tos %}
  {% if how_to.publish %}
    <li>
      <a href="{{ how_to.url }}">{{ how_to.short_title }}</a>
      <p>{{ how_to.description | capitalize }}</p>
    </li>
  {% endif %}
{% endfor %}
</ul>