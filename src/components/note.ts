import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Note} from '../storage';

@customElement('cn-note')
export class PopupNote extends LitElement {
  @property()
  note?: Note;

  static styles = css`
    .link {
      display: flex;
      flex-direction: column;
      gap: 0.2em;

      background: white;
      padding: 1em;
    }

    h4,
    p {
      margin: 0;
    }
  `;

  render() {
    return html`
      <div class="link">
        ${this.note?.title && html`<h4>${this.note.title}</h4>`}
        ${this.note?.note && html`<p>${this.note.note}</p>`}
        ${this.note?.selectedText && html`<p>${this.note.selectedText}</p>`}
        ${this.note?.domain && html`<a href="#">${this.note.domain}</a>`}
      </div>
    `;
  }
}
