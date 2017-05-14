---
layout: page
title: Get Started > NPM Script
---

# NPM

If you already have a build process based on npm scripts you can use `workbox-
cli` to generate a service worker.

1. Install the module with NPM.

    ```
    npm install --save-dev sw-build
    ```

1. From your project folder, run `workbox-cli` from a command line. A wizard
   asks several questions about your poject before the module generates a
   service worker. Answer `Y` when prompted to save your choices. Your answers
   will be saved in a file called `workbox-cli-config.json`.

    ```
    workbox-cli generate:sw
    ```

1. Add a line to the `scripts` section of your `package.json`:

    ```
	"scripts": {
	    "build": "node exising_build_script.js && workbox-cli generate:sw"
	},
	```

	When you run `npm run build`, the Workbox uses the JSON file created earlier
	to regenerate the service worker. If you need to change the JSON file,
	delete `workbox-cli-config.json` and rerun the wizard.

    **Note:** Always run the npm task for generating the service worker as the
    last step in each build. This ensures that your service worker contains any
    changes made during development. 