import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { storeNote } from '../storage';

enum Tab {
  Form = 'Form',
  Notes = 'Notes',
}

const Tabs = [
  {
    name: Tab.Form,
    label: 'New note',
  },
  {
    name: Tab.Notes,
    label: 'Notes',
  },
];

@customElement('cn-popup')
export class Popup extends LitElement {
  @property()
  isPopupShown = false;

  @property()
  selectedText?: string;

  @state()
  activeTab?: Tab = Tab.Form;

  note?: string;

  static styles = css`
    h4 {
      margin: 0;
    }

    .popup {
      display: block;
      position: fixed;
      bottom: 3em;
      right: 3em;

      padding: 1em;
      width: 20em;

      border: solid 1px grey;
      border-radius: 5px;
      background: lightgrey;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      font-size: small;

      z-index: 999;
    }

    .popup-content {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    .popup-tabs {
      display: flex;
      gap: 0.5em;
    }

    .popup-tabs > div {
      width: 100%;
      text-align: center;
      background: #fff;
      margin: 1em 0 0 0;
      padding: 1em;
      cursor: pointer;
    }

    .popup-tabs > div.active {
      border: 1px solid red;
    }
  `;

  handleSave(event: Event) {
    event.preventDefault();

    storeNote(window.location.href, this.note ?? '');
    const customEvent = new Event('onSave');
    this.dispatchEvent(customEvent);
  }

  handleTabChange(tab: Tab) {
    this.activeTab = tab;
  }

  render() {
    if (!this.isPopupShown) {
      return html``;
    }

    return html`<div class="popup">
      <div class="popup-content">
        ${this.activeTab === Tab.Form
          ? html`<cn-popup-form></cn-popup-form>`
          : html`<cn-popup-list></cn-popup-list>`}
      </div>
      <div class="popup-tabs">
        ${Tabs.map(
          (tab) =>
            html`<div @click=${() => this.handleTabChange(tab.name)} class=${classMap({
              active: this.activeTab === tab.name,
            })
            })}>
              ${tab.label}
            </div>`
        )}
      </div>
    </div>`;
  }
}
