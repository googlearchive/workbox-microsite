/**
 *
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This class handles logic for opening and closing the navigation drawer
 */
class NavigationController {
  /**
   * This method sets up the navigation for the site and throws an error is
   * anything can't be completed.
   */
  constructor() {
    this._navDrawer = new window.__npmPublishScripts.NavDrawer();
    this._jsdocCollapse = new window.__npmPublishScripts.JSDocCollapse();

    this._configureMenuBtn();
    this._configureAnchors();
  }

  /**
   * This sets up the menu btn to open / close the nav drawer.
   */
  _configureMenuBtn() {
    const menuBtn = document.querySelector('.js-menu-btn');
    if(!menuBtn) {
      console.warn('Unable to find js-menu-btn.');
      return;
    }

    menuBtn.addEventListener('click', () => {
      this.toggleNavDrawer();
    });
  }

  /**
   * Use third party anchor-js to add anchors to headings.
   */
  _configureAnchors() {
    const anchorScriptElement = document.querySelector('#anchorjsscript');
    if (!anchorScriptElement) {
      // This page doesn't have the anchorjs script.
      return;
    }

    const loadAnchors = () => {
      window.anchors.options = {
        placement: 'left',
      };
      window.anchors.add(
        'main h1, main h2, main h3, main h4, main h5, main h6');
    };
    anchorScriptElement.onload = loadAnchors;
    if (window.anchors) {
      loadAnchors();
    }
  }

  /**
   * This toggles the nav drawer open and closed
   */
  toggleNavDrawer() {
    this._navDrawer.toggle();
  }
}

window.addEventListener('load', function() {
  if (!window.__npmPublishScripts || !window.__npmPublishScripts.NavDrawer) {
    throw new Error('self.__npmPublishScripts.NavDrawer is not defined.');
  }

  window.__npmPublishScripts = window.__npmPublishScripts || {};
  window.__npmPublishScripts.navController = new NavigationController();
});
