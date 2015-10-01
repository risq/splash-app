import debug from 'debug';
import $ from 'jquery';
import events from 'events';

import socket from './socket';

const dbg = debug('splash:ui');

export default class Ui extends events.EventEmitter {
  constructor() {
    super();
    this.$els = {
      paintDropButton: $('.paint-drop-button'),
      paintChoiceButton: $('.paint-choice-button'),
      gyroChoiceButton: $('.gyro-choice-button'),
      screens: {
        all: $('section'),
        splash: $('.splashscreen'),
        choice: $('.choicescreen'),
        paint: $('.paintscreen'),
        gyro: $('.gyroscreen'),
      },
    };
    this.initEvents();
  }

  initEvents() {
    this.$els.paintDropButton.on('mousedown touchstart', this.onPaintDropButtonDown.bind(this));
    this.$els.paintDropButton.on('mouseup touchend', this.onPaintDropButtonUp.bind(this));
    this.$els.paintChoiceButton.on('click', this.onPaintChoiceButtonClick.bind(this));
    this.$els.gyroChoiceButton.on('click', this.onGyroChoiceButtonClick.bind(this));
  }

  displayChoiceScreen() {
    dbg('displayChoiceScreen');
    this.$els.screens.all.removeClass('current');
    this.$els.screens.choice.addClass('current');
  }

  displayGyroScreen() {
    dbg('displayGyroScreen');
    this.$els.screens.all.removeClass('current');
    this.$els.screens.gyro.addClass('current');
  }

  displayPaintScreen() {
    dbg('displayPaintScreen');
    this.$els.screens.all.removeClass('current');
    this.$els.screens.paint.addClass('current');
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

  onPaintChoiceButtonClick(e) {
    e.preventDefault();
    this.emit('choicePaint');
  }

  onGyroChoiceButtonClick(e) {
    e.preventDefault();
    this.emit('choiceGyro');
  }

}
