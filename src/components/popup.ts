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
    h4 {
      margin: 0;
    }

    .popup {
      display: block;
      position: fixed;
      height: 30em;
      bottom: 3em;
      right: 3em;

      padding: 1em;
      max-width: 20em;
      max-height: 30em;

      border: solid 1px grey;
      border-radius: 5px;
      background: lightgrey;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      font-size: small;

      z-index: 999;
    }

    textarea {
      padding: 1em;
      resize: none;
    }

    .selected-text {
      user-select: none;
    }

    .popup-content {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }
  `;

  handleSave(event: Event) {
    event.preventDefault();

    storeNote(window.location.href, this.note ?? '');
    const customEvent = new Event('onSave');
    this.dispatchEvent(customEvent);
  }

  render() {
    if (!this.isPopupShown) {
      return html``;
    }

    return html` <div class="popup">
      <div class="popup-content">
        <h4>Create note for "${document.title}"</h4>

        ${this.selectedText
          ? html`<div class="selected-text">${this.selectedText}</div>`
          : html``}

        <form>
          <textarea
            id="note-field"
            placeholder="Your notes here..."
            name="note"
            @change=${(e: Event) =>
              (this.note = (e.target as HTMLTextAreaElement).value)}
            rows="${this.selectedText ? 30 : 15}"
            cols="50"
          >
${this.note}</textarea
          >
          <button @click=${this.handleSave}>Save</button>
        </form>
      </div>
    </div>`;
  }
}
