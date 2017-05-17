'use strict';

const gulp = require('gulp');
const workboxBuild = require('workbox-build');
const path = require('path');

gulp.task('sw', () => {
  return workboxBuild.generateSW({
    globDirectory: global.config.dest,
    staticFileGlobs: ['**/*.{html,js,css}'],
    globIgnores: [
      // Only include the latest reference docs
      'reference-docs/*.*.*/**/*',
      // Only include the top level styles for css
      'themes/styles/*/**/*',
    ],
    swDest: path.join(global.config.dest, 'sw.js'),
  });
});
