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
    .popup {
      display: block;
      position: fixed;
      height: 30em;
      max-width: 20em;
      bottom: 3em;
      right: 3em;
      padding: 1em;
      border: solid 1px black;
      border-radius: 5px;
      font-size: small;
      background: lightgrey;
      max-width: 30em;
      z-index: 999;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }

    .selected-text,
    textarea {
      margin-bottom: 1em;
    }

    .selected-text {
      user-select: none;
    }
  `;

  handleSave(_e: Event) {
    storeNote(window.location.href, this.note ?? '');

    const event = new Event('onSave');
    this.dispatchEvent(event);
  }

  render() {
    if (!this.isPopupShown) {
      return html``;
    }

    return html` <div class="popup">
      <h4>Create note for "${document.title}"</h4>

      ${this.selectedText
        ? html`<div class="selected-text">${this.selectedText}</div>`
        : html``}

      <form>
        <textarea
          id="note-field"
          style="width: calc(100% - 2em); padding: 1em;"
          placeholder="Your notes here..."
          name="note"
          @change=${(e: Event) =>
            (this.note = (e.target as HTMLTextAreaElement).value)}
        >
          ${this.note}
        </textarea
        >
        <button @click=${this.handleSave}>Save</button>
      </form>
    </div>`;
  }
}
