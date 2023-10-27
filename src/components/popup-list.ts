import {LitElement, css, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {Note, getNotes} from '../storage';

@customElement('cn-popup-list')
export class PopupList extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    .no-notes {
      background: white;
      padding: 1em;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
  `;

  @state()
  notes: Note[] = [];

  async connectedCallback() {
    super.connectedCallback();

    this.notes = await getNotes(window.location.href);
    console.log('notes: ', this.notes);
  }

  @state()
  fullNote?: Note;

  openNote(note: Note) {
    this.fullNote = note;
    console.log('>>> full note', this.fullNote);
  }

  handleNavigateToForm() {
    const event = new Event('navigateToForm');
    this.dispatchEvent(event);
  }

  render() {
    if (!this.notes.length) {
      return html` <div class="no-notes">
        <p>
          No notes yet. Create one
          <a href="#0" @click=${this.handleNavigateToForm}>here</a>.
        </p>
      </div>`;
    }

    return !!this.fullNote
      ? html`<cn-note .full=${true} .note=${this.fullNote}></cn-note>`
      : html`${this.notes.map(
          (note) =>
            html`<cn-note
              @click=${() => this.openNote(note)}
              .note=${note}
            ></cn-note>`
        )} `;
  }
}
