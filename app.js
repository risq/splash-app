var jsonServer = require('json-server');

var server = jsonServer.create();
var router = jsonServer.router('db/db.json');

var io = require('socket.io')(server);

server.set('port', (process.env.PORT || 5000));
server.use(jsonServer.defaults());
server.use(router);

server.listen(server.get('port'));

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

module.exports = server;
