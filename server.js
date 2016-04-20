const http = require('http');
const express = require ('express');

// instantiate an instance of our express app
const app = express();
// have express serve public library
app.use(express.static('public'));
// fire up the index.html when the user goes to '/'
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// set the port to either the environment its in(like HEROKU), or 3000
const port = process.env.PORT || 3000;

// then console.log when the port is being run
const server = http.createServer(app)
server.listen(port, function() {
  console.log('Listening on port ' + port + '.');
});

// set up socket io to host web sockets, sending it the given server
const socketIo = require('socket.io');
const io = socketIo(server);

const votes = {};

function countVotes(votes) {
  var voteCount = {
    A: 0,
    B: 0,
    C: 0,
    D: 0
  };
  for (var vote in votes) {
    voteCount[votes[vote]]++;
  }
  return voteCount;
}

io.on('connection', function (socket) {
  console.log("A user has connected.", io.engine.clientsCount);

  // send a custom usersConnected event to EVERY connected browser

  io.sockets.emit('userConnection', io.engine.clientsCount);
  io.sockets.emit('socketIdentifier', socket.id);

  socket.emit('statusMessage', 'You have connected.');

  socket.on('message', function (channel, message) {
    if (channel === 'voteCast') {
      votes[socket.id] = message;
      socket.emit('voteCount', countVotes(votes));
      console.log(votes)
    }
    console.log(channel, message);
  });

  // do something when the user disconnects
  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
    delete votes[socket.id];
    console.log(votes);
    socket.emit('voteCount', countVotes(votes));
    io.sockets.emit('usersConnection', io.engine.clientsCount);
  });
});

// check to make sure the server running is what you want? maybe?
if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
