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
 * This call simply collapses the docs on the signatures of methods.
 */
class JSDocCollapse {
  /**
   * The class configures the behaviors in the constructor.
   */
  constructor() {
    const collapsingTypes = [
      'method-type-function',
      'method-type-class',
      'member-type-member',
      'member-type-typedef',
    ];
    collapsingTypes.forEach((methodClassname) => {
      const signatureElements =
        document.querySelectorAll(`.collapsing-entry.${methodClassname}`);
      signatureElements.forEach((element) => {
        if (element.querySelector('.js-collapse-details')) {
          this._configureElementBehavior(element);
        }
      });
    });
  }

  /**
   * This method will configure the show and hide behavior of the collapsing
   * sections.
   * @param {DomElement} element The element to configure to show and hide.
   */
  _configureElementBehavior(element) {
    const signatureTitle = element.querySelector('.js-collapse-title');
    const collapseElement = element.querySelector('.js-collapse-details');
    const closedCssClassName = 'is-closed';
    signatureTitle.addEventListener('click', (event) => {
      if (collapseElement.classList.contains(closedCssClassName)) {
        collapseElement.classList.remove(closedCssClassName);
      } else {
        collapseElement.classList.add(closedCssClassName);
      }
    });

    if (signatureTitle.id !== location.hash.substring(1) &&
      !element.classList.contains('start-open')) {
      collapseElement.classList.add(closedCssClassName);
    }
  }
}

window.__npmPublishScripts = window.__npmPublishScripts || {};
window.__npmPublishScripts.JSDocCollapse = JSDocCollapse;
