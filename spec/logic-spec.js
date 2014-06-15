describe("Game", function () {

  describe("start", function () {
    it('sets spaces array values to NaN', function() {
      game.start();
      var spaces = game.spaces;

      expect(spaces).toEqual([ NaN, NaN, NaN,
                               NaN, NaN, NaN,
                               NaN, NaN, NaN ]);
    });
    it('sets player1 to the first parameter and player2 to the second if provided', function() {
      var p1 = 'Joe';
      var p2 = 'Sam';

      game.start(p1, p2);

      expect(game.player1).toEqual(p1);
      expect(game.player2).toEqual(p2);
    });
    it('sets player1Score and player2Score to zero if names changed', function() {
      game.start();
      game.player1Score = 1;
      expect(game.player1Score).toEqual(1);

      game.start('Joe','Sam');

      expect(game.player1Score).toEqual(0);
    });
    it('sets currentPlayer to player1', function() {
      game.start('Joe', 'Sam');

      expect(game.currentPlayer).toEqual('Joe');
    });
  });

  describe("checkForWinner", function() {
    it("returns true if currentPlayer has three spaces in a row otherwise returns false", function() {
      expect( game.checkForWinner() ).toEqual(false);
      game.spaces[0] = 'player1';
      game.spaces[1] = 'player1';
      game.spaces[2] = 'player1';
      expect( game.checkForWinner() ).toEqual(true);
    });
  });

  describe("setNextTurn", function() {
    it("sets currentPlayer to the other player", function() {
      game.currentPlayer = game.player1;
      game.setNextTurn();
      expect( game.currentPlayer ).toEqual( game.player2 );
    });
  });

  describe("markSpace", function() {
    it("sets the given space to 'player1' or 'player2' depending on the currentPlayer", function() {
      game.currentPlayer = game.player1;
      game.markSpace(0);
      expect( game.spaces[0] ).toEqual('player1');
    });
  });

  describe("spaceBlank", function() {
    it("returns true if the given space has not been set yet otherwise false", function() {
      game.start();
      expect( game.spaceBlank(0) ).toEqual(true);
    });
  });
});
