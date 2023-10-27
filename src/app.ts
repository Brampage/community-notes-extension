import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { highlightSelection } from './selection-handler';
import { getNotes } from './storage';

@customElement('cn-app')
export class App extends LitElement {
  @property()
  selectedText?: string;

  @property()
  isPopupShown = false;

  @state()
  badgeCount = 0;

  static styles = [
    css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      * {
        margin: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: black;
      }

      html,
      body {
        height: 100%;
      }

      body {
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
      }

      img,
      picture,
      video,
      canvas,
      svg,
      iframe {
        display: block;
        max-width: 100%;
        margin: 0 auto;
      }

      input,
      button,
      textarea,
      select {
        font: inherit;
      }

      p,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        overflow-wrap: break-word;
      }

      #root,
      #__next {
        isolation: isolate;
      }
    `,
  ];

  async connectedCallback() {
    super.connectedCallback();
    this.refreshBadgeCount();

    addEventListener('onSave', () => {
      this.refreshBadgeCount();
    });

    addEventListener('mouseup', () => {
      if (!this.isPopupShown) {
        const userSelection = window.getSelection()?.getRangeAt(0);
        this.selectedText = userSelection?.toString() ?? '';
      }
    });
  }

  async refreshBadgeCount() {
    this.badgeCount = (await getNotes(window.location.href)).length;
  }

  handleToggle(): void {
    this.isPopupShown = !this.isPopupShown;
    if (this.isPopupShown) {
      highlightSelection({ caller: this });
    }
    console.log('isPopupShown: ', this.isPopupShown);
  }

  render() {
    return html`
      <cn-popup-toggle
        .isPopupShown=${this.isPopupShown}
        @onTogglePopup=${this.handleToggle}
        .badgeCount=${this.badgeCount}
      ></cn-popup-toggle>

      ${this.isPopupShown
        ? html`<cn-popup .selectedText=${this.selectedText}></cm-popup>`
        : ''}
    `;
  }
}
