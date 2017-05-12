'use strict';

/* eslint-env node */
/* eslint-disable no-console, require-jsdoc */

const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;
const os = require('os');

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

function processPromiseWrapper(command, args) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, {stdio: 'inherit'});
    process.on('error', reject);
    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(`Error ${code} returned from ${command} ${args}`);
      }
    });
  });
}

gulp.task('serve:prod', gulp.series(['build', () => {
  const nodeCommand = os.platform() === 'win32' ? 'npm.cmd' : 'npm';
  return processPromiseWrapper(nodeCommand,
    ['run', 'serve']);
}]));

gulp.task('default', gulp.parallel(['build']));
