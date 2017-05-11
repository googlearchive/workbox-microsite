'use strict';

const gulp = require('gulp');
const path = require('path');
const spawn = require('child_process').spawn;

const runJekyllCommand = (command, additionalParams) => {
  return new Promise((resolve, reject) => {
    let params = [
      command,
      '--trace',
      '--source', path.join(__dirname, '..', 'src'),
      '--config', path.join(__dirname, '..', 'src', '_config.yml'),
    ];

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

gulp.task('jekyll:build', () => {
  return runJekyllCommand('build');
});

gulp.task('jekyll:serve', () => {
  return runJekyllCommand('serve', ['--incremental']);
});
