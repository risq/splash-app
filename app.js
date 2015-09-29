var express = require('express');
var app = express();
var server = require('http').createServer(app);

var io = require('socket.io')(server);

app.set('port', (process.env.PORT || 5000));
server.listen(app.get('port'));

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
  socket.emit('connected');
  socket.on('orientation', function (data) {
    console.log('orientation:', data);
    socket.broadcast.emit('orientation', data);
  });
});

module.exports = app;
