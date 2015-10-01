var socket = require('socket.io');

var arduinoSocket;
var arduinoVideoSocket;

module.exports = function(server) {
  var io = socket(server);

  io.on('connection', function (socket) {
    socket.emit('connected');
    socket.on('orientation', onOrientationData);
    socket.on('paint start', onPaintStart);
    socket.on('paint stop', onPaintStop);
    socket.on('request stream', onStreamRequest);
    socket.on('register arduino', onArduinoRegister);
    socket.on('register arduino video', onArduinoVideoRegister);
  });

  function onOrientationData (data) {
    console.log('onOrientationData', data);
    if (arduinoSocket) {
      arduinoSocket.emit('orientation', data);
    } else {
      console.log('Cannot find arduino socket to emit');
    }
  }

  function onPaintStart() {
    console.log('onPaintStart');
    if (arduinoSocket) {
      arduinoSocket.emit('paint start');
    } else {
      console.log('Cannot find arduino socket to emit');
    }
  }

  function onPaintStop() {
    console.log('onPaintStop');
    if (arduinoSocket) {
      arduinoSocket.emit('paint stop');
    } else {
      console.log('Cannot find arduino socket to emit');
    }
  }

  function onStreamRequest(id) {
    console.log('onStreamRequest');
    if (arduinoVideoSocket) {
      arduinoVideoSocket.emit('request stream', id);
    } else {
      console.log('Cannot find arduino video socket to emit');
    }
  }

  function onArduinoRegister () {
    console.log('Arduino socket registered');
    arduinoSocket = this;
  }

  function onArduinoVideoRegister () {
    console.log('Arduino video socket registered');
    arduinoVideoSocket = this;
  }
}
