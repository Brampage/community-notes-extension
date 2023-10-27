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
      border: 1px solid #ddd;
    }

    .selected-text {
      user-select: none;
      font-style: italic;
      border-left: 3px solid #ddd;
      background: #eee;
      padding: 0 1em;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    button {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 0.7em;
      cursor: pointer;
    }

    button:hover {
      background: #eee;
    }
  `;

  async handleSave(event: Event) {
    event.preventDefault();

    await storeNote(window.location.href, {
      note: this.note ?? '',
      selectedText: this.selectedText ?? '',
      domain: window.location.hostname,
      url: window.location.href,
      title: document.title,
    });
    const customEvent = new Event('onSave', { bubbles: true, composed: true });
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
          rows="15"
          cols="50"
        >
${this.note}</textarea
        >
        <button @click=${this.handleSave}>Save</button>
      </form>`;
  }
}
