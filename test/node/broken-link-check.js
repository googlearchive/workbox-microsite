const superstatic = require('superstatic').server;
const blc = require('broken-link-checker');

describe('Check for Broken Links', function() {
  const PORT = 3475;
  let superstaticApp = null;
  let superstaticServer = null;
  let testServerUrl = null;

  before(function() {
    superstaticApp = superstatic({
      port: PORT,
    });

    return new Promise((resolve) => {
      superstaticServer = superstaticApp.listen(function() {
        testServerUrl = `http://localhost:${PORT}`;
        resolve();
      });
    });
  });

  after(function() {
    superstaticServer.close();
  });

  it('should have no broken links', function() {
    this.timeout(60000);
    return new Promise((resolve, reject) => {
      const brokenLinks = [];
      const warningLinks = [];
      const options = {};
      const siteChecker = new blc.SiteChecker(options, {
        link: (result) => {
          if (result.broken) {
            if (result.base.resolved.startsWith(
              `${testServerUrl}/reference-docs/`)) {
              warningLinks.push(result);
            } else {
              brokenLinks.push(result);
            }
          }
        },
        end: () => {
          warningLinks.forEach((warningLink) => {
            console.warn(`-----------------------------------------`);
            console.warn(`Warning on: ${warningLink.base.resolved}`);
            console.warn(`              .............              `);
            console.warn(`Original Link: ${warningLink.url.original}`);
            console.warn(`Resolved Link: ${warningLink.url.resolved}`);
            console.warn(`HTML Text: ${warningLink.html.text}`);
            console.warn(`HTML Tag: ${warningLink.html.tag}`);
            console.warn(`-----------------------------------------`);
            console.warn(``);
          });

          if (brokenLinks.length > 0) {
            brokenLinks.forEach((brokenLink) => {
              console.log(brokenLink);
              console.error(`Error on: ${brokenLink.base.resolved}`);
              console.error(`    Original Link: ${brokenLink.url.original}`);
              console.error(`    Resolved Link: ${brokenLink.url.resolved}`);
              console.error(`    HTML Text: ${brokenLink.html.text}`);
              console.error(`    HTML Tag: ${brokenLink.html.tag}`);
              console.error(``);
            });
            return reject(new Error(`Broken links found: Count ` +
              `- ${brokenLinks.length}`));
          }
          return resolve();
        },
      });

      siteChecker.enqueue(testServerUrl);
    });
  });
});
