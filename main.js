var newGame = function() {
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var grid = [ [0,1,2],[3,4,5],[6,7,8],
             [0,3,6],[1,4,7],[2,5,8],
             [0,4,8],[2,4,6] ];

var player1 = 'veggies';
var player2 = 'junkfood';
var currentPlayer = null;

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  // $('#turn-label').text(currentPlayer);
  setText("It's " + currentPlayer + "'s turn.")
};

function setText(text) {
  $('#msg').text(text);
}

var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  for(var i = 0; i < grid.length; i++) {
    space1 = spaces[ grid[i][0] ];
    space2 = spaces[ grid[i][1] ];
    space3 = spaces[ grid[i][2] ];

    if (space1 === space2 && space2 === space3) {
      return true;
    }
  }
  return false;
};

function spaceBlank(spaceNum) {
  return typeof( spaces[spaceNum] ) === 'number';
}

// function enableClick() {
//   $(document).on('click', '#board .space', function (e) {
//     var spaceNum = $(e.currentTarget).index();
//     console.log('You clicked on space #' + spaceNum);

//     // Marks the space with the current player's name
//     // TODO: Don't mark it unless the space is blank
//     if ( spaceBlank(spaceNum) ) {
//       spaces[spaceNum] = currentPlayer;

//       // Adds a class to elem so css can take care of the visuals
//       $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);

//       if ( checkForWinner() ) {
//         console.log('somebody won');
//         // TODO: Trigger 'game-win' event with the winning player as the event data
//         $(document).trigger("game-win", currentPlayer);
//       } else {
//         setNextTurn();
//       }
//     }
//   });
// }

$('#board').on('click', '.space', function (e) {
  var spaceNum = $(e.currentTarget).index();
  console.log('You clicked on space #' + spaceNum);

  // Marks the space with the current player's name
  // TODO: Don't mark it unless the space is blank
  if ( spaceBlank(spaceNum) ) {
    spaces[spaceNum] = currentPlayer;
    // Adds a class to elem so css can take care of the visuals
    $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);

    if ( checkForWinner() ) {
      console.log('somebody won');
      // TODO: Trigger 'game-win' event with the winning player as the event data
      $(document).trigger("game-win", currentPlayer);
      console.log("how many times is this running");
    } else {
      setNextTurn();
    }
  }
});
console.log("how many times is this running? 2");

function startGame() {
  clearSpaces();
  // enableClick();
  setNextTurn();
}

function playAgain() {
  if ( confirm("Do you want to play again?") ) {
    newGame();
  }
}

function clearSpaces() {
  $('#board .space').removeClass(player1);
  $('#board .space').removeClass(player2);
}

$(document).on('game-win', function (e, winner) {
  // TODO: Alert who won the game
  setText(winner + " won the game!");
  // $(document).on('click', '#board .space', function (e) {
  playAgain();
  // });
});

// Start the game
startGame();
};

newGame();
