---
layout: page
title: Get Started > NPM Script
---

# NPM Script

If you already have a build process based on npm scripts you can use `workbox-cli` to generate a service worker.

1. [Install Node.js](https://nodejs.org/en/) and create a new project using `npm-init`.
1. Install the module with NPM.

    ```
    npm install --save-dev sw-build
    ```

1. Add the following to your `package.json`:

    ```
	"scripts": {
	    "build": "workbox-cli generate:sw"
	},
	```

	Or add just the middle line if your `package.json` already has a scripts section.

    **Note:** The npm task for generating the service worker should always be run as the last step in each build. This ensures that your service worker contains any changes made during development. For example, you could do something like this:


    ```
	"scripts": {
		"_build_static": "NOT SURE WHAT GOES HERE"
	    "build": "_build_static && workbox-cli generate:sw"
	},
	```