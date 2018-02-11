'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

var _board = require('./board');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    this._board = new _board.Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
  //eventually a left mouse click


  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      this._board.flipTile(rowIndex, columnIndex);
      if (this._board._playerBoard[rowIndex][columnIndex] === 'B') {
        console.log('GAME OVER');
        this._board.print();
      } else if (this._board.hasSafeTiles()) {
        console.log('Current Board:');
        this._board.print();
      } else {
        console.log('You Win!');
        this._board.print();
      }
    }
    //eventually a right mouse click

  }, {
    key: 'toggleFlag',
    value: function toggleFlag(rowIndex, columnIndex) {
      if (this._board._playerBoard[rowIndex][columnIndex] === ' ') {
        this._board.placeFlag(rowIndex, columnIndex);
        this._board.print();
      } else if (this._board._playerBoard[rowIndex][columnIndex] === 'F') {
        this._board.removeFlag(rowIndex, columnIndex);
        this._board.print();
      } else {
        console.log('Tile already flipped');
      }
    }
  }]);

  return Game;
}();

/*
    Add validation to ensure that board dimensions make sense. For example, a board should not be able to be created with more bombs than it has tiles.
    Add a timer which lets players know how long it took them to win (or lose).
    Add recursive flipping, when a tile is flipped that isn't touching a bomb (would have the number zero printed on it), all adjacent tiles additionally flip over.
  CHECK  Add a method to place flags at a tile instead of flipping that tile. If a square has a flag on it, it can't be flipped over.
*/