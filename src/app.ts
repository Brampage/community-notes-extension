import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {highlightSelection} from './selection-handler';

@customElement('cn-app')
export class App extends LitElement {
  @property()
  selectedText?: string;

  @property()
  isPopupShown = false;

  connectedCallback(): void {
    super.connectedCallback();
    addEventListener('mouseup', () => {
      if (!this.isPopupShown) {
        const userSelection = window.getSelection()?.getRangeAt(0);
        this.selectedText = userSelection?.toString() ?? '';
      }
    });
  }

  handleOnSave(): void {
    highlightSelection();
  }

  handleToggle(): void {
    this.isPopupShown = !this.isPopupShown;
    console.log('isPopupShown: ', this.isPopupShown);
  }

  render() {
    return html`
      <cn-popup-toggle .isPopupShown=${this.isPopupShown} @onTogglePopup=${this.handleToggle}></cn-popup-toggle>

      <cn-popup .isPopupShown=${this.isPopupShown} .selectedText=${this.selectedText} @onSave=${this.handleOnSave}></cm-popup>
    `;
  }
}
