import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('cn-popup')
export class Popup extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      height: 30em;
      bottom: 3em;
      right: 3em;
      padding: 1em;
      border: solid 1px black;
      border-radius: 5px;
      font-size: small;
      background: lightgrey;
      max-width: 30em;
    }
  `;

  @property()
  text?: string;

  render() {
    return html`
      <div style="padding: 1em">
        <div style="margin-bottom: 1em;">${this.text}</div>
        <form id="note-form" style="margin-bottom: 1em;">
          <textarea
            id="note-field"
            style="width: 100%; padding: 1em;"
            placeholder="Your notes here..."
            name="note"
          ></textarea>
        </form>
      </div>`;
  }
}
