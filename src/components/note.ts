import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Note } from "../storage";
import { classMap } from "lit/directives/class-map.js";

@customElement("cn-note")
export class PopupNote extends LitElement {
  @property()
  note?: Note;

  @property()
  full?: boolean;

  static styles = css`
    .link {
      display: flex;
      flex-direction: column;
      gap: 0.2em;

      background: white;
      padding: 1em;
      cursor: pointer;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .link:hover {
      border: 1px solid #888;
    }
    .link:not(.full) p {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .link:not(.full) h4 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    h4,
    p {
      margin: 0;
    }
    p#selectedText {
      font-style: italic;
      border-left: 3px solid #ddd;
      background: #eee;
      padding: 0 1em;
    }
  `;

  render() {
    return html`
      <div class="link ${classMap({ full: !!this.full })}">
        ${this.note?.title && html`<h4>${this.note.title}</h4>`}
        ${this.note?.selectedText &&
        html`<p id="selectedText">${this.note.selectedText}</p>`}
        ${this.note?.note && html`<p>${this.note.note}</p>`}
        ${this.note?.domain && html`<a href="#">${this.note.domain}</a>`}
      </div>
    `;
  }
}
