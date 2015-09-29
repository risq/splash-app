import debug from 'debug';

import Gyro from './gyro';
import socket from './socket';

const dbg = debug('splash:app');

export default class App {
  constructor() {
    socket.init()
      .then(this.initApp.bind(this));
  }

  initApp() {
    dbg('init app');
    this.gyro = new Gyro();
  }
}
