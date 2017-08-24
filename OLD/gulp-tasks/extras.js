'use strict';

const gulp = require('gulp');

gulp.task('extras', () => {
  return gulp.src([
    global.config.src + '/**/*.{txt,dat,json}',
  ])
  .pipe(gulp.dest(global.config.dest));
});
