import debug from 'debug';
import Bluebird from 'bluebird';

const dbg = debug('splash:socket');

export default new class Socket {
  constructor() {
    this.state = 'waiting';
  }

  init() {
    this.socket = window.io('192.168.31.92:5000');

    return new Bluebird((resolve) => {
      dbg('Socket successfully connected');
      this.state = 'connected';
      this.socket.once('connected', resolve);
    });
  }

  emitOrientation(gamma, beta) {
    if (this.state === 'connected') {
      dbg('Emitting orientation', gamma, beta);
      this.socket.emit('orientation', {
        gamma,
        beta,
      });
    }
  }
};
