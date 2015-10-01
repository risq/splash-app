var express = require('express');
var peer = require('peer').ExpressPeerServer;
var config = require('./config');

var app = express();

var server = require('http').createServer(app);
var socket = require('./server/socket')(server);

app.set('port', (process.env.PORT || config.staticFilesPort));

app.use(express.static(__dirname + '/public'));
app.use('/peer', peer(server, {debug: true}));
app.use('/config', function(req, res) {
  res.json(config);
});

server.listen(app.get('port'));

module.exports = app;
