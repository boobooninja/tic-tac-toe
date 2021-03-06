(function() {
  var Game = function() {
    var grid = [ [0,1,2],[3,4,5],[6,7,8],
                 [0,3,6],[1,4,7],[2,5,8],
                 [0,4,8],[2,4,6] ];

    this.setNextTurn = function () {
      if (this.currentPlayer === this.player1) {
        this.currentPlayer = this.player2;
      }
      else {
        this.currentPlayer = this.player1;
      }
    };

    this.checkForWinner = function () {
      // Because (NaN === NaN) is always false, we can safely assume
      // that if three spaces in a row are the same, all three spaces are
      // marked by a player, and not all empty.

      for(var i = 0; i < grid.length; i++) {
        space1 = this.spaces[ grid[i][0] ];
        space2 = this.spaces[ grid[i][1] ];
        space3 = this.spaces[ grid[i][2] ];

        if (space1 === space2 && space2 === space3) {

          if (this.currentPlayer === this.player1) {
            this.player1Score = this.player1Score + 1;
          } else {
            this.player2Score = this.player2Score + 1;
          }

          console.log(this.player1 + " - score - " + this.player1Score)
          console.log(this.player2 + " - score - " + this.player2Score)

          return true;
        }
      }
      return false;
    };

    this.markSpace = function(spaceNum) {
      console.log('markSpace : ' + this.currentPlayer);

      if (this.currentPlayer === this.player1) {
        this.spaces[spaceNum] = 'player1';
        return 'player1';
      } else if (this.currentPlayer === this.player2) {
        this.spaces[spaceNum] = 'player2';
        return 'player2';
      }
    };

    this.spaceBlank = function(spaceNum) {
      return typeof( this.spaces[spaceNum] ) === 'number';
    }

    this.setAvatar = function(p1Avatar, p2Avatar) {
      this.avatar1 = p1Avatar;
      this.avatar2 = p2Avatar;
    };

    this.start = function(p1, p2) {
      this.spaces = [ NaN, NaN, NaN,
                      NaN, NaN, NaN,
                      NaN, NaN, NaN ];

      if (this.player1 !== p1 || this.player2 !== p2) {
        this.player1 = p1;
        this.player1Score = 0;
        this.player2 = p2;
        this.player2Score = 0;
      }

      this.currentPlayer = null;

      this.setNextTurn();
    }

    // Start the game
    this.start('veggies', 'junkfood');
  };

  window.game = new Game();
})();
