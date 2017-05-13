---
layout: page
title: Get Started > Webpack
---

# Webpack

Here are a few examples that can get you started with Workbox and webpack
relatively quickly using the
[workbox-webpack-plugin](https://www.npmjs.com/package/workbox-webpack-plugin).

## Install

1. [Install Node.js](https://nodejs.org/en/).
1. Install the plugin with NPM.

    ```
    npm install workbox-webpack-plugin --save-dev
    ```

## Precaching

The following example uses the plugin to create a precaching service worker in
your webpack build process. This will give you a new service worker every time
you run it.

Aafter installing the Webpack plugin add the following to your `webpack.config.js`.

```
const path = require('path');
const WorkboxBuildWebpackPlugin = require('workbox-webpack-plugin');

const DIST_DIR = 'dist';

module.exports = { /* Do the usual webpack stuff. */
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, DIST_DIR),
  },
  plugins: [ /* Call the plugin. */
    new WorkboxBuildWebpackPlugin({
      globDirectory: DIST_DIR,
      staticFileGlobs: ['**/*.{html,js,css}'],
      swDest: path.join(DIST_DIR, 'sw.js'),
    }),
  ]
};
```

## Runtime Caching
