/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';

// TODO: Review this issue https://github.com/vaadin/vaadin-router/issues/408

export const renderPageNotFound = () => {
  import('../pages/page-not-found');

  return html`<page-not-found></page-not-found>`;
};
