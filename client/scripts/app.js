import debug from 'debug';

import socket from './socket';
import Gyro from './gyro';
import Ui from './ui';

const dbg = debug('splash:app');

export default class App {
  constructor() {
    socket.init()
      .then(this.initApp.bind(this));
  }

  initApp() {
    dbg('init app');
    this.gyro = new Gyro();
    this.ui = new Ui();
  }

}
