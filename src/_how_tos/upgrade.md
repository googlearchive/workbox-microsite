---
layout: page
title: <a href="/how_tos/">How Tos</a> > Upgrade Guide
short_title: Upgrade Guide
description: Use Rollup Bundling and Workbox code directly in your own service worker.
publish: true
---

# Upgrade from sw-precache

[General Stuff/Intro]

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