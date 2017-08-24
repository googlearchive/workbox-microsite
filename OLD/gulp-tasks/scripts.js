'use strict';

const gulp = require('gulp');

gulp.task('scripts', () => {
  return gulp.src(global.config.src + '/**/*.js')
  .pipe(gulp.dest(global.config.dest));
});
