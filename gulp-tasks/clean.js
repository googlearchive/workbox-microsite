'use strict';

const gulp = require('gulp');
const del = require('del');
const path = require('path');

gulp.task('clean', () => {
  return del([
    path.join(global.config.src, '**', '*'),
    path.join(global.config.dest, '**', '*'),
  ]);
});
