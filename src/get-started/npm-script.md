---
layout: page
title: Get Started > NPM Script
---

# NPM

If you already have a build process based on npm scripts you can use `workbox-
cli` to generate a service worker.

1. From your project folder, install the module with NPM.

    ```
    npm install --save-dev workbox-cli
    ```

1. Add a command to the `scripts` section of your `package.json`:

    ```
  "scripts": {
      "build": "node exising_build_script.js && workbox-cli generate:sw"
  },
  ```

    **Note:** The command for generating the service worker,
    `workbox-cli generate:sw`, should always be the last step in your site's
    build process. This ensures that your service worker contains any changes
    made during development. 

1. Run your new command.

    ```
    npm run build
    ```

    The first time you run this, a wizard asks several questions about your
    poject before the module generates a service worker. Answer `Y` when
    prompted to save your choices. Your answers will be saved in a file called
    `workbox-cli-config.json`.

    The next time you run `npm run build`, Workbox uses the JSON file to
    regenerate the service worker. If you need to update the
    `workbox-cli-config.json`, you can either do it by hand or delte the file
    rerun the wizard.


	

