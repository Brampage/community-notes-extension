import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("cn-popup-toggle")
export class PopupToggle extends LitElement {
  @property()
  isPopupShown?: string;

  static styles = css`
    button:hover {
      background-color:#F5E100;
      border: 1px solid #EDD54C;
    }
    button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color:#F4C501;
      border: 1px solid #F58600;
      color: #F58600;
      cursor: pointer;
      border: none;
      z-index: 9999;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }
    svg {
      padding-top: 4px;
    }
  `;

  handleTogglePopup(_e: Event) {
    const event = new Event("onTogglePopup");
    this.dispatchEvent(event);
  }

  render() {
    return html`<button id="popup-toggle" @click=${this.handleTogglePopup}>
      ${this.isPopupShown
        ? html`<svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
            />
          </svg>`
        : html`<svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M17.5 21h1v-2.5H21v-1h-2.5V15h-1v2.5H15v1h2.5V21Zm.5 2q-2.075 0-3.538-1.463T13 18q0-2.075 1.463-3.538T18 13q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23ZM7 9h10V7H7v2Zm4.675 12H5q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v6.7q-.725-.35-1.463-.525T18 11q-.275 0-.513.012t-.487.063V11H7v2h6.125q-.45.425-.813.925T11.675 15H7v2h4.075q-.05.25-.063.488T11 18q0 .825.15 1.538T11.675 21Z"
            />
          </svg>`}
    </button>`;
  }
}
