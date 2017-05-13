const gulp = require('gulp');
const spawn = require('child_process').spawn;
const remoteGitTags = require('remote-git-tags');
const del = require('del');
const path = require('path');
const fs = require('fs');
const findup = require('findup-sync');

const REFERENCE_DOCS_DIR = 'reference-docs';
const GIT_REPO = 'github.com/GoogleChrome/workbox';
const TMP_PATH = path.join(__dirname, '..', 'tmp-' + Date.now());

const downloadTaggedRelease = (tagName) => {
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
          reject();
        }
      });
    });

    /** const jsdocPath = findup(
      path.join('node_modules', '.bin', 'jsdoc'));**/
};

gulp.task('ref-docs', () => {
  return remoteGitTags(GIT_REPO)
  .then((tags) => {
    const tagObject = {};
    tags.forEach((value, key) => {
      tagObject[key] = value;
    });

    return Object.keys(tagObject).filter((tag) => {
      const refPath = path.join(__dirname, '..', 'src',
        REFERENCE_DOCS_DIR, tag);
      try {
        fs.accessSync(refPath, fs.F_OK);

        console.log(`    Skipping build reference docs for ${tag}`);
        return false;
      } catch (err) {
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
    return promiseChain;
  })
  .catch((err) => {
    console.error('Problem pulling reference docs and generating them.');
    console.error(err);
  })
  .then(() => {
     return del(TMP_PATH);
  })
  .then(() => {
    // Put latest tag content into latest.
  });
});
