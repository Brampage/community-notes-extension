import {LitElement, css, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

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
      overflow: hidden;

      width: 50%;

      border: solid 1px grey;
      border-radius: 5px;
      background: #f7f7f7;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
      font-size: small;

      z-index: 999;
    }

    .popup-content {
      display: flex;
      flex-direction: column;
      gap: 1em;
      padding: 1em;

      max-height: 60vh;
      overflow-y: auto;
    }

    .popup-tabs {
      display: flex;
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
      font-weight: bold;
    }

    .popup-tabs > div:hover {
      background: #eee;
    }
  `;

  handleSave(_event: Event) {
    this.activeTab = Tab.Notes;
  }

  handleTabChange(tab: Tab) {
    this.activeTab = tab;
  }

  navigateToForm() {
    this.activeTab = Tab.Form;
  }

  renderContents() {
    return html`<div class="popup-content">
      ${this.activeTab === Tab.Form
        ? html`<cn-popup-form
            .selectedText=${this.selectedText}
            @onSave=${this.handleSave}
          ></cn-popup-form>`
        : html`<cn-popup-list
            @navigateToForm=${this.navigateToForm}
          ></cn-popup-list>`}
    </div>`;
  }

  renderTabs() {
    return html`<div class="popup-tabs">
      ${Tabs.map(
        (tab) =>
          html`<div
            @click=${() => this.handleTabChange(tab.name)}
            class="${classMap({
              active: this.activeTab === tab.name,
            })})}"
          >
            ${tab.label}
          </div>`
      )}
    </div>`;
  }

  render() {
    return html`<div class="popup">
      ${this.renderContents()} ${this.renderTabs()}
    </div>`;
  }
}
