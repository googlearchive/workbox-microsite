---
layout: page
title: Get Started > NPM Script
---

# NPM Script

If you already have a build process based on npm scripts

Use npm and `workbox-build` to build a precaching service worker. Simply install the module then cut and paste the code sample.

It's for developers who already have a build process that's based on npm scripts, and for those developers, chaining in a call to workbox-cli (which will read in a saved config) is an easy way to get started.

1. [Install Node.js](https://nodejs.org/en/).
1. Install the module with NPM.

    ```
    npm install --save-dev sw-build
    ```

1. Add the following to your `package.json`:

    ```
	"scripts": {
	    "createsw": "node createsw.js"
	},
	```

1. In the root of your project, create a file named `createsw.js`.
1. Open `createsw.js` and add the following code:

    ```
    use strict';

	const wbBuild = require('workbox-build');

	function generateSW() {
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
	}

	generateSW();
	```