---
layout: page
title: Get Started > Gulp
---

# Gulp

1. [Install Node.js](https://nodejs.org/en/).
1. Install the module with NPM.

    ```
    npm install --save-dev sw-build
    ```

1. Require `sw-build` in your build script.

    ```
    const swBuild = require('sw-build');
    ```

1. Add the following to your `gulpfile.js`:

    ```
    gulp.task('build', () => {
      const swBuild = require('sw-build');
      return swBuild.generateSW({
        rootDirectory: './build/',
        swDest: './build/sw.js',
        globPatterns: ['**\/*.{html,js,css}'],
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
