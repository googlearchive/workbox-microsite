---
layout: page
title: <a href="/how_tos/">How Tos</a> > <a href="/how_tos/upgrade/">Upgrade Guide</a> > sw-precache
short_title: Upgrade sw-precache
description: How to upgrade sw-precache features to Workbox.
publish: true
---

# Upgrade sw-preache

[Intro]

## Command-Line Interface

Just like `sw-precache`, Workbox allows you generate a service worker using the command line using [`workbox-cli`](../how_tos/workbox-cli). There are a few differences between the two.

* Information that was previously passed as command line arguments is now gathered by a wizard that provides the option of saving your choices to a config file (`sw-cli-config.json`). 
* `sw-precache` does **not** support runtime caching. For that you'll need [`sw-lib`](sw-lib) or one of the lower-level modules.

### Example

This example shows how to use the wizard to replace the sw-precache cli shown below.

    ./node_modules/sw-precache/cli.js --root=public --config=sw-precache-config.json

1. Do stuff...
1. ...

## swPrecache.write()

Most features of `sw-precache.write()` have direct equivalents in `wbBuild.generateSW()`. Exceptions are described below.

### staticGlobFiles

In Worbox, the `globPatterns` and `globDirectory` parameters together replace sw-precache's `staticGlobFiles` parameter. To convert, the globs' root directory should be removed form the pattern paths and placed in a separate parameter.

#### Example

**In sw-precache:**


    staticFileGlobs: [
      `${BUILD_DIR}/rev/js/**/*.js`,
      `${BUILD_DIR}/rev/styles/all*.css`,
      `${BUILD_DIR}/images/**/*`
    ]

**In Workbox:**

    globDirectory: BUILD_DIR,
    globPatterns: [
      `rev/js/**/*.js`,
      `rev/styles/all*.css`,
      `images/**/*`
    ],