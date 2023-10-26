import {render, html} from 'lit-html';
import './app';
import './components/popup-toggle';

console.log('content script loaded');

render(html`<cn-app></cn-app>`, document.body);
