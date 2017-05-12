---
layout: page
title: Get Started > Gulp
---

# Gulp

Use gulp and `workbox-build` to build a precaching service worker. Simply
install the module then cut and paste the code sample.

1. [Install Node.js](https://nodejs.org/en/).
1. Install the module with NPM.

    ```
    npm install workbox-build --save-dev
    ```

1. Require `workbox-build` in your build script.

    ```
    const wbBuild = require('workbox-build');
    ```

1. Add the following to your `gulpfile.js`:

    ```gulp.task('generate-sw', () => {
        return wbBuild.generateSW({
          globDirectory: './app/',
          swDest: './app/sw.js',
          staticFileGlobs: ['**\/*.{html,js,css}'],
          globIgnores: ['admin.html'],
          templatedUrls: {
            '/shell': ['shell.hbs', 'main.css', 'shell.css'],
          },
        })
        .then(() => {
          console.log('Service worker generated.');
        })
        .catch((err) => {
          console.log('[ERROR] This happened: ' + err);
        });
        })
    ```
