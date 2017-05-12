/**
 * Copyright 2014 Google Inc. All rights reserved.
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
class Toast {

  constructor() {
    this._view = document.querySelector('.toast-view');
    this._hideTimeout = 0;
  }

  show(message, timeoutSeconds) {
    if (!this._view) {
      console.warn('Unable to find toast-view. Cant display: ', message);
      return;
    }

    this._view.textContent = message;
    this._view.classList.add('toast-view--visible');

    clearTimeout(this._hideTimeout);

    if (timeoutSeconds) {
      this._hideTimeout = setTimeout(() => this.hide(), timeoutSeconds * 1000);
    }
  }

  hide() {
    this._view.classList.remove('toast-view--visible');
  }
}

window.addEventListener('load', function() {
  if (window.__workbox && window.__workbox.toast) {
    console.warn('self.__workbox.toast is already defined.');
    return;
  }

  window.__workbox = window.__workbox || {};
  window.__workbox.toast = new Toast();
});
