var express = require('express')
  , app = express()  
  , server = require('http').createServer(app)
  , path = require('path')
  , io = require('socket.io').listen(server)
  , spawn = require('child_process').spawn
  , torrent_control = require('./modules/torrent_control')
  , youtube_control = require('./modules/youtube_control');


server.listen(process.env.TEST_PORT || 80);
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/views')));


app.get('/', function (req, res) {
  res.sendfile(__dirname + '/views/index.html');
});

app.get('/remote', function (req, res) {
  res.sendfile(__dirname + '/views/remote.html');
});

var torrent_socket = io.of('/torrent').on('connection', function(socket){
	torrent_control.respond(torrent_socket, socket);
});


