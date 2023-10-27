import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {highlightSelection} from './selection-handler';
import { getNotes } from './storage';

@customElement('cn-app')
export class App extends LitElement {
  @property()
  selectedText?: string;

  @property()
  isPopupShown = false;

  async connectedCallback(): void {
    super.connectedCallback();

    console.log(await getNotes(window.location.href));

    addEventListener('mouseup', () => {
      if (!this.isPopupShown) {
        const userSelection = window.getSelection()?.getRangeAt(0);
        this.selectedText = userSelection?.toString() ?? '';
      }
    });
  }

  handleOnSave(): void {
    this.handleToggle();
  }

  handleToggle(): void {
    this.isPopupShown = !this.isPopupShown;
    if (
      this.isPopupShown
    ) {
      highlightSelection({caller:this});
    }
    console.log('isPopupShown: ', this.isPopupShown);
  }

  render() {
    return html`
      <cn-popup-toggle .isPopupShown=${this.isPopupShown} @onTogglePopup=${this.handleToggle}></cn-popup-toggle>

      <cn-popup .isPopupShown=${this.isPopupShown} .selectedText=${this.selectedText} @onSave=${this.handleOnSave}></cm-popup>
    `;
  }
}
