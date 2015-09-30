var express = require('express');
var app = express();
var server = require('http').createServer(app);

var io = require('socket.io')(server);

app.set('port', (process.env.PORT || 5000));
server.listen(app.get('port'));

app.use(express.static(__dirname + '/public'));

var arduinoSocket;

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

function onArduinoRegister (data) {
  console.log('Arduino registered');
  arduinoSocket = this;
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


module.exports = app;
