import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {storeNote} from '../storage';

@customElement('cn-popup')
export class Popup extends LitElement {
  @property()
  isPopupShown = false;

  @property()
  selectedText?: string;

  note?: string;

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

  handleSave(_e: Event) {
    storeNote(window.location.href, this.note ?? '');

    const event = new Event('onSave');
    this.dispatchEvent(event);
    console.log('note: ', this.note);
  }

  render() {
    if (!this.isPopupShown) {
      return html``;
    }

    return html` <div style="padding: 1em">
      <div style="margin-bottom: 1em;">${this.selectedText}</div>
      <form id="note-form" style="margin-bottom: 1em;">
        <span>${this.isPopupShown}</span>
        <textarea
          id="note-field"
          style="width: 100%; padding: 1em;"
          placeholder="Your notes here..."
          name="note"
          @change=${(e: Event) =>
            (this.note = (e.target as HTMLTextAreaElement).value)}
        >
          ${this.note}
        </textarea
        >
        <button @click=${this.handleSave}></button>
      </form>
    </div>`;
  }
}
