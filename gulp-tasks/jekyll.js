'use strict';

const fse = require('fs-extra');
const gulp = require('gulp');
const path = require('path');
const spawn = require('child_process').spawn;


const addNpmDependencies = () => {
  const deps = [
    './node_modules/anchor-js/anchor.min.js',
    './node_modules/autotrack/autotrack.js',
  ];

  for (const src of deps) {
    const dest = path.join('src/themes/third_party', path.basename(src));
    fse.copySync(src, dest);
  }
}


const runJekyllCommand = (command, additionalParams) => {
  return new Promise((resolve, reject) => {
    addNpmDependencies();

    let params = [
      command,
      '--trace',
      '--source', path.join(__dirname, '..', 'src'),
    ];

    let configFiles = path.join(__dirname, '..', 'src', '_config.yml');
    if (global.jekyll && global.jekyll.debug) {
      configFiles += ',' +
        path.join(__dirname, '..', 'src', '_debug-config.yml');
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

gulp.task('jekyll:build', () => {
  return runJekyllCommand('build');
});

gulp.task('jekyll:serve', () => {
  return runJekyllCommand('serve');
});

gulp.task('jekyll:serve-fast', () => {
  return runJekyllCommand('serve', ['--incremental']);
});
