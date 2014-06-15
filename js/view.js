(function() {
  $('#player1').val( game.player1 );
  $('#player2').val( game.player2 );

  $(document).trigger("update-turn", ("It's " + game.currentPlayer + "'s turn."));

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

      // if (klass === 'player1') {
      //   var av = game.avatar1;
      // } else {
      //   var av = game.avatar2;
      // }

      // var styles = { background: url(av);
      //                background-size: 100% 100%;
      //              };

      // $('#board .space:eq(' + spaceNum + ')').css(styles);

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
    var turnText = winner + " won the game!";
    $(document).trigger("update-turn", turnText);

    // $('#turn').text(winner + " won the game!");
    // $('#score1').text(game.player1 + ": " + game.player1Score);
    // $('#score2').text(game.player2 + ": " + game.player2Score);

    $('#board').hide();
    $('#button-box').show();
  });

  $(document).on('update-turn', function(e, turnText) {
    // $('#turn').text("It's " + game.currentPlayer + "'s turn.");
    $('#turn').text(turnText);
    $('#score1').text(game.player1 + ": " + game.player1Score);
    $('#score2').text(game.player2 + ": " + game.player2Score);
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
    // var p1Avatar = $('#avatar1').val();
    // var p2Avatar = $('#avatar2').val();

    // game.setAvatar(p1Avatar, p2Avatar);

    $('#my-box').show();
    $('#board').show();
    $('#my-form').hide();

    game.start(p1, p2);

    var turnText = "It's " + game.currentPlayer + "'s turn.";
    $(document).trigger("update-turn", turnText);
  });

  // $("#add-avatar1").on('click', function() {
  //   $('<input type="text" id="avatar1" placeholder="url to image">').insertAfter(this);
  //   $(this).remove();
  // });
  // $("#add-avatar2").on('click', function() {
  //   $('<input type="text" id="avatar2" placeholder="url to image">').insertAfter(this);
  //   $(this).remove();
  // });

})();
