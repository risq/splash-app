import debug from 'debug';
import Bluebird from 'bluebird';

const dbg = debug('splash:socket');

export default new class Socket {
  constructor() {
    this.state = 'waiting';
  }

  init() {
    this.socket = window.io('localhost:5000');

    return new Bluebird((resolve) => {
      dbg('Socket successfully connected');
      this.state = 'connected';
      this.socket.once('connected', resolve);
    });
  }

  emitOrientation(gamma, beta) {
    if (this.socket) {
      this.socket.emit('orientation', {
        gamma,
        beta,
      });
    }
  }
};
