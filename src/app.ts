import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {highlightSelection} from './selection-handler';

import './components/popup-toggle';

@customElement('cn-app')
export class App extends LitElement {
  @property()
  selectedText?: string;

  connectedCallback(): void {
    super.connectedCallback();
    addEventListener('mouseup', () => {
      var userSelection = window.getSelection()?.getRangeAt(0);
      this.selectedText = userSelection?.toString() ?? '';
    });
  }

  handleOnSave(): void {
    highlightSelection();
  }

  render() {
    return html`
      <h1 id="test">TEST</h1>
      <!-- <cn-popup-toggle></cn-popup-toggle> -->

      <!-- <cn-popup text="${this
        .selectedText}" @onSave=${this.handleOnSave()}></cm-popup> -->
    `;
  }
}
