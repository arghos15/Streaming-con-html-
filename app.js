var express = require('express'),http = require('http');
var app = express();
app.get('/', function(req, res){
  res.sendfile(__dirname + '/tutoStreaming.html');
});

app.get('/tutoStreamClient.html', function(req, res){
  res.sendfile(__dirname + '/tutoStreamClient.html');
});
//app.use(express.static(__dirname + '/ejm'));
var server = http.createServer(app);
server.listen(8080);
var io = require("socket.io").listen(server);
io.set('log level',1);
io.sockets.on('connection',function(socket){
	socket.on('newFrame',function(obj){
		//console.log("newFrame rcvd");
		//io.sockets.emit('setFrame',obj);
		socket.broadcast.emit('setFrame',obj);
	});
});
