---
layout: page
title: <a href="/how_tos/">How Tos</a> > Upgrade Guide
short_title: Upgrade Guide
description: Use Rollup Bundling and Workbox code directly in your own service worker.
publish: true
---

# Upgrade from sw-precache

[General Stuff/Intro]

## Features

## staticGlobFiles

In Worbox, the `globPatterns` and `globDirectory` parameters replace sw-precache's `staticGlobFiles` parameter. 

For example, imagine a `staticGlobFiles` parameter like the following.


    staticFileGlobs: [
      `${BUILD_DIR}/rev/js/**/*.js`,
      `${BUILD_DIR}/rev/styles/all*.css`,
      `${BUILD_DIR}/images/**/*`
    ]

The Workbox equivalent would look like this:

    globDirectory: BUILD_DIR,
    globPatterns: [
      `rev/js/**/*.js`,
      `rev/styles/all*.css`,
      `images/**/*`
    ],