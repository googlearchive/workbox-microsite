# workbox-microsite
[![Build Status](https://travis-ci.org/GoogleChrome/workbox-microsite.svg?branch=master)](https://travis-ci.org/GoogleChrome/workbox-microsite)

## Testing

### Development

When working on docs or the themes, you can just run Jekyll to watch and serve
the site:

```
gulp serve
```
#### Development + JSDocs

If you want to build the site **and** build a version of the reference docs you
need to run with the `--code` flag and pass in a path to the workbox repo.

```
gulp serve --code ../workbox/
```

#### Jekyll + Incremental

> NOTE: Only do this if you you are working on the theme and NOT content.
> This opts Jekyll into "incremental" builds. It's unpredictable and has
> a wide range of side effects. Only use this if you are willing to handle
> weirdness.

To opt into Jekyll incremental run like so:

```
gulp serve:fast
```

### Production

The production version of the site will run the files through some additional
steps to get them production ready (i.e. minify, transpile etc).

You can test the production site with:

```
gulp serve:prod
```

## Deploy

https://workboxjs.org uses [Firebase Hosting](https://firebase.google.com/docs/hosting/).
Users with administrative access to the Firebase project can deploy updates to
the site by running

```sh
npm run deploy
```
