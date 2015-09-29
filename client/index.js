import $ from 'jquery';
import debug from 'debug';

import App from './scripts/app.js';

const dbg = debug('splash:index');

function onDocumentReady() {
  dbg('document ready');
  const app = new App();
  dbg(app);
}

$(onDocumentReady);
