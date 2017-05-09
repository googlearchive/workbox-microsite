'use strict';

/* eslint-env node */

const gulp = require('gulp');
const del = require('del');
const path = require('path');

gulp.task('clean', () => {
  return del([
    path.join(global.config.dest, '**', '*'),
  ]);
});
