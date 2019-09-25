/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { html, customElement } from 'lit-element';

import { ApolloQueryElement } from '../helpers/apollo-query-element';
import { gql } from '../graphql-service';

@customElement('page-home')
export class PageHome extends ApolloQueryElement {
  queryVariables = {
    limit: 10
  };

  query = gql`
    query GetUsers($limit: Int) {
      users(limit: $limit) {
        username
      }
    }
  `;

  protected render() {
    // prettier-ignore
    return html`
      <section>
        <h1>Home</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi,
          delectus? Unde, sit. Fuga modi ea praesentium. Nemo dicta qui, magnam
          cum dolorum excepturi beatae explicabo quidem fugiat ullam blanditiis
          minima!
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi,
          delectus? Unde, sit. Fuga modi ea praesentium. Nemo dicta qui, magnam
          cum dolorum excepturi beatae explicabo quidem fugiat ullam blanditiis
          minima!
        </p>

        <h2>Users</h2>

        ${this.loading ? html`
          <div>Loading users...</div>
        ` : !this.loading && this.data ? html`
          <ul>
            ${this.data.users.map((user: any) => html`
              <li>${user.username}</li>
            `)}
          </ul>
        ` : null}
      </section>
    `;
  }
}
