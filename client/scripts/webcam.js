import debug from 'debug';
import $ from 'jquery';
import Peer from 'peerjs';

import socket from './socket';

const dbg = debug('splash:webcam');

export default class Webcam {
  constructor() {
    dbg('Init webcam');
    this.id = Math.round(Math.random() * 1000);
    this.video = $('video')[0];
    this.initConnection();
  }

  initConnection() {
    this.connection = new Peer(this.id, {
      host: '192.168.31.92',
      port: 5000,
      path: '/peer',
      config: {
        iceServers: [{
            url: 'stun:stun1.l.google.com:19302',
          }, {
            url: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com',
          },
        ],
      },
    });

    this.connection.on('open', this.onPeerReady.bind(this));
    this.connection.on('call', this.receiveCall.bind(this));
  }

  onPeerReady() {
    dbg('Peer ready');
    socket.requestVideoStream(this.id);
  }

  receiveCall(call) {
    dbg('get call', call);
    this.peerCall = call;
    this.peerCall.on('stream', this.receiveStream.bind(this));
    navigator.getUserMedia({audio: true, video: true}, this.answerCall.bind(this), this.onError.bind(this));
  }

  receiveStream(stream) {
    dbg('reveive stream', stream, this.video);
    this.video.src = window.URL.createObjectURL(stream);
  }

  answerCall(stream) {
    dbg('Answer call', stream);
    this.peerCall.answer(stream);
  }

  onError(err) {
    dbg('Error', err);
  }
}
