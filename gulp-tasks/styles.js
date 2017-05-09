'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const atImport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const cssurl = require('postcss-url');
const cssnano = require('cssnano');

gulp.task('styles', () => {
  const processors = [
    // Inline Imports
    atImport(),
    // Rebase url(../../images/**/*) given the css file path is different
    cssurl(),
    // Parse CSS and ensure best browser support
    cssnext({
      warnForDuplicates: false,
    }),
    // Minify CSS output
    cssnano(),
  ];

  return gulp.src(global.config.src + '/**/*.css')
  .pipe(postcss(processors))
  .pipe(gulp.dest(global.config.dest));
});
