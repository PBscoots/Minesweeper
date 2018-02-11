// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);

// also toggle flags with game.toggleFlag(y,x)
// When done run `.exit`

import { Board } from './board';

class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows,numberOfColumns, numberOfBombs);
  }
//eventually a left mouse click
  playMove(rowIndex, columnIndex){
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
  toggleFlag(rowIndex,columnIndex){
    if (this._board._playerBoard[rowIndex][columnIndex] === ' ') {
      this._board.placeFlag(rowIndex,columnIndex);
      this._board.print();
    } else if(this._board._playerBoard[rowIndex][columnIndex] === 'F') {
      this._board.removeFlag(rowIndex,columnIndex);
      this._board.print();
    } else {
      console.log('Tile already flipped');
    }

  }
}


/*
    Add validation to ensure that board dimensions make sense. For example, a board should not be able to be created with more bombs than it has tiles.
    Add a timer which lets players know how long it took them to win (or lose).
  CHECK  Add recursive flipping, when a tile is flipped that isn't touching a bomb (would have the number zero printed on it), all adjacent tiles additionally flip over.
  CHECK  Add a method to place flags at a tile instead of flipping that tile. If a square has a flag on it, it can't be flipped over.
*/
