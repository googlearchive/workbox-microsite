---
layout: page
title: Get Started > webpack
---

# webpack

The following example uses [workbox-webpack-plugin](https://www.npmjs.com/package/workbox-webpack-plugin)
to create a precaching service worker in your webpack build process. This will
give you a new service worker every time you run it.

1. [Install Node.js](https://nodejs.org/en/).
1. Install the plugin with NPM.

    ```
    npm install workbox-webpack-plugin --save-dev
    ```

1. After installing the webpack plugin add the following to your `webpack.config.js`.

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

   **Note:** The plugin for generating the service worker should always be
   run as the last step in each build. This ensures that your service worker
   contains any changes made during development.