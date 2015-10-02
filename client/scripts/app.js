import debug from 'debug';

import socket from './socket';
import Gyro from './gyro';
import Webcam from './webcam';
import Ui from './ui';

const dbg = debug('splash:app');

export default class App {
  constructor() {
    this.ui = new Ui();
    socket.init()
      .delay(250)
      .then(this.ui.animationSplashscreen.bind(this.ui))
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
    this.webcam = new Webcam();
  }

  initPaintMode() {
    dbg('Init paint mode');
    this.ui.displayPaintScreen();
  }

}
