var socket = require('socket.io');

var arduinoSocket;

module.exports = function(server) {
  var io = socket(server);

  io.on('connection', function (socket) {
    socket.emit('connected');
    socket.on('orientation', onOrientationData);
    socket.on('paint start', onPaintStart);
    socket.on('paint stop', onPaintStop);
    socket.on('arduino', onArduinoRegister);
  });

  function onOrientationData (data) {
    console.log('onOrientationData', data);
    if (arduinoSocket) {
      arduinoSocket.emit('orientation', data);
    }
  }

  function onPaintStart() {
    console.log('onPaintStart');
    if (arduinoSocket) {
      arduinoSocket.emit('paint start');
    }
  }

  function onPaintStop() {
    console.log('onPaintStop');
    if (arduinoSocket) {
      arduinoSocket.emit('paint stop');
    }
  }

  function onArduinoRegister (data) {
    console.log('Arduino registered');
    arduinoSocket = this;
  }

}
