// initiate a web socket connection between browser and Node
var socket = io();

//listen for an event on any socket/channel
var connectionCount = document.getElementById('connection-count');
var socketId = document.getElementById('socket-id');
var statusMessageElement = document.getElementById('status-message');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('socketIdentifier', function (id) {
  socketId.innerText = 'Socket Id: ' + id;
});

socket.on('statusMessage', function (message) {
  statusMessageElement.innerText = message;
});

socket.on('voteCount', function (votes) {
  console.log(votes);
});

var buttons = document.querySelectorAll('#choices button');
var choiceA = [];
var choiceB = [];
var choiceC = [];
var choiceD = [];
var totalVotes = 0;

for (var i = 0; i < buttons.length; i++ ) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);

    var choice = this.innerText;
    pushChoice(choice);
  });
}

function pushChoice(choice) {
  var tallyElement = document.getElementById("tally" + choice);
  var totalVotesElement = document.getElementById("total-votes");
  switch(choice) {
    case "A":
      choiceA.push(choice);
      tallyElement.innerText = choiceA.length;
      totalVotes = totalVotes + choiceA.length;
      totalVotesElement.innerText = totalVotes;
      break;
    case "B":
      choiceB.push(choice);
      tallyElement.innerText = choiceB.length;
      totalVotes = totalVotes + choiceB.length;
      totalVotesElement.innerText = totalVotes;
      break;
    case "C":
      choiceC.push(choice);
      tallyElement.innerText = choiceC.length;
      totalVotes = totalVotes + choiceC.length;
      totalVotesElement.innerText = totalVotes
      break;
    case "D":
      choiceD.push(choice);
      tallyElement.innerText = choiceD.length;
      totalVotes = totalVotes + choiceD.length;
      totalVotesElement.innerText = totalVotes
      break;
    default:
      break;
  }
}
