const gulp = require('gulp');
const spawn = require('child_process').spawn;
const remoteGitTags = require('remote-git-tags');
const del = require('del');
const path = require('path');
const fs = require('fs');
const findup = require('findup-sync');
const meow = require('meow');
const chokidar = require('chokidar');
const semver = require('semver');
const fsExtra = require('fs-extra');

const exitLifeCycle = require('./utils/exit-lifecycle');

const REFERENCE_DOCS_DIR = 'reference-docs';
const GIT_REPO = 'github.com/GoogleChrome/workbox';
const TMP_PATH = path.join(__dirname, '..', 'tmp-' + Date.now());

const downloadTaggedRelease = (tagName) => {
  console.log(`    Downloading tagged release: ${tagName}`);

  const docPath = path.join(TMP_PATH, tagName);
  return new Promise((resolve, reject) => {
    const gitDownload = spawn('git', [
      'clone',
      '--branch', tagName,
      '--depth', '1',
      `http://${GIT_REPO}.git`,
      docPath,
    ], {
      stdio: 'inherit',
    });

    gitDownload.on('error', (err) => {
      console.error('Unable to retrieve tags for Git.');
      console.error(err);
    });

    gitDownload.on('close', (code) => {
      if (code === 0) {
        resolve(docPath);
      } else {
        reject();
      }
    });
  });
};

const generateReferenceDocs = (tagName) => {
  return downloadTaggedRelease(tagName);
};

const buildJSDocs = (docPath, version) => {
  console.log(`    Building JSDocs @ '${docPath}'. Version: ${version}`);

  const jsdocConf = path.join(process.cwd(), 'jsdoc.conf');

    try {
      fs.accessSync(jsdocConf, fs.F_OK);
    } catch (err) {
      console.log('Skipping JSDocs due to no jsdoc.conf');
      return;
    }

    const outputPath = path.join(__dirname, '..', 'src',
      REFERENCE_DOCS_DIR, version);
    const jsDocParams = [
      '-c', jsdocConf,
      '--template', path.join(__dirname, '..', 'src', 'themes', '_jsdoc'),
      '-d', outputPath,
    ];

    const jsdocPath = findup(path.join('node_modules', '.bin', 'jsdoc'));

    return new Promise((resolve, reject) => {
      console.log(`        JSDoc path: ${jsdocPath}`);
      console.log(`        JSDoc params: ` +
        `${JSON.stringify(jsDocParams, null, 2)}`);

      const jsdocProcess = spawn(jsdocPath, jsDocParams, {
        cwd: docPath,
        stdio: 'inherit',
      });

      jsdocProcess.on('error', (err) => {
        console.error('Unable to run jsdoc.');
        console.error(err);
      });

      jsdocProcess.on('close', (code) => {
        if (code === 0) {
          resolve(outputPath);
        } else {
          reject(outputPath);
        }
      });
    });
};

gulp.task('ref-docs:watch', () => {
  let fileWatchers = [];

  const cli = meow();
  if (!cli.flags.code) {
    console.warn(`

      If you want to build the latest refernce docs
      please run serve with the "--code" flag, passing
      in the path to the workbox repo.

          gulp serve --code ../workbox/

      `);
    return Promise.resolve();
  }

  global.jekyll = global.jekll || {};
  global.jekyll.debug = true;

  const DEVELOPMENT_TAG = 'v0.0.0';
  const codePath = path.join(process.cwd(), cli.flags.code);
  let outputPath;

  exitLifeCycle.addEventListener('exit', () => {
    if (fileWatchers && fileWatchers.length > 0) {
      fileWatchers.forEach((watcher) => {
        watcher.close();
      });
    }

    // This must be sync, otherwise the exit lifecycle
    // process.exit() will prevent the files from
    // actually deleting.
    del.sync(outputPath);
  });

  return buildJSDocs(codePath, DEVELOPMENT_TAG)
  .catch((jsdocPath) => jsdocPath)
  .then((jsdocPath) => {
    outputPath = jsdocPath;
    const watcher = chokidar.watch([
      path.join(codePath, '**', '*.*'),
      path.join(__dirname, 'src', 'themes', '**', '*.*'),
    ], {
      recursive: true,
    });
    watcher.on('change', () => {
      return buildJSDocs(codePath, DEVELOPMENT_TAG);
    });
    fileWatchers.push(watcher);
  });
});

const refDocsProd = () => {
  let allTags = [];
  let error = null;
  return remoteGitTags(GIT_REPO)
  .then((tags) => {
    const tagObject = {};
    tags.forEach((value, key) => {
      tagObject[key] = value;
      allTags.push(key);
    });

    return Object.keys(tagObject).filter((tag) => {
      const refPath = path.join(__dirname, '..', 'src',
        REFERENCE_DOCS_DIR, tag);
      try {
        fs.accessSync(refPath, fs.F_OK);

        console.log(`    Skipping build reference docs for ${tag}`);
        return false;
      } catch (err) {
        console.log(`    Building reference docs for ${tag}`);
        return true;
      }
    });
  })
  .then((tags) => {
    let promiseChain = Promise.resolve();
    tags.forEach((tag) => {
      promiseChain = promiseChain.then(() => {
        return generateReferenceDocs(tag);
      })
      .then((docPath) => {
        // TODO: Run JSDoc on docPath
        return buildJSDocs(docPath, tag);
      });
    });
    return promiseChain
    .then(() => {
      if(allTags.length === 0) {
        return;
      }

      allTags.sort(semver.rcompare);
      let latestTag = allTags[0];
      let tagPath = path.join(
        __dirname, '..', 'src', 'reference-docs', latestTag
      );
      let latestPath = path.join(
        __dirname, '..', 'src', 'reference-docs', 'latest'
      );
      return del(latestPath)
      .then(() => {
        fsExtra.copySync(tagPath, latestPath);
      });
    });
  })
  .catch((err) => {
    console.error('Problem pulling reference docs and generating them.');
    console.error(err);
    error = err;
  })
  .then(() => {
     return del(TMP_PATH);
  })
  .then(() => {
    if (error) {
      throw error;
    }
  });
};

const refDocsDev = () => {
  const cli = meow();

  global.jekyll = global.jekll || {};
  global.jekyll.debug = true;

  const DEVELOPMENT_TAG = 'v0.0.0';
  const codePath = path.join(process.cwd(), cli.flags.code);

  return buildJSDocs(codePath, DEVELOPMENT_TAG);
};

gulp.task('ref-docs', () => {
  const cli = meow();
  if (!cli.flags.code) {
    console.warn(`

      If you want to build the latest refernce docs
      please run serve with the "--code" flag, passing
      in the path to the workbox repo.

          gulp serve --code ../workbox/

      `);
    return refDocsProd();
  }

  return refDocsDev();
});
