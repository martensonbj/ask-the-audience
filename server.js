const http = require('http');
const express = require ('express');

// instantiate an instance of our express app
const app = express();

// set the port to either what you give it, or 3000
var port = process.env.PORT || 3000;

// then console.log when th eport is being run
var server = http.createServer(app);
server.listen(port, function() {
  console.log('Listening on port ' + port + '.');
});

// have express serve public library
app.use(express.static('public'));

// fire up the index.html when the user goes to '/'
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// check to make sure the server running is what you want? maybe?
if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
