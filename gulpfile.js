'use strict';

const gulp = require('gulp');
const fs = require('fs');
const path = require('path');

global.config = {
  src: './src',
  dest: './build-prod-assets',
};

const gulpTaskFiles = fs.readdirSync(path.join(__dirname, 'gulp-tasks'));
gulpTaskFiles.forEach((taskFile) => {
  const completePath = path.join(__dirname, 'gulp-tasks', taskFile);
  if (fs.lstatSync(completePath).isFile()) {
    require(completePath);
  }
});

gulp.task('build', gulp.series([
  'clean',
  /** gulp.parallel([
    'styles',
    'templates',
    'images',
    'scripts',
    'extras',
  ]),**/
]));

gulp.task('default', gulp.parallel(['build']));
