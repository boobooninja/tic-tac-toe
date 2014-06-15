(function() {
  $('#player1').val('veggies');
  $('#player2').val('junkfood');

  $('#turn').text("It's " + game.currentPlayer + "'s turn.");
  $('#score1').text(game.player1 + ": " + game.player1Score);
  $('#score2').text(game.player2 + ": " + game.player2Score);
  $('#button-box').hide();
  $('#my-box').hide();
  $('#my-form').show();

  $('#board').on('click', '.space', function (e) {
    var spaceNum = $(e.currentTarget).index();
    console.log('You clicked on space #' + spaceNum);

    // Marks the space with the current player's name
    if ( game.spaceBlank(spaceNum) ) {
      var klass = game.markSpace(spaceNum);
      // Adds a class to elem so css can take care of the visuals
      $('#board .space:eq(' + spaceNum + ')').addClass(klass);

      if ( game.checkForWinner() ) {
        console.log(game.currentPlayer + 'won!');
        $(document).trigger("game-win", game.currentPlayer);
      } else {
        game.setNextTurn();
        $('#turn').text("It's " + game.currentPlayer + "'s turn.");
      }
    }
  });

  $(document).on('game-win', function (e, winner) {
    $('#turn').text(winner + " won the game!");
    $('#score1').text(game.player1 + ": " + game.player1Score);
    $('#score2').text(game.player2 + ": " + game.player2Score);

    $('#board').hide();
    $('#button-box').show();
  });

  $('#continue').on('click', function() {
    $('#board').show();
    $('#button-box').hide();

    $('#board .space').removeClass('player1');
    $('#board .space').removeClass('player2');

    game.start(game.player1, game.player2);
  });

  $('#new-game').on('click', function() {
    $('#board .space').removeClass('player1');
    $('#board .space').removeClass('player2');

    $('#my-box').hide();
    $('#my-form').show();
  });

  $('#start-game').on('click', function() {
    var p1 = $('#player1').val();
    var p2 = $('#player2').val();

console.log("p1: " + p1);

    $('#my-box').show();
    $('#board').show();
    $('#my-form').hide();

    game.start(p1, p2);

    $('#turn').text("It's " + game.currentPlayer + "'s turn.");
    $('#score1').text(game.player1 + ": " + game.player1Score);
    $('#score2').text(game.player2 + ": " + game.player2Score);

  });

})();
