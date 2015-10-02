import debug from 'debug';
import Bluebird from 'bluebird';
import io from 'socket.io-client';
import $ from 'jquery';

const dbg = debug('splash:socket');

export default new class Socket {
  constructor() {
    this.state = 'waiting';
    this.config = {};
  }

  init() {
    return Bluebird.resolve($.getJSON('/config'))
      .then((config) => {
        dbg('Config successfully loaded');
        this.config = config;
        this.socket = io(`http://${this.config.host}:${this.config.port}`);

        return new Bluebird((resolve) => {
          this.socket.once('connected', resolve);
        }).then(this.onSocketConnected.bind(this));
      });
  }

  onSocketConnected() {
    dbg('Socket successfully connected');
    this.state = 'connected';
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

  requestVideoStream(id) {
    if (this.state === 'connected') {
      dbg('Requesting video stream', id);
      this.socket.emit('request stream', id);
    }
  }
};
