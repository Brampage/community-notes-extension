import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Note } from "../storage";

@customElement('cn-note')
export class PopupNote extends LitElement {
  @property()
  note?: Note;

  static styles = css`

    .link {
      display: flex;
      flex-direction: column;
      gap: 0.5em;

      background: white;
      padding: 1em;
      margin-bottom: 1em;
      cursor: pointer;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .link:hover {
      border: 1px solid #888;
    }
    p {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
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
