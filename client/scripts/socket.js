import debug from 'debug';
import Bluebird from 'bluebird';
import io from 'socket.io-client';

const dbg = debug('splash:socket');

export default new class Socket {
  constructor() {
    this.state = 'waiting';
  }

  init() {
    this.socket = io('http://192.168.31.92:5000');

    return new Bluebird((resolve) => {
      dbg('Socket successfully connected');
      this.state = 'connected'; // TODO
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

  startPaintDrop() {
    if (this.state === 'connected') {
      dbg('Emitting paint drop start');
      this.socket.emit('paint start');
    }
  }

  stopPaintDrop() {
    if (this.state === 'connected') {
      dbg('Emitting paint drop stop');
      this.socket.emit('paint stop');
    }
  }
};
