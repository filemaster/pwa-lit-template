/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import { html, customElement } from 'lit-element';

import { QueryElement } from '../components/query-element';
import { client, gql } from '../graphql-service';

@customElement('page-about')
export class PageAbout extends QueryElement {
  mutation = gql`
    mutation updateUserMutation($id: ID!, $username: String!) {
      updateUser(input: { where: { id: $id }, data: { username: $username } }) {
        user {
          username
        }
      }
    }
  `;

  constructor() {
    super(
      gql`
        query {
          user(id: 1) {
            username
          }
        }
      `
    );
  }

  protected render() {
    return html`
      <section>
        <h1>About</h1>

        ${this.loading
          ? html`
              <div>Loading user with id 1...</div>
            `
          : !this.loading && this.data
          ? html`
              <ul>
                <li>${this.data.user.username}</li>
              </ul>
            `
          : null}

        <form id="form" @submit="${this.updateUser}">
          <label for="username">New username:</label>
          <input id="username" name="username" type="text" />
          <input type="submit" value="Modify" />
        </form>
      </section>
    `;
  }

  protected async updateUser(e: Event) {
    e.preventDefault();

    const form =
      this.shadowRoot &&
      (this.shadowRoot.getElementById('form') as HTMLFormElement | undefined);
    if (form) {
      const formData = new FormData(form);
      const username = formData.get('username');

      await client.mutate({
        mutation: this.mutation,
        variables: { id: 1, username }
      });
    }
  }
}
