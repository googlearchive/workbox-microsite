'use strict';

const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');

gulp.task('html', () => {
  return gulp.src(global.config.src + '/**/*.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest(global.config.dest));
});
