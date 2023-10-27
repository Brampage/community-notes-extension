import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('cn-popup-toggle')
export class PopupToggle extends LitElement {
  @property()
  isPopupShown?: string;

  static styles = css`
    button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: grey;
      color: white;
      cursor: pointer;
      border: none;
      z-index: 9999;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }
  `;

  handleTogglePopup(_e: Event) {
    const event = new Event('onTogglePopup');
    this.dispatchEvent(event);
  }

  render() {
    return html`<button id="popup-toggle" @click=${this.handleTogglePopup}>
      ${this.isPopupShown ? 'X' : 'C'}
    </button>`;
  }
}
