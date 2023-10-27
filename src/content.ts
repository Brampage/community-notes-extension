import {render, html} from 'lit-html';

// Upon loading the file it executes customElements.define, and registers the components.
import './app';
import './components/popup-toggle';
import './components/popup-form';
import './components/popup';

console.log('content script loaded');

render(html`<cn-app></cn-app>`, document.body);
