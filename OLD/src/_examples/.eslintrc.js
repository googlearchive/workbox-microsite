// Relax the default linting rules a bit for the examples.
module.exports = {
  extends: ['eslint:recommended', 'google'],
  env: {
    browser: true,
    serviceworker: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
  rules: {
    'no-console': 0,
    'valid-jsdoc': 0,
  },
  globals: {
    log: false,
    logCachedFiles: false,
    workbox: false,
    BroadcastChannel: false,
    WorkboxSW: false,
  },
};
