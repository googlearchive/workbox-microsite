---
layout: page
title: Get Started > Gulp
---

# Gulp

Use gulp and `workbox-build` to build a precaching service worker. Simply
install the module then cut and paste the code sample.

1. [Install Node.js](https://nodejs.org/en/).
1. Install the module with NPM.

    ```bash
    npm install workbox-build --save-dev
    ```

1. Require `workbox-build` in your gulp `gulpfile.js`.

    ```javascript
    const wbBuild = require('workbox-build');
    ```

1. Also in `gulpfile.js` add a task to build a service worker.

    ```javascript
    gulp.task('bundle-sw', () => {
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

   **Note:** The gulp task for generating the service worker should always be
   run as the last step in each build. This ensures that your service worker
   contains any changes made during development.
