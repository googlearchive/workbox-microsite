---
layout: page
title: Get Started > webpack
---

# webpack

The following example uses [workbox-webpack-plugin](https://www.npmjs.com/package/workbox-webpack-plugin)
to create a service worker in your webpack build process to precache resources. Every run of the build will
update the service worker with the latest file changes.

1. Install the plugin with NPM.

    ```bash
    npm install workbox-webpack-plugin --save-dev
    ```

1. After installing the webpack plugin add the following to your `webpack.config.js`.

    ```javascript
    const path = require('path');
    const workboxPlugin = require('workbox-webpack-plugin');

    const DIST_DIR = 'dist';

    module.exports = { /* Do the usual webpack stuff. */
      entry: './app/index.js',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, DIST_DIR),
      },
      plugins: [ /* Call the plugin. */
        new workboxPlugin({
          globDirectory: DIST_DIR,
          staticFileGlobs: ['**/*.{html,js,css}'],
          swDest: path.join(DIST_DIR, 'sw.js'),
        }),
      ]
    };
    ```

    **Note:** Always run the plugin for generating the service worker as the
    last step in your site's build process. This ensures that your service
    worker contains any changes made during development.
