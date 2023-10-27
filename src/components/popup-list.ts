import {LitElement, css, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {Note, getNotes} from '../storage';

@customElement('cn-popup-list')
export class PopupList extends LitElement {
  static styles = css``;

  @state()
  notes: Note[] = [];

  async connectedCallback() {
    super.connectedCallback();

    this.notes = await getNotes(window.location.href);
    console.log('notes: ', this.notes);
  }
  render() {
    return html`${this.notes.map(
      (note) => html`<cn-link .note=${note}></cn-link>`
    )} `;
  }
}
