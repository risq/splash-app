import debug from 'debug';
import $ from 'jquery';

import socket from './socket';

const dbg = debug('splash:ui');

export default class Ui {
  constructor() {
    this.$els = {
      paintDropButton: $('.paint-drop-button'),
    };
    this.initEvents();
  }

  initEvents() {
    dbg('els', this.$els);
    this.$els.paintDropButton.on('mousedown touchstart', this.onPaintDropButtonDown.bind(this));
    this.$els.paintDropButton.on('mouseup touchend', this.onPaintDropButtonUp.bind(this));
  }

  onPaintDropButtonDown(e) {
    e.preventDefault();
    dbg('Paint drop button down');
    socket.startPaintDrop();
  }

  onPaintDropButtonUp(e) {
    e.preventDefault();
    dbg('Paint drop button up');
    socket.stopPaintDrop();
  }
}
