'use strict';

/* eslint-env node */
/* eslint-disable no-console */

const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const connect = require('gulp-connect');

global.config = {
  src: './build-site',
  dest: './build-prod',
};

const gulpTaskFiles = fs.readdirSync(path.join(__dirname, 'gulp-tasks'));
gulpTaskFiles.forEach((taskFile) => {
  if (path.parse(taskFile).ext !== '.js') {
    return;
  }

  const completePath = path.join(__dirname, 'gulp-tasks', taskFile);
  if (fs.lstatSync(completePath).isFile()) {
    require(completePath);
  }
});

gulp.task('build', gulp.series([
  'clean',
  'jekyll:build',
  gulp.parallel([
    'styles',
    'html',
    'images',
    'scripts',
    'extras',
  ]),
  'sw',
]));

gulp.task('serve', gulp.series(['jekyll:serve']));

gulp.task('serve:prod', gulp.series(['build', () => {
  connect.server({
    root: global.config.dest,
    open: true,
  });
}]));

gulp.task('default', gulp.parallel(['build']));
