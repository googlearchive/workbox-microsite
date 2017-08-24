'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('images:copy', () => {
  return gulp.src([
    global.config.src + '/**/*.{svg,ico}',
  ])
  .pipe(gulp.dest(global.config.dest));
});

gulp.task('images:minified', () => {
  return gulp.src([
    global.config.src + '/**/*.{jpg,jpeg,png}',
  ])
  .pipe(imagemin())
  .pipe(gulp.dest(global.config.dest));
});

gulp.task('images', gulp.parallel(
  'images:copy',
  'images:minified'
));
