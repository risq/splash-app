import debug from 'debug';
import $ from 'jquery';
import Peer from 'peerjs';

import socket from './socket';

const dbg = debug('splash:webcam');

export default class Webcam {
  constructor() {
    dbg('Init webcam');
    this.id = Math.round(Math.random() * 1000);
    this.$video = $('video');
    this.updateVideoSize();
    this.initConnection();
    $(window).on('resize', this.updateVideoSize.bind(this));
  }

  initConnection() {
    this.connection = new Peer(this.id, {
      host: socket.config.host,
      port: socket.config.port,
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

  updateVideoSize() {
    this.$video.css({
      width: $(window).width(),
      height: $(window).height(),
    });
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
    dbg('reveive stream', stream, this.$video);
    this.$video[0].src = window.URL.createObjectURL(stream);
  }

  answerCall(stream) {
    dbg('Answer call', stream);
    this.peerCall.answer(stream);
  }

  screenShotVideo() {
    const canvas = document.createElement('canvas');
    canvas.width = this.$video.width();
    canvas.height = this.$video.height();

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    dbg(canvas.toDataURL());
  }

  onError(err) {
    dbg('Error', err);
  }

}
