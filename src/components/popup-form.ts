import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { storeNote } from '../storage';

@customElement('cn-popup-form')
export class PopupForm extends LitElement {
  @property()
  selectedText?: string;

  note?: string;

  static styles = css`
    :host {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    h4 {
      margin: 0;
    }

    textarea {
      padding: 1em;
      resize: none;
    }

    .selected-text {
      user-select: none;
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
    return html` <h4>Create note for "${document.title}"</h4>

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
      </form>`;
  }
}