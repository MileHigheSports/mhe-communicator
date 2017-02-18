var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var appName = 'MHE Communicator Relay';
var messages = {};

app.get('/', function(req, res){
  res.send('<h1>' + appName + ' has a heartbeat.</h1>');
});

io.on('connection', function(socket){
  console.log('A client has connected to ' + appName);

  socket.on('SET_MESSAGE', function(data){
    var clientId = data.clientId;
    var message = data.message;
    console.log('Setting Message for ' + clientId + ': ', message);

    // Store the message in memory so we can resend it if needed.
    messages[clientId] = message;

    // We emit on io to broadcast the message to all connected clients.
    io.emit('RELAY_MESSAGE', {
      clientId: clientId,
      message: message
    });
  });

  socket.on('GET_MESSAGE', function(data){
    console.log(data);
    var clientId = data.clientId;
    var message = messages[data.clientId];

    console.log('Memory Message to ' + clientId + ': ', message);

    // We emit on the socket to only reply to the requester.
    socket.emit('RELAY_MESSAGE', {
      clientId: clientId,
      message: message
    });
  });

  socket.on('disconnect', function(){
    console.log('A client has disconnected from ' + appName + '.');
  });
});

http.listen(4016, function(){
  console.log(appName + ' core listening on 4016.');
});
