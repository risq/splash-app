import debug from 'debug';

import socket from './socket';
import Gyro from './gyro';
import Ui from './ui';

const dbg = debug('splash:app');

export default class App {
  constructor() {
    this.ui = new Ui();
    socket.init()
      .delay(3000)
      .then(this.initChoiceScreen.bind(this));
  }

  initChoiceScreen() {
    dbg('Init app');
    this.ui.displayChoiceScreen();

    this.ui.on('choiceGyro', this.initGyroMode.bind(this));
    this.ui.on('choicePaint', this.initPaintMode.bind(this));
  }

  initGyroMode() {
    dbg('Init gyro mode');
    this.ui.displayGyroScreen();
    this.gyro = new Gyro();
  }

  initPaintMode() {
    dbg('Init paint mode');
    this.ui.displayPaintScreen();
  }

}
