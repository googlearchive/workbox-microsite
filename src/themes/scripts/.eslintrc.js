// Relax the default linting rules a bit for the scripts that are used
// throughout the site.
module.exports = {
  extends: ['eslint:recommended', 'google'],
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
  rules: {
    'no-console': 0,
    'require-jsdoc': 0,
    'no-unused-vars': 0,
  },
};
