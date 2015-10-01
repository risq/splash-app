var express = require('express');
var app = express();
var server = require('http').createServer(app);
var socket = require('./server/socket')(server);

app.set('port', (process.env.PORT || 5000));
server.listen(app.get('port'));

app.use(express.static(__dirname + '/public'));

module.exports = app;
