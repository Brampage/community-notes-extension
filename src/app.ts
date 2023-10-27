import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { highlightSelection } from "./selection-handler";
import { getNotes } from "./storage";

@customElement("cn-app")
export class App extends LitElement {
  @property()
  selectedText?: string;

  @property()
  isPopupShown = false;

  static styles = [
    css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      * {
        margin: 0;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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

    console.log(await getNotes(window.location.href));

    addEventListener("mouseup", () => {
      if (!this.isPopupShown) {
        const userSelection = window.getSelection()?.getRangeAt(0);
        this.selectedText = userSelection?.toString() ?? "";
      }
    });
  }

  handleOnSave(): void {
    this.handleToggle();
  }

  handleToggle(): void {
    this.isPopupShown = !this.isPopupShown;
    if (this.isPopupShown) {
      highlightSelection({ caller: this });
    }
    console.log("isPopupShown: ", this.isPopupShown);
  }

  render() {
    return html`
      <cn-popup-toggle
        .isPopupShown=${this.isPopupShown}
        @onTogglePopup=${this.handleToggle}
      ></cn-popup-toggle>

      ${this.isPopupShown
        ? html`<cn-popup .selectedText=${this.selectedText} @onSave=${this.handleOnSave}></cm-popup>`
        : ''}
    `;
  }
}
