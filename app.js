var jsonServer = require('json-server');

var server = jsonServer.create();
var router = jsonServer.router('db/db.json');

server.set('port', (process.env.PORT || 5000));
server.use(jsonServer.defaults());
server.use(router);

server.listen(server.get('port'));

module.exports = server;
