'use strict';

const gulp = require('gulp');
const path = require('path');
const spawn = require('child_process').spawn;

const JEKYLL_ROOT = path.join(__dirname, '..', 'src');
const NODE_MODULES = path.join(__dirname, '..', 'node_modules');

const runJekyllCommand = (command, additionalParams) => {
  return new Promise((resolve, reject) => {
    let params = [
      command,
      '--trace',
      '--source', JEKYLL_ROOT,
    ];

    let configFiles = path.join(JEKYLL_ROOT, '_config.yml');
    if (global.jekyll && global.jekyll.debug) {
      configFiles += ',' +
        path.join(JEKYLL_ROOT, '_debug-config.yml');
    }

    params.push('--config');
    params.push(configFiles);

    if (additionalParams) {
      params = params.concat(additionalParams);
    }

    const jekyllProcess = spawn('jekyll', params, {
      stdio: 'inherit',
    });

    jekyllProcess.on('error', (err) => {
      console.error('Unable to run Jekyll. Please ensure that you ' +
        'run the followings commands:');
      console.error('');
      console.error('    gem install bundler');
      console.error('    rvm . do bundle install');
      console.error('');
      console.error(err);
    });

    jekyllProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

gulp.task('npm-dependencies', () => {
  return gulp.src([
    path.join(NODE_MODULES, 'anchor-js', 'anchor.min.js'),
    path.join(NODE_MODULES, 'autotrack', 'autotrack.js'),
  ])
  .pipe(gulp.dest(path.join(JEKYLL_ROOT, 'themes', 'third_party')));
});

gulp.task('jekyll:build', gulp.series('npm-dependencies', () => {
  return runJekyllCommand('build');
}));

gulp.task('jekyll:serve', gulp.series('npm-dependencies', () => {
  return runJekyllCommand('serve');
}));

gulp.task('jekyll:serve-fast', gulp.series('npm-dependencies', () => {
  return runJekyllCommand('serve', ['--incremental']);
}));
