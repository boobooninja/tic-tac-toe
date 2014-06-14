(function() {
  $('#turn').text("It's " + game.currentPlayer + "'s turn.");
  $('#score1').text(game.player1 + ": " + game.player1Score);
  $('#score2').text(game.player2 + ": " + game.player2Score);
  $('#button-box').hide();

  $('#board').on('click', '.space', function (e) {
    var spaceNum = $(e.currentTarget).index();
    console.log('You clicked on space #' + spaceNum);

    // Marks the space with the current player's name
    if ( game.spaceBlank(spaceNum) ) {
      game.markSpace(spaceNum);
      // Adds a class to elem so css can take care of the visuals
      $('#board .space:eq(' + spaceNum + ')').addClass(game.currentPlayer);

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

    // $('#button').removeClass('disabled');

    // setText(winner + " won the game!");
    // if ( confirm("Do you want to play again?") ) {
    //   $('#board .space').removeClass(game.player1);
    //   $('#board .space').removeClass(game.player2);

    //   game.start();
    // }
  });

  $('#button').on('click', function() {
      $('#board').show();
      $('#button-box').hide();

      $('#board .space').removeClass(game.player1);
      $('#board .space').removeClass(game.player2);

      game.start();
  });
})();
